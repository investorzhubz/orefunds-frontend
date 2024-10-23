import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../Hooks/useAuthContext';
import axios from 'axios';
import { FaAlignLeft, FaSignOutAlt, FaTimes, FaUserAlt } from 'react-icons/fa';
import { toast } from 'wc-toast';
import AdminConfirm from './AdminConfirm';
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSideBar';
import Loader from '../../Component/Loader/Loader'; // Import your Loader component
import { useNavigate } from 'react-router-dom';
function Tickets() {
    const navigate=useNavigate()
    const { user,dispatch } = useAuthContext();
    const [sidemenu, setSideMenu] = useState(false);
    const [data, setData] = useState([]);
    const [btnState, setBtnState] = useState("Change User Balance");
    const [edit, setEdit] = useState(false);
    const [ticketId, setTicketId] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [updateDelete, setUpdateDelete] = useState(null);
    const [shouldMenuSlide, setShouldMenuSlide] = useState(false);
    const [dashUser, setDashUser] = useState(false);
    const [formData, setFormData] = useState({
        message: null,
        subject: null,
        email: null
    });
    const [loading, setLoading] = useState(true); // Loading state

    function formatMongoDate(mongoDate) {
        const date = new Date(mongoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const hour = String(date.getHours());
        const minute = String(date.getMinutes());
        return `${day}/${month}/${year} ${hour}:${minute}`;
    }
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
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/tickets`, {
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

        fetchData();
    }, [user.token, updateDelete]);

    const onConfirm = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/delete-ticket/${ticketId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            toast.success("Deleted Successfully");
            setConfirm(false);
            setUpdateDelete(ticketId);
        } catch (error) {
            console.log(error);
        }
    };

    const onCancel = () => {
        setConfirm(false);
    };

    const handleDelete = (id) => {
        setTicketId(id);
        setConfirm(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleEditClick = (data) => {
        setEdit(true);
        setFormData({
            message: data.message,
            subject: data.subject,
            email: data.email
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement your submit logic here, e.g., update the ticket
    };
    const logout=()=>{
      dispatch({type:'LOGOUT',payload:null})
      setTimeout(()=>{
          navigate('/rf-admin')

      },3000)
  }
    return (
        <div className='admin dashboard'>
            <div className="dashboard-header">
                <div className="rights-side">
                    <p>{process.env.REACT_APP_APP_NAME}</p>
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
                            logout()
                        }}>
                            <FaSignOutAlt />Logout
                        </p>
                    </div>
                )}
            </div>
            {sidemenu && (
                <AdminSidebar shouldMenuSlide={shouldMenuSlide} />
            )}
            <div className="main-admin-dash loan-container">
                <div className="table-head">
                    <h2>Tickets</h2>
                </div>
                {loading ? ( // Show loader while loading
                    <Loader /> // Replace with your loader component
                ) : (
                    <div className="loan-table">
                        <table className='equal-table'>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Sender Email</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((ticket) => (
                                        <tr key={ticket._id}>
                                            <td>{ticket.subject}</td>
                                            <td>{ticket.userEmail}</td>
                                            <td>{formatMongoDate(ticket.createdAt)}</td>
                                            <td className='action-tb'>
                                                <button onClick={() => handleEditClick(ticket)}>Open</button>
                                                <button onClick={() => handleDelete(ticket._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="no-ticket-message">No Tickets</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {edit && (
                <div className='deposits-form'>
                    <div className="cancel-depo">
                        <FaTimes onClick={() => setEdit(false)} />
                    </div>
                    <div className="send-money-container">
                        <form className="send-money-form" onSubmit={handleSubmit}>
                            <h2>Ticket</h2>
                            <div className="send-money-grid">
                                <div className="send-money-form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        placeholder="Enter subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="send-money-grid">
                                <div className="send-money-form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="send-money-grid">
                                <div className="send-money-form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="send-money-send-btn">Submit</button>
                        </form>
                    </div>
                </div>
            )}
            {confirm && (
                <AdminConfirm message='Are you sure you want to delete?' onConfirm={onConfirm} onCancel={onCancel} />
            )}
        </div>
    );
}

export default Tickets;
