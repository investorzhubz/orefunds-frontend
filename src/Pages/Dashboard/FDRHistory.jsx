import React, { useEffect, useState } from 'react';
import './menuitem.css';
import { FaAlignLeft, FaPlus, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useAuthContext } from '../../Hooks/useAuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../Component/Loader/Loader'; // Import your Loader component

function FDRHistory() {
    const [sidemenu, setSideMenu] = useState(false);
    const [dashUser, setdashUser] = useState(false);
    const { user, dispatch } = useAuthContext();
    const [shouldMenuSlide, setShouldMenuSlide] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const formatDate = (date) => {
        const ddate = new Date(date);
        return ddate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

    useEffect(() => {
        setLoading(true); // Start loading
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-fixed-deposits`, {
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
                        <h2>Fixed Deposits</h2>
                        <Link to='/fixed_deposits/apply/' style={{ textDecoration: 'none' }}>
                            <button><FaPlus />Apply New</button>
                        </Link>
                    </div>
                    <div className="loan-table">
                        {loading ? ( // Conditional rendering for loader
                            <Loader /> // Replace with your loader component
                        ) : (
                            <table className='equal-table'>
                                <thead>
                                    <tr>
                                        <th>Tenure</th>
                                        <th>Currency</th>
                                        <th>Deposit Amount</th>
                                        <th>Return Amount</th>
                                        <th>Mature Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 ? (
                                        data.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.tenure} Months</td>
                                                <td>{item.currency}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.returnAmount}</td>
                                                <td>{formatDate(item.matureDate)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="no-loan-message">
                                                No Data Available
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

export default FDRHistory;
