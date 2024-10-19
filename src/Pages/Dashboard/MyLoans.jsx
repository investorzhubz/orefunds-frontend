import React, { useEffect, useState } from 'react';
import './menuitem.css';
import { FaAlignLeft, FaPlus, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useAuthContext } from '../../Hooks/useAuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../Component/Loader/Loader'; // Import your Loader component

function MyLoans() {
    const [sidemenu, setSideMenu] = useState(false);
    const [shouldMenuSlide, setShouldMenuSlide] = useState(false);
    const [data, setData] = useState([]);
    const [dashUser, setdashUser] = useState(false);
    const { user, dispatch } = useAuthContext();
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        const fetchLoans = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/loans`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                setData(response.data); // Set the fetched data
            } catch (error) {
                console.error('Error fetching loans:', error);
            } finally {
                setLoading(false); // Stop loading regardless of the result
            }
        };

        fetchLoans();
    }, [user.token]);

    const logout = () => {
        dispatch({ type: 'LOGOUT', payload: null });
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
                        setdashUser(!dashUser);
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
                        <h2>My Loans</h2>
                        <Link to='/loans/apply_loan/' style={{ textDecoration: 'none' }}>
                            <button><FaPlus />Add New</button>
                        </Link>
                    </div>
                    <div className="loan-table">
                        {loading ? ( // Show loader while loading
                            <Loader /> // Replace with your loader component
                        ) : (
                            <table className='equal-table'>
                                <thead>
                                    <tr>
                                        <th>Loan ID</th>
                                        <th>Loan Product</th>
                                        <th>Currency</th>
                                        <th>Applied Amount</th>
                                        <th>Total Payable</th>
                                        <th>Amount Paid</th>
                                        <th>Due Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 ? (
                                        data.map((loan, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{loan.loanProduct}</td>
                                                <td>{loan.currency}</td>
                                                <td>{loan.amount}</td>
                                                <td>{loan.totalpayableAmount}</td>
                                                <td>{loan.amountPaid}</td>
                                                <td>{loan.dueAmount}</td>
                                                <td>{loan.status}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="no-loan-message">
                                                No Loans Available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyLoans;
