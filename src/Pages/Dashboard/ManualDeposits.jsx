import React, { useCallback, useState } from 'react';
import './menuitem.css';
import { FaAlignLeft, FaPlus, FaSignOutAlt, FaTimes, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import btc from '../../resources/images/bitcoin.png';
import usdt from '../../resources/images/usdt.png';
import paypal from '../../resources/images/paypal.webp';
import bank from '../../resources/images/bank.png';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function ManualDeposits() {
  const [dashUser,setdashUser]=useState(false)
  const [method, setMethod] = useState(null);
  const {user,dispatch}=useAuthContext();
  const [renderForm, setRenderForm] = useState(false);
  const [btnState,setBtnState]=useState("Deposit")
  const [formData, setFormData] = useState({
    amount: '',
    method: '',
    note: '',
    currency:'',
    paymentProof: null, // Added for the image proof
  });

  const onDrop = useCallback((acceptedFiles) => {
    // Set the image file in the formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      paymentProof: acceptedFiles[0], // assuming you handle one image only
    }));
    console.log(acceptedFiles);
  }, []);

  const [sidemenu, setSideMenu] = useState(false);
  const [shouldMenuSlide, setShouldMenuSlide] = useState(false);
  const hasActiveLoan = false;

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
    paymentData.append('image', formData.paymentProof);
    paymentData.append('amount', formData.amount);
    paymentData.append('currency', formData.currency);
    paymentData.append('method', method);
    paymentData.append('note', formData.note);

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/deposit`,paymentData,{
        headers:{
            Authorization:`Bearer ${user.token}`
        }
    }).then(response=>{
        setBtnState("Deposit")
       if(method=='Bitcoin'||method=='USDT (TRC20)'){
        toast.success("Deposit transaction successful. Pending verification, please await confirmation.")
       }else if(method=='Paypal'||method=='Bank'){
        toast.success("Deposit request successful. Our details will be sent to you for payment.")
       }
        setFormData({
            amount: '',
            method: '',
            note: '',
            currency:'',
            paymentProof: null,
        })
        setRenderForm(false)
    }).catch(error=>{
        setBtnState("Deposit")
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
          <FaAlignLeft onClick={() => {
            setShouldMenuSlide(true);
            setSideMenu(!sidemenu);
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
          sidemenu && (
            <Sidebar shouldMenuSlide={shouldMenuSlide} />
          )
        }
        <div className="loan-container auto-depo">
          <h2>Manual Deposit Methods</h2>
          <div className="methods">
            <div className="card-body">
              <img src={btc} alt="" />
              <p>Crypto Bitcoin</p>
              <span>Deposit Limit ($100.00 - $99,999,999.99)</span>
              <span>Deposit Charge ($0.00 + 1.50%)</span>
              <button onClick={() => {
                setRenderForm(true);
                setMethod("Bitcoin");
              }}>Deposit Now</button>
            </div>
            <div className="card-body">
              <img src={usdt} alt="" />
              <p>Crypto USDT (TRC20)</p>
              <span>Deposit Limit ($100.00 - $99,999,999.99)</span>
              <span>Deposit Charge ($0.00)</span>
              <button onClick={() => {
                setRenderForm(true);
                setMethod("USDT (TRC20)");
              }}>Deposit Now</button>
            </div>
            <div className="card-body">
              <img src={paypal} alt="" />
              <p>Paypal</p>
              <span>Deposit Limit ($100.00 - $99,999,999.99)</span>
              <span>Deposit Charge ($0.00)</span>
              <button onClick={() => {
                setRenderForm(true);
                setMethod("Paypal");
              }}>Deposit Now</button>
            </div>
            <div className="card-body">
              <img src={bank} alt="" />
              <p>Bank</p>
              <span>Deposit Limit ($100.00 - $99,999,999.99)</span>
              <span>Deposit Charge ($0.00)</span>
              <button onClick={() => {
                setRenderForm(true);
                setMethod("Bank");
              }}>Deposit Now</button>
            </div>
          </div>
        </div>
      </div>

      {
        renderForm && (
          <div className='deposits-form'>
            <div className="cancel-depo">
              <FaTimes onClick={() => {
                setRenderForm(false);
              }} />
            </div>
            <div className="send-money-container">
              <form className="send-money-form" onSubmit={handleSubmit}>
                <h2>Deposit Via {method}</h2>

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

                {
                  (method === 'Bitcoin' || method === 'USDT (TRC20)') && (
                    <div className="send-money-form-group">
                      <label htmlFor="amount">Instructions</label>
                      <input
                        type="text"
                        id="amount"
                        placeholder="Enter amount"
                        value={`Make ${method} payment to this address: 1LjZ5sVMsekgxrwCEESHBNNeazULp7kVYf`}
                        readOnly
                      />
                    </div>
                  )
                }

                {
                  (method === 'Paypal' || method === 'Bank') && (
                    <div className="send-money-form-group">
                      <label htmlFor="amount">Instructions</label>
                      <input
                        type="text"
                        id="amount"
                        placeholder="Enter amount"
                        value={`Submit your request with amount and we shall contact you with our ${method} details for payment`}
                        readOnly
                      />
                    </div>
                  )
                }

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
{
    (method === 'Bitcoin' || method === 'USDT (TRC20)') &&(
        <div className="send-money-form-group">
        <label htmlFor="paymentProof">Upload Proof of Payment</label>
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
            <>
            <p>Drag & drop some images here, or click to select images</p>
            <span>{formData.paymentProof?.path}</span>
            
            </>
          )}
        </div>
      </div>

    )
}
               

                
        {
          btnState=='Deposit'&&(
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
  );
}

export default ManualDeposits;
