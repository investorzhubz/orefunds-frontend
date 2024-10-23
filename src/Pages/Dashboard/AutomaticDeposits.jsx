import React, { useState } from 'react'
import './menuitem.css'
import { FaAlignLeft, FaPlus, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { Link } from 'react-router-dom';

function AutomaticDeposits() {
    const [sidemenu,setSideMenu]=useState(false)
    const [dashUser,setdashUser]=useState(false)
       const [shouldMenuSlide,setShouldMenuSlide]=useState(false)
       const hasActiveLoan = false;
       const {user,dispatch}=useAuthContext();

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
               <div className="loan-container auto-depo">
 
     <h2>Automatic Deposit Methods</h2>
   <div className="methods">
    <p>Coming soon</p>
   </div>
    
    </div>



   </div>
 
</div>
  )
}

export default AutomaticDeposits
