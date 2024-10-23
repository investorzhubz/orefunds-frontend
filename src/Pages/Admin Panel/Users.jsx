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
function Users() {
  const navigate=useNavigate()
    const { user,dispatch} = useAuthContext();
    const [sidemenu, setSideMenu] = useState(false);
    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [userId, setUserId] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(null);
    const [dashUser, setDashUser] = useState(false);
    const [formData, setFormData] = useState({
        currency: '',
        amount: {
            USD: '',
            EUR: '',
            GBP: ''
        },
        msg: ''
    });
    const [loading, setLoading] = useState(true); // Loading state

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
        fetchUsers();
    }, [user.token, updateTrigger]);

    const fetchUsers = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/users`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleEditClick = (id, balance) => {
        setUserId(id);
        setFormData({
            currency: 'USD',
            amount: {
                USD: balance.USD || '',
                EUR: balance.EUR || '',
                GBP: balance.GBP || ''
            }
        });
        setEditMode(true);
    };

    const handleDelete = (id) => {
        setUserId(id);
        setConfirm(true);
    };

    const onConfirmDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/delete-user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            toast.success("Deleted Successfully");
            setConfirm(false);
            setUpdateTrigger(prev => !prev);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/update-balance/${userId}`, {
                currency: formData.currency,
                amount: formData.amount[formData.currency],
                msg: formData.msg
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            toast.success("Balance Updated Successfully");
            setEditMode(false);
            setUpdateTrigger(prev => !prev);
        } catch (error) {
            console.error(error);
        }
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
                    <FaAlignLeft onClick={() => setSideMenu(!sidemenu)} />
                </div>
                <div className="left-side">
                    <FaUserAlt onClick={() => setDashUser(prev => !prev)} />
                </div>
                {dashUser && (
                    <div className="user-menu">
                       
                        <p  className='logout'  onClick={() => {
                            logout()
                        }}><FaSignOutAlt />Logout</p>
                    </div>
                )}
            </div>
            {sidemenu && <AdminSidebar />}
            <div className="main-admin-dash loan-container">
                <div className="table-head">
                    <h2>Users</h2>
                </div>
                {loading ? ( // Show loader while loading
                    <Loader /> // Replace with your loader component
                ) : (
                    <div className="loan-table">
                        <table className='equal-table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Account Number</th>
                                    <th>Email</th>
                                    <th>Country</th>
                                    <th>Balance (USD)</th>
                                    <th>Balance (EUR)</th>
                                    <th>Balance (GBP)</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.firstname} {user.lastname}</td>
                                            <td>{user.accountNumber}</td>
                                            <td>{user.email}</td>
                                            <td>{user.country}</td>
                                            <td>{user.balance.USD.toFixed(2)}</td>
                                            <td>{user.balance.EUR.toFixed(2)}</td>
                                            <td>{user.balance.GBP.toFixed(2)}</td>
                                            <td className='action-tb'>
                                                <button onClick={() => handleEditClick(user._id, user.balance)}>Edit</button>
                                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="no-loan-message">No Users</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {editMode && (
                <div className='deposits-form'>
                    <div className="cancel-depo">
                        <FaTimes onClick={() => setEditMode(false)} />
                    </div>
                    <div className="send-money-container">
                        <form className="send-money-form" onSubmit={handleSubmit}>
                            <h2>Edit Balance</h2>
                            <div className="send-money-form-group">
                                <label htmlFor="currency">Currency <span>*</span></label>
                                <select
                                    id="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select One</option>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>
                            <div className="send-money-form-group">
                                <label htmlFor="amount">Amount <span>*</span></label>
                                <input
                                    type="number"
                                    id="amount"
                                    placeholder="Enter amount"
                                    value={formData.amount[formData.currency] || ""}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        amount: { ...prev.amount, [formData.currency]: e.target.value }
                                    }))}
                                    required
                                />
                            </div>
                            <div className="send-money-form-group">
                                <label htmlFor="msg">Send Refund Mail?</label>
                                <select
                                    id="msg"
                                    value={formData.msg || ""}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select One</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <button type="submit" className="send-money-send-btn">Change User Balance</button>
                        </form>
                    </div>
                </div>
            )}
            {confirm && (
                <AdminConfirm message='Are you sure you want to delete?' onConfirm={onConfirmDelete} onCancel={() => setConfirm(false)} />
            )}
        </div>
    );
}

export default Users;
