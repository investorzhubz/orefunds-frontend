import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../Hooks/useAuthContext';
import axios from 'axios';
import { FaAlignLeft, FaSignOutAlt, FaTimes, FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AdminConfirm from './AdminConfirm';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSideBar';
import Loader from '../../Component/Loader/Loader'; // Import your Loader component

function FixedDeposits() {
    const { user } = useAuthContext();
    const [sidemenu, setSideMenu] = useState(false);
    const [data, setData] = useState([]);
    const [btnState, setBtnState] = useState("Change Loan Status");
    const [edit, setEdit] = useState(false);
    const [depositId, setDepositId] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [updateData, setUpdateData] = useState(null);
    const [shouldMenuSlide, setShouldMenuSlide] = useState(false);
    const [dashUser, setDashUser] = useState(false);
    const [image, setImage] = useState(false);
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        status: "",
        currency: '',
        img: null
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
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/get-fd`, {
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
    }, [user.token, updateData]);

    function formatMongoDate(mongoDate) {
        const date = new Date(mongoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    }

    const onConfirm = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/delete-fd/${depositId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            toast.success("Deleted Successfully");
            setConfirm(false);
            setUpdateData(depositId);
        } catch (error) {
            console.log(error);
        }
    };

    const onCancel = () => {
        setConfirm(false);
    };

    const handleDelete = (id) => {
        setDepositId(id);
        setConfirm(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleEditClick = (data) => {
        setEdit(true);
        setDepositId(data._id);
        setFormData({ ...formData, currency: data.currency });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnState("Processing...");
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/fd-status/${depositId}`, {
                action: formData.status,
                currency: formData.currency
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            toast.success("Status Updated Successfully");
            setUpdateData(response.data);
            setEdit(false);
        } catch (error) {
            toast.error(error.response.data);
        } finally {
            setBtnState("Change Loan Status");
        }
    };

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
            <div className="main-admin-dash loan-container">
                <div className="table-head">
                    <h2>Fixed Deposit Requests</h2>
                </div>
                {loading ? ( // Show loader while loading
                    <Loader /> // Replace with your loader component
                ) : (
                    <div className="loan-table">
                        <table className='equal-table'>
                            <thead>
                                <tr>
                                    <th>User Email</th>
                                    <th>Tenure</th>
                                    <th>Initial Amount</th>
                                    <th>Return Amount</th>
                                    <th>Mature Date</th>
                                    <th>Status</th>
                                    <th>Identity Proof</th>
                                    <th>Note</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.userEmail}</td>
                                            <td>{item.tenure} Months</td>
                                            <td>{item.amount} {item.currency}</td>
                                            <td>{item.returnAmount}</td>
                                            <td>{formatMongoDate(item.matureDate)}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <button onClick={() => {
                                                    setFormData({ ...formData, img: item.img });
                                                    setImage(true);
                                                }}>
                                                    View
                                                </button>
                                            </td>
                                            <td>{item.note || "null"}</td>
                                            <td className='action-tb'>
                                                <button onClick={() => handleEditClick(item)}>Edit</button>
                                                <button onClick={() => handleDelete(item._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="no-loan-message">No Fixed Deposit Request</td>
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
                            <h2>Edit Deposit Status</h2>
                            <div className="send-money-form-group">
                                <label htmlFor="status">Status<span>*</span></label>
                                <select id="status" value={formData.status} onChange={handleChange} required>
                                    <option value="" disabled>Select One</option>
                                    <option value="Approve">Approve</option>
                                    <option value="Reject">Reject</option>
                                </select>
                            </div>
                            <button type="submit" className="send-money-send-btn" disabled={btnState === "Processing..."}>{btnState}</button>
                        </form>
                    </div>
                </div>
            )}
            {confirm && (
                <AdminConfirm message='Are you sure you want to delete?' onConfirm={onConfirm} onCancel={onCancel} />
            )}
            {image && formData.img && (
                <div className="dataImg">
                    <FaTimes size={30} color='white' onClick={() => setImage(false)} />
                    <img src={`${process.env.REACT_APP_IMG_BACKEND_URL}images/${formData.img}`} alt="" />
                </div>
            )}
        </div>
    );
}

export default FixedDeposits;
