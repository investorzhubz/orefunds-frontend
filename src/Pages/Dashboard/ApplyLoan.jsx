
import React, { useState,useCallback } from 'react'
import './menuitem.css'
import { FaAlignLeft, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
function ApplyLoan() {
       const [dashUser,setdashUser]=useState(false)
        const [formData, setFormData] = useState({
          loanProduct: '',
          currency: '',
          firstPaymentDate: '',
          amount: '',
          note: '',
          idProof:null
        });
        const {user,dispatch}=useAuthContext();
        const [sidemenu,setSideMenu]=useState(false)
        const [btnState,setBtnState]=useState("Submit Application")
        const [shouldMenuSlide,setShouldMenuSlide]=useState(false)
        const onDrop = useCallback((acceptedFiles) => {
            setFormData((prevFormData) => ({
                ...prevFormData,
                idProof: acceptedFiles[0], // assuming you handle one image only
              }))
            console.log(acceptedFiles);
          }, []);
      
        const handleChange = (e) => {
          setFormData({ ...formData, [e.target.id]: e.target.value });
        };
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: 'image/*', // Accept only images
          });
      
          const handleSubmit = (e) => {
            e.preventDefault();
            setBtnState("Processing...")
            const paymentData = new FormData();
            paymentData.append('image', formData.idProof);
            paymentData.append('amount', formData.amount);
            paymentData.append('currency', formData.currency);
            paymentData.append('loanProduct', formData.loanProduct);
            paymentData.append('firstPaymentDate', formData.firstPaymentDate);
            paymentData.append('note', formData.note);
        
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/loan`,paymentData,{
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }).then(response=>{
                setBtnState("Submit Application")
              
                toast.success("Deposit Request Succesfull. Pending verification, please await confirmation.")
               
                setFormData({
          loanProduct: '',
          currency: '',
          firstPaymentDate: '',
          amount: '',
          note: '',
          idProof:null
                })
     
            }).catch(error=>{
                setBtnState("Submit Application")
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
        <h2>Apply New Loan</h2>

       <div className="send-money-grid">
       <div className="send-money-form-group">
          <label htmlFor="loanproduct">Loan Product <span>*</span></label>
          <select 
            id="loanProduct" 
            value={formData.loanProduct} 
            onChange={handleChange} 
            required
          >

            
            <option value="" disabled>Select One</option>
            <option value="Student Loan">Student Loan</option>
            <option value="Business Loan">Business Loan</option>
            <option value="Enterprise Loan">Enterprise Loan</option>
          </select>
        </div>
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
      
       </div>

       <div className="send-money-grid">
       <div className="send-money-form-group">
          <label htmlFor="accountName">First Payment Date <span>*</span></label>
          <input 
            type="date" 
            id="firstPaymentDate" 
            placeholder="Enter account name" 
            value={formData.firstPaymentDate} 
            onChange={handleChange} 
          />
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

       <div className="send-money-form-group ">
          <label htmlFor="note">Upload Any Proof of Identity</label>
          <div
      {...getRootProps()}
      style={{
        border: '2px dashed #007bff',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '8px',
        cursor: 'pointer',
        margin:'1rem 0',
        backgroundColor: isDragActive ? '#e0f7fa' : '#f9f9f9',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <>
        <p>Drag & drop some images here, or click to select images</p>
        <span>{formData.idProof?.path}</span>
        </>
      )}
    </div>
          
        </div>

        

       

        <div className="send-money-form-group">
          <label htmlFor="note">Remarks</label>
          <textarea 
            id="note" 
            rows="3" 
            placeholder="Enter a note (optional)" 
            value={formData.note} 
            onChange={handleChange} 
          />
        </div>


        {
          btnState=='Submit Application'&&(
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

export default ApplyLoan
