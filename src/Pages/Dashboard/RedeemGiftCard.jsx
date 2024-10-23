import React, { useState } from 'react'
import './menuitem.css'
import { FaAlignLeft, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { toast } from 'wc-toast';
import { Link } from 'react-router-dom';

function RedeemGiftCard() {
    const [formData, setFormData] = useState({
       code: '',
      
      });
      const [sidemenu,setSideMenu]=useState(false)
      const [shouldMenuSlide,setShouldMenuSlide]=useState(false)
      const [btnState,setBtnState]=useState("Redeem")
      const [dashUser,setdashUser]=useState(false)
      const {user,dispatch}=useAuthContext();
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setBtnState("Processing...")
        console.log(formData);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/redeem`,formData,{
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        }).then(response=>{
            setBtnState("Redeem")
            toast.success("Gift card redeem request successful. Pending verification, please await confirmation.")
            setFormData({
                code: '',
               
               })
        }).catch(error=>{
            setBtnState("Redeem")
        toast.error(error.response.data.error)
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
        <h2>Redeem Gift Card</h2>

       <div className="send-money-grid">
       <div className="send-money-form-group">
          <label htmlFor="accountNumber">GIFT CARD CODE<span>*</span></label>
          <input 
            type="text" 
            id="code" 
            placeholder="Enter Gift Card Code" 
            value={formData.code} 
            onChange={handleChange} 
            required 
          />
        </div>

        
       </div>

 
       
                
       {
          btnState=='Redeem'&&(
            <button type="submit" className="send-money-send-btn">{btnState}</button>
          )
        }

        {
          btnState=='Processing...'&&(
            <button type="submit"  disabled className="send-money-send-btn">{btnState}</button>
          )
        }
      </form>
    </div>



        </div>
      
    </div>
  )
}

export default RedeemGiftCard
