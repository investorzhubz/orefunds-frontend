import React, { useCallback, useState } from 'react'
import './menuitem.css'
import { FaAlignLeft, FaPlus, FaSignOutAlt, FaTimes, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import btc from '../../resources/images/bitcoin.png'
import usdt from '../../resources/images/usdt.png'
import paypal from '../../resources/images/paypal.webp'
import bank from '../../resources/images/bank.png'
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
function Withdraw() {
    const [method,setMethod]=useState(null)
    const [dashUser,setdashUser]=useState(false)
    const [renderForm,setRenderForm]=useState(false)
    const [btnState,setBtnState]=useState("Withdraw")
    const {user,dispatch}=useAuthContext()
    

    const [formData, setFormData] = useState({
        toAddress: '',
        currency: '',
        amount: '',
        method:'',
        note: '',
        bankName:''
      });
    
    const [sidemenu,setSideMenu]=useState(false)
    const [shouldMenuSlide,setShouldMenuSlide]=useState(false)
    const hasActiveLoan = false;

    const logout=()=>{
      dispatch({type:'LOGOUT',payload:null})
  }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        formData.method=method
        console.log(formData);
        // toast.error("Withdrawal request failed. Contact ad")

        
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/withdraw`,formData,{
        headers:{
            Authorization:`Bearer ${user.token}`
        }
    }).then(response=>{
        setBtnState("Withdraw")
   
        toast.error("Withdrawal request failed")
      
        setFormData({
            toAddress: '',
            currency: '',
            amount: '',
            note: '',
            currency:'',
            bankName:''
        })
        setRenderForm(false)
    }).catch(error=>{
        setBtnState("Withdraw")
        toast.error(error.response.data.error)
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
               <div className="loan-container auto-depo">
 
     <h2>Choose Withdrawal Method</h2>
   <div className="methods">
    <div className="card-body" >
        <img src={paypal} alt="" />
        <p>Paypal</p>
        <span>Withdrawal Limit ($100.00 - $99,999,999.99)</span>
        <span>Withdrawal Charge ($0.00)</span>
        <button onClick={()=>{
             setRenderForm(true)
            setMethod("Paypal")
        }}>Withdraw Now</button>
    </div>
    <div className="card-body">
        <img src={bank} alt="" />
        <p>Bank Transfer</p>
        <span>Withdrawal Limit ($100.00 - $99,999,999.99)</span>
        <span>Withdrawal Charge ($0.00)</span>
        <button onClick={()=>{
             setRenderForm(true)
            setMethod("Bank")
        }}>Withdraw Now</button>
    </div>
    
   </div>
    
    </div>



   </div>

   {
    renderForm&&(
        <div className='deposits-form'>
    <div className="cancel-depo">
        <FaTimes  onClick={()=>{
             setRenderForm(false)
        }}/>
    </div>
   <div className="send-money-container">
      <form className="send-money-form" onSubmit={handleSubmit}>
        <h2>Withdraw Via {method}</h2>



        <div className="send-money-form-group">
          <label htmlFor="currency">Currency<span>*</span></label>
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
       <div className="send-money-grid">
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

      {
        method=='Paypal'&&(
            <div className="send-money-form-group">
            <label htmlFor="amount">Paypal Email Address <span>*</span></label>
            <input 
              type="text" 
              id="toAddress" 
              placeholder="Enter Paypal Email Address" 
              value={formData.toAddress} 
              onChange={handleChange} 
              required 
            />
          </div>
        )
      }
        {
        method=='Bank'&&(
            <>
            <div className="send-money-form-group">
            <label htmlFor="amount">Bank Name <span>*</span></label>
            <input 
              type="text" 
              id="bankName" 
              placeholder="Enter Bank Name" 
              value={formData.bankName} 
              onChange={handleChange} 
              required 
            />
          </div>
            <div className="send-money-form-group">
            <label htmlFor="amount">Account Number <span>*</span></label>
            <input 
              type="text" 
              id="toAddress" 
              placeholder="Enter Account Number" 
              value={formData.toAddress} 
              onChange={handleChange} 
              required 
            />
          </div>
            </>
        )
      }

        

       

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


        {/* <div className="send-money-form-group">
          <label htmlFor="note">Upload Proof of Payment</label>
          <div
      {...getRootProps()}
      style={{
        border: '2px dashed #007bff',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: isDragActive ? '#e0f7fa' : '#f9f9f9',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p>Drag & drop some images here, or click to select images</p>
      )}
    </div>
          
        </div> */}

{
          btnState=='Withdraw'&&(
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
    )
   }
 
</div>
  )
}

export default Withdraw
