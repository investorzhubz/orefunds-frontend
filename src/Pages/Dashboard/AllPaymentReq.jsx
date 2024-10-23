import React, { useEffect, useState } from 'react';
import './menuitem.css';
import { FaAlignLeft, FaPlus, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useAuthContext } from '../../Hooks/useAuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../Component/Loader/Loader'; // Import your Loader component

function AllPaymentReq() {
    const [sidemenu, setSideMenu] = useState(false);
    const { user, dispatch } = useAuthContext();
    const [shouldMenuSlide, setShouldMenuSlide] = useState(false);
    const [data, setData] = useState([]);
    const [dashUser, setdashUser] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const hasActiveLoan = false;

    const logout = () => {
        dispatch({ type: 'LOGOUT', payload: null });
    };

    function formatMongoDate(mongoDate) {
        const date = new Date(mongoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        setLoading(true); // Start loading
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-payment-request`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        .then(response => {
            setData(response.data);
            setLoading(false); // Stop loading
        })
        .catch(error => {
            console.log(error);
            setLoading(false); // Stop loading even if there’s an error
        });
    }, [user.token]);

    return (
        <div className='dashboard'>
            <div className="dashboard-header">
                <div className="rights-side">
                <Link to='/' style={{textDecoration:'none',color:'white',cursor:'pointer'}}><p>{process.env.REACT_APP_APP_NAME}</p></Link>
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
                        <h2>Payment Requests</h2>
                        <Link to='/payment_requests/create/' style={{ textDecoration: 'none' }}>
                            <button><FaPlus />Add New</button>
                        </Link>
                    </div>
                    <div className="loan-table">
                        {loading ? ( // Conditional rendering for loader
                            <Loader /> // Replace with your loader component
                        ) : (
                            <table className='equal-table'>
                                <thead>
                                    <tr>
                                        <th>Created</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Sender</th>
                                        <th>Receiver</th>
                                        {data.user === false && (
                                            <th>Action</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 ? (
                                        data.map((item, index) => (
                                            <tr key={index}>
                                                <td>{formatMongoDate(item.createdAt)}</td>
                                                <td>{item.amount} {item.currency}</td>
                                                <td>{item.status}</td>
                                                <td>{item.userEmail}</td>
                                                <td>{item.receiverAccount}</td>
                                                {item.user === false && (
                                                    <td className='action-tb'>
                                                        <button>Accept</button>
                                                        <button>Reject</button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="no-loan-message">
                                                No Payment Requests Available
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

export default AllPaymentReq;
