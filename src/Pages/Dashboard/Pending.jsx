

import React, { useState } from 'react'
import './menuitem.css'
import { FaAlignLeft, FaPlus, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

function Pending() {
       const [dashUser,setdashUser]=useState(false)
       const {user,dispatch}=useAuthContext();
       const [shouldMenuSlide,setShouldMenuSlide]=useState(false)
       const hasActiveLoan = false;
       const [sidemenu,setSideMenu]=useState(false)

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
               <div className="loan-container">
     <div className="table-head">
     <h2>Pending Tickets</h2>
     <button><FaPlus/>Add New</button>
     </div>
      <div className="loan-table">
        <table className='equal-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Created</th>
              <th>Total Payable</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hasActiveLoan ? (
              <tr>
                <td>12345</td>
                <td>12/15/2024</td>
                <td>Pending</td>
                <td>$250.00</td>
                <td>techwebdev@gmail.com</td>
                <td>techwebdev@gmail.com</td>
                <td>techwebdev@gmail.com</td>
              
              </tr>
            ) : (
              <tr>
                <td colSpan="5" className="no-loan-message">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>



   </div>
 
</div>
  )
}

export default Pending
