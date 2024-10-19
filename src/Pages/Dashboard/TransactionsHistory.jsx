import React, { useEffect, useState } from 'react';
import './menuitem.css';
import { FaAlignLeft, FaPlus, FaSignOutAlt, FaTimes, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useAuthContext } from '../../Hooks/useAuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Invoice from '../../Component/Invoice/Invoice';
import Loader from '../../Component/Loader/Loader'; // Import your Loader component

function TransactionsHistory() {
    const [sidemenu, setSideMenu] = useState(false);
    const { user, dispatch } = useAuthContext();
    const [shouldMenuSlide, setShouldMenuSlide] = useState(false);
    const [data, setData] = useState([]);
    const [dashUser, setDashUser] = useState(false);
    const [printInvoice, setPrintInvoice] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const logout = () => {
        dispatch({ type: 'LOGOUT', payload: null });
    };

    function formatMongoDate(mongoDate) {
        const date = new Date(mongoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}.${month}.${year}`;
    }

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/transactions`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchTransactions();
    }, [user.token]);

    const handleInvoice = (data) => {
        setInvoiceData(data);
        setPrintInvoice(true);
    };

    return (
        <div className='dashboard'>
            <div className="dashboard-header">
                <div className="rights-side">
                    <Link to='/' style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>
                        <p>{process.env.REACT_APP_APP_NAME}</p>
                    </Link>
                    <FaAlignLeft onClick={() => {
                        setShouldMenuSlide(true);
                        setSideMenu(!sidemenu);
                    }} />
                </div>
                <div className="left-side">
                    <FaUserAlt onClick={() => {
                        setDashUser(!dashUser);
                    }} />
                </div>
                {dashUser && (
                    <div className="user-menu">
                        <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: ".8rem" }} to={'/user-profile'}>
                            <p>Profile Overview</p>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: ".8rem" }} to={'/profile-setting'}>
                            <p>Profile Settings</p>
                        </Link>
                        <p className='logout' onClick={logout}>
                            <FaSignOutAlt />Logout
                        </p>
                    </div>
                )}
            </div>
            <div className="dashboard-main-section">
                {sidemenu && (
                    <Sidebar shouldMenuSlide={shouldMenuSlide} />
                )}
                <div className="loan-container">
                    <div className="table-head">
                        <h2>Transactions</h2>
                    </div>
                    <div className="loan-table">
                        {loading ? ( // Show loader while loading
                            <Loader /> // Replace with your loader component
                        ) : (
                            <table className='equal-table'>
                                <thead>
                                    <tr>
                                        <th>Created</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 ? (
                                        data.map((transaction, index) => (
                                            <tr key={index}>
                                                <td>{formatMongoDate(transaction.createdAt)}</td>
                                                <td>{transaction.amount} {transaction.currency}</td>
                                                <td>{transaction.status}</td>
                                                <td>{transaction.type}</td>
                                                <td className='action'>
                                                    <button onClick={() => handleInvoice(transaction)}>Print Invoice</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="no-loan-message">
                                                No Data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            {printInvoice && (
                <div className="print-invoice">
                    <div className="cancel-invoice">
                        <FaTimes onClick={() => setPrintInvoice(false)} />
                    </div>
                    <Invoice data={invoiceData} />
                </div>
            )}
        </div>
    );
}

export default TransactionsHistory;
