import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './adminpanel.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { FaAlignLeft, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import AdminSidebar from './AdminSideBar';
import Loader from '../../Component/Loader/Loader'; // Import your Loader component

function AdminPanel() {
    const [queryData, setQueryData] = useState({
        activeLoans: null,
        paymentReq: null,
        AFD: null,
        tickets: null,
        deposits: null,
        users: null,
        dps: null,
    });
    const [shouldMenuSlide, setShouldMenuSlide] = useState(false);
    const [dashUser, setDashUser] = useState(false);
    const [sidemenu, setSideMenu] = useState(false);
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(true); // Loading state
    const navigate=useNavigate()
    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/isadmin`,{
            headers:{
                Authorization:`Bearer ${user.token}`
            }  
        }).then(response=>{
            console.log(response.data)
           if(response.data.admin){
            console.log("OK")
           }else if(response.data.user){
            navigate(`/admin-panel`)
           }else{
            navigate('/')
           }

        }).catch(error=>{
            console.log(error)
        })
       },[user.token])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, ticketsResponse, loansResponse, depositsResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/users`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }),
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/tickets`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }),
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/loans`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }),
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/deposits`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }),
                ]);

                setQueryData({
                    users: usersResponse.data.length,
                    tickets: ticketsResponse.data.length,
                    dps: loansResponse.data.length,
                    deposits: depositsResponse.data.length,
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, [user.token]);

    return (
        <div className='admin dashboard'>
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
                        <p className='logout' onClick={() => {
                            // logout()
                        }}>
                            <FaSignOutAlt />Logout
                        </p>
                    </div>
                )}
            </div>
            {sidemenu && (
                <AdminSidebar shouldMenuSlide={shouldMenuSlide} />
            )}
            <div className="main-admin-dash activities">
                {loading ? ( // Show loader while loading
                    <Loader /> // Replace with your loader component
                ) : (
                    <>
                        <div className="card-body activit1">
                            <p>Users</p>
                            <span>{queryData.users}</span>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/admin/users'}>
                                <h3>Manage &#8594;</h3>
                            </Link>
                        </div>
                        <div className="card-body activit2">
                            <p>Deposit Requests</p>
                            <span>{queryData.deposits}</span>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/admin/deposit'}>
                                <h3>Manage &#8594;</h3>
                            </Link>
                        </div>
                        <div className="card-body activit3">
                            <p>Loans</p>
                            <span>{queryData.dps}</span>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/admin/loan'}>
                                <h3>Manage &#8594;</h3>
                            </Link>
                        </div>
                        <div className="card-body activit4">
                            <p>Tickets</p>
                            <span>{queryData.tickets}</span>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/admin/tickets'}>
                                <h3>Manage &#8594;</h3>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AdminPanel;
