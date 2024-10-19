import React, { useState } from 'react'
import './menuitem.css'
import { FaAlignLeft, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { Link } from 'react-router-dom';
function NewPaymentReq() {
    const {user,dispatch}=useAuthContext();
    const [dashUser,setdashUser]=useState(false)
    const [formData, setFormData] = useState({
       receiverAccount: '',
        currency: '',
        amount: '',
        note: '',
      });
      const [sidemenu,setSideMenu]=useState(false)
      const [shouldMenuSlide,setShouldMenuSlide]=useState(false)
      const [btnState,setBtnState]=useState("Send Request")
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
   
      const logout=()=>{
        dispatch({type:'LOGOUT',payload:null})
    }
        const handleSubmit = (e) => {
            e.preventDefault();
            setBtnState("Processing")
            console.log(formData);
            // Handle form submission logic
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/payment-request`,formData,{
              headers:{
                  Authorization:`Bearer ${user.token}`
              }
          }).then(response=>{
              setBtnState("Send Request")
              toast.info("Request Pending, await confirmation")
              setFormData({
                receiverAccount: '',
                currency: '',
                amount: '',
                note: '',
              })
          }).catch(error=>{
              toast.error(error.response.data.error)
              setBtnState("Send Request")
              console.log(error.response)
      
             
          })
          };

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
   <h2>New Payment Request</h2>

  <div className="send-money-grid">
  <div className="send-money-form-group">
     <label htmlFor="receiverAccount">Receiver Account <span>*</span></label>
     <input 
       type="text" 
       id="receiverAccount" 
       placeholder="Enter Receiver account email or account number" 
       value={formData.receiverAccount} 
       onChange={handleChange} 
       required 
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
       placeholder="Enter account email or account number" 
       value={formData.amount} 
       onChange={handleChange} 
       required 
     />
   </div>
  </div>

   

  

   <div className="send-money-form-group">
     <label htmlFor="note">Description</label>
     <textarea 
       id="note" 
       rows="3" 
       placeholder="Enter a note (optional)" 
       value={formData.note} 
       onChange={handleChange} 
     />
   </div>



   <button type="submit" className="send-money-send-btn">{btnState}</button>
 </form>
</div>



   </div>
 
</div>
  )
}

export default NewPaymentReq
