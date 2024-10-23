import React, { useState, useEffect } from 'react';
import './menuitem.css';
import { FaAlignLeft, FaPlus, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { Link } from 'react-router-dom';
import Loader from '../../Component/Loader/Loader'; // Import your Loader component

function MyDPS() {
    const { user, dispatch } = useAuthContext();
    const [dashUser, setdashUser] = useState(false);
    const [sidemenu, setSideMenu] = useState(false);
    const [shouldMenuSlide, setShouldMenuSlide] = useState(false);
    const [dpsSchemes, setDpsSchemes] = useState([]); // State to store DPS schemes
    const [loading, setLoading] = useState(true); // State for loading

    // Fetch data from the database when the component loads
    useEffect(() => {
        const fetchDpsData = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/my-dps`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }); // Make the API call
                setDpsSchemes(response.data); // Set the fetched data
            } catch (error) {
                console.error('Error fetching DPS schemes:', error);
            } finally {
                setLoading(false); // Stop loading regardless of the result
            }
        };

        fetchDpsData();
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
                        <h2>My DPS Schemes</h2>
                        <Link to='/dps_schemes/plans/' style={{ textDecoration: 'none' }}>
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
                                        <th>Plan</th>
                                        <th>Amount To Pay</th>
                                        <th>Installment</th>
                                        <th>Total Payable</th>
                                        <th>Total Paid</th>
                                        <th>After Matured</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dpsSchemes.length > 0 ? (
                                        dpsSchemes.map((scheme, index) => (
                                            <tr key={index}>
                                                <td>{scheme.plan}</td>
                                                <td>{scheme.perInstallment.toFixed(2)} {scheme.currency}</td>
                                                <td>{scheme.installmentInterval}</td>
                                                <td>{scheme.totalPayableAmount.toFixed(2)} {scheme.currency}</td>
                                                <td>{scheme.totalPaid.toFixed(2)} {scheme.currency}</td>
                                                <td>{scheme.maturedAmount.toFixed(2)} {scheme.currency}</td>
                                                <td>{scheme.status}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="no-loan-message">
                                                No DPS Schemes Available
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

export default MyDPS;
