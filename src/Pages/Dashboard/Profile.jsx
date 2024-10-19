import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profile from '../../resources/images/default.png';
import { FaAlignLeft, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';
import Sidebar from './Sidebar';
import Loader from '../../Component/Loader/Loader'; // Import your Loader component

function Profile() {
    const { user, dispatch } = useAuthContext();
    const [data, setData] = useState(null);
    const [dashUser, setDashUser] = useState(false);
    const [sidemenu, setSideMenu] = useState(false);
    const [shouldMenuSlide, setShouldMenuSlide] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-user`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json"
                    }
                });
                setData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUserData();
    }, [user.token]);

    const logout = () => {
        dispatch({ type: 'LOGOUT', payload: null });
    };

    const goBack = () => {
        window.history.back();
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
            {sidemenu && (
                <Sidebar shouldMenuSlide={shouldMenuSlide} />
            )}
            <div className="pprofiledetails flip-in-ver-right">
                {loading ? ( // Show loader while loading
                    <Loader /> // Replace with your loader component
                ) : (
                    data && (
                        <>
                            <div className="ppdprofile">
                                {
                                    !data.profile ? (
                                        <img src={profile} alt='profile' />
                                    ) : (
                                        <img src={`${process.env.REACT_APP_IMG_BACKEND_URL}/images/${data.profile}`} alt='profile' />
                                    )
                                }
                            </div>

                            <h4>Personal Details</h4>
                            <div className="pddetails">
                                <div className="ppdetail">
                                    <p>Account Number</p>
                                    <span>{data.accountNumber}</span>
                                </div>
                                <div className="ppdetail">
                                    <p>Name</p>
                                    <span>{data.firstname} {data.lastname}</span>
                                </div>
                                <div className="ppdetail">
                                    <p>Country</p>
                                    <span>{data.country}</span>
                                </div>
                                <div className="ppdetail">
                                    <p>Email</p>
                                    <span>{data.email}</span>
                                </div>
                                <div className="ppdetail">
                                    <p>State/Region</p>
                                    <span>{data.state}</span>
                                </div>
                                <div className="ppdetail">
                                    <p>City</p>
                                    <span>{data.city}</span>
                                </div>
                                <div className="ppdetail">
                                    <p>Zip Code</p>
                                    <span>{data.zipcode}</span>
                                </div>
                                <div className="ppdetail">
                                    <p>Address</p>
                                    <span>{data.address}</span>
                                </div>
                                <div className="ppdetail">
                                    <p>Occupation</p>
                                    <span>{data.occupation}</span>
                                </div>
                                <div className="ppdetail">
                                    <p>Email Verified</p>
                                    <span>{data.verifyEmail ? 'Yes' : 'No'}</span>
                                </div>
                            </div>
                        </>
                    )
                )}
            </div>
        </div>
    );
}

export default Profile;
