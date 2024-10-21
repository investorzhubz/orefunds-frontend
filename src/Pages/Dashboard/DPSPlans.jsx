


import React, { useState,useCallback } from 'react'
import './menuitem.css'
import { FaAlignLeft, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useDropzone } from 'react-dropzone';
import Confirmation from './Confirmation';
import axios from 'axios';
import { toast } from 'wc-toast';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';
function DPSPlans() {
        const {user,dispatch}=useAuthContext();
        const [dashUser,setdashUser]=useState(false)
        const navigate=useNavigate()
        const [sidemenu,setSideMenu]=useState(false)
        const [shouldMenuSlide,setShouldMenuSlide]=useState(false)
        const [confirm,setConfirm]=useState(false)
        const [planName,setPlanName]=useState(null)
        const onDrop = useCallback((acceptedFiles) => {
            // Handle the image files
            console.log(acceptedFiles);
          }, []);
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: 'image/*', // Accept only images
          });
      
        const handleConfirm = (plan) => {
          
          // Handle form submission logic
           setConfirm(true)
           setPlanName(plan)
        };
        const logout=()=>{
          dispatch({type:'LOGOUT',payload:null})
      }

        const depositSchemes = [
            {
              plan: "Starter",
              interestRate: 5.00,
              currency: "USD",
              perInstallment: 50.00,
              installmentInterval: "Every 1 Month",
              totalInstallments: 36,
              totalDeposit: 1800.00,
              maturedAmount: 1890.00
            },
            {
              plan: "Basic",
              interestRate: 10.00,
              currency: "USD",
              perInstallment: 100.00,
              installmentInterval: "Every 1 Month",
              totalInstallments: 100,
              totalDeposit: 10000.00,
              maturedAmount: 11000.00
            },
            {
              plan: "Professional",
              interestRate: 15.00,
              currency: "USD",
              perInstallment: 200.00,
              installmentInterval: "Every 1 Month",
              totalInstallments: 120,
              totalDeposit: 24000.00,
              maturedAmount: 27600.00
            }
          ];

          const onConfirm=()=>{
            setConfirm(true)
            const data=depositSchemes.find(dps=>dps.plan===planName.plan)
            console.log(data)
            // Handle form submission logic
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/dps`,data,{
              headers:{
                  Authorization:`Bearer ${user.token}`
              }
          }).then(response=>{
            navigate('/deposit/manual_methods/')
        
            toast.info("Your transaction is pending. Please deposit the plan amount and await confirmation.");

          }).catch(error=>{
              toast.error(error.response.data.error)
              console.log(error.response) 
          })
    
          }
          const onCancel=()=>[
            setConfirm(false)
          ]
          
  return (
    <div className='dashboard dpsplans'>
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
      <div className="dps">
      {
        depositSchemes&&depositSchemes.map((plan,index)=>(
            <div className="card">
      <div className="card-header">
        <span className="plan-name">{plan.plan}</span>
        <span className="plan-rate">{plan.interestRate}%</span>
      </div>
      <div className="card-body">
        <div className="plan-detail">
        ✔️ Currency <span className="detail-value">{plan.currency}</span>
        </div>
        <div className="plan-detail">
        ✔️ Per Installment <span className="detail-value">${plan.perInstallment}</span>
        </div>
        <div className="plan-detail">
        ✔️ Installment Interval <span className="detail-value">{plan.installmentInterval}</span>
        </div>
        <div className="plan-detail">
        ✔️ Interest Rate <span className="detail-value">{plan.interestRate}%</span>
        </div>
        <div className="plan-detail">
        ✔️ Total Installment <span className="detail-value">{plan.totalDeposit}</span>
        </div>
        <div className="plan-detail">
        ✔️ Total Deposit <span className="detail-value">${plan.totalDeposit}</span>
        </div>
        <div className="plan-detail">
        ✔️ Matured Amount <span className="detail-value">${plan.maturedAmount}</span>
        </div>
      </div>
      <div className="card-footer">
        <button className="apply-now-btn" onClick={()=>{
           handleConfirm(plan)
        }}>Apply Now</button>
      </div>
    </div>
        ))
      }
      </div>


    <div className="confirm">
        {
        confirm&&(
                <Confirmation message={planName.plan} onConfirm={onConfirm} onCancel={onCancel}/>
            )
        }
    </div>
        </div>
      
    </div>
  )
}




export default DPSPlans
