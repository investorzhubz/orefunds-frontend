import React, { useState } from 'react'
import './menuitem.css'
import { FaAlignLeft, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useAuthContext } from '../../Hooks/useAuthContext';
import axios from 'axios';
import { toast } from 'wc-toast';
import { Link } from 'react-router-dom';

function SendMoney() {
  const [dashUser,setdashUser]=useState(false)
        const [formData, setFormData] = useState({
          accountId: '',
          accountName: '',
          currency: '',
          amount: '',
          note:''
    
        });
        const [sidemenu,setSideMenu]=useState(false)
        const [shouldMenuSlide,setShouldMenuSlide]=useState(false)
        const [btnState,setBtnState]=useState("Send Money")
        const {user,dispatch}=useAuthContext();
      
        const handleChange = (e) => {
          setFormData({ ...formData, [e.target.id]: e.target.value });
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          setBtnState("Processing")
          console.log(formData);
          // Handle form submission logic
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/send-money`,formData,{
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        }).then(response=>{
            setBtnState("Send Money")
            toast.info("Transaction Pending, await confirmation")
            setFormData({
                accountId: '',
          accountName: '',
          currency: '',
          amount: '',
          note:''
            })
        }).catch(error=>{
            toast.error(error.response.data.error)
            setBtnState("Send Money")
            console.log(error.response)
    
           
        })
        };
        const logout=()=>{
          dispatch({type:'LOGOUT',payload:null})
      }

  return (
    <div className='dashboard'>
         <div className="dashboard-header">
            <div className="rights-side">
                <Link to='/' style={{textDecoration:'none',color:'white',cursor:'pointer'}}><p>{process.env.REACT_APP_APP_NAME}</p></Link>
                <FaAlignLeft onClick={()=>{
                    setShouldMenuSlide(true)
                    setSideMenu(!sidemenu)
                }} />
            </div>
            <div className="left-side">
                <FaUserAlt onClick={()=>{
                    setdashUser(!dashUser)
                }}/>
             </div>
             {
                    dashUser&&(
                        <div className="user-menu">
                            
                            <Link style={{textDecoration:'none', color:'#6e6e6e',marginTop:".8rem"}} to={'/user-profile'}><p>Profile Overview</p></Link>
                            <Link style={{textDecoration:'none', color:'#6e6e6e',marginTop:".8rem"}} to={'/profile-setting'}> <p>Profile Settings</p></Link>
                            <p className='logout' onClick={()=>{
                                logout()
                            }}><FaSignOutAlt />Logout</p>
                        </div>
                    )
                }
        </div>
        <div className="dashboard-main-section">
            {
                sidemenu&&(
                   <Sidebar shouldMenuSlide={shouldMenuSlide} />
                )
            }
            <div className="send-money-container">
      <form className="send-money-form" onSubmit={handleSubmit}>
        <h2>Send Money</h2>

       <div className="send-money-grid">
       <div className="send-money-form-group">
          <label htmlFor="accountNumber">Account Number / Email <span>*</span></label>
          <input 
            type="text" 
            id="accountId" 
            placeholder="Enter account number or email" 
            value={formData.accountId} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="send-money-form-group">
          <label htmlFor="accountName">Account Name</label>
          <input 
            type="text" 
            id="accountName" 
            placeholder="Enter account name" 
            value={formData.accountName} 
            onChange={handleChange} 
          />
        </div>
       </div>

       <div className="send-money-grid">
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
            value={formData.amount} 
            onChange={handleChange} 
            required 
          />
        </div>
       </div>

        

       

        <div className="send-money-form-group">
          <label htmlFor="note">Note</label>
          <textarea 
            id="note" 
            rows="3" 
            placeholder="Enter a note (optional)" 
            value={formData.note} 
            onChange={handleChange} 
          />
        </div>

        <p className="send-money-transaction-fee">$ transaction charge will be applied</p>

        <button type="submit" className="send-money-send-btn">{btnState}</button>
      </form>
    </div>



        </div>
      
    </div>
  )
}

export default SendMoney
