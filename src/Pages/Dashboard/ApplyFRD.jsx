import React, { useState, useCallback } from 'react'
import './menuitem.css'
import { FaAlignLeft, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { toast } from 'wc-toast';
import { Link } from 'react-router-dom';

function ApplyFRD() {
    const [dashUser,setdashUser]=useState(false)
    const [formData, setFormData] = useState({
        tenure: '',
        currency: '',
        amount: '',
        note: '',
        returnAmount: '',
        matureDate: '',
        idProof: null
    });

    const [sidemenu, setSideMenu] = useState(false);
    const [btnState, setBtnState] = useState("Submit Application");
    const {user,dispatch}=useAuthContext();
    const [shouldMenuSlide, setShouldMenuSlide] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            idProof: acceptedFiles[0], // assuming you handle one image only
        }));
        console.log(acceptedFiles);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*', // Accept only images
    });

    const calculateReturnAmount = (amount, tenure) => {
        console.log(tenure)
        const interestRate = 0.05; // Assuming a 5% annual interest rate
        // const tenureInYears = tenure / 12; // Convert months to years
        return (amount * (1 + (interestRate * tenure))).toFixed(2); // Compound interest formula
    };

    const calculateMatureDate = (tenure) => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + tenure); // Add tenure months to the current date
        return currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnState("Processing...");

        const tenureInMonths = parseInt(formData.tenure);
        const returnAmount = calculateReturnAmount(formData.amount, tenureInMonths);
        const matureDate = calculateMatureDate(tenureInMonths);

        const paymentData = new FormData();
        paymentData.append('image', formData.idProof);
        paymentData.append('amount', formData.amount);
        paymentData.append('currency', formData.currency);
        paymentData.append('tenure', formData.tenure);
        paymentData.append('note', formData.note);
        paymentData.append('returnAmount', returnAmount);
        paymentData.append('matureDate', matureDate);

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/fixed-deposits`, paymentData, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }).then(response => {
            setBtnState("Submit Application");
            toast.success("Deposit Request Successful. Pending verification, please await confirmation.");

            setFormData({
                tenure: '',
                currency: '',
                amount: '',
                note: '',
                returnAmount: '',
                matureDate: '',
                idProof: null
            });
        }).catch(error => {
            setBtnState("Submit Application");
            toast.error(error.response?.data?.error || "An error occurred");
            console.log(error.response);
        });
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
                {sidemenu && (
                    <Sidebar shouldMenuSlide={shouldMenuSlide} />
                )}
                <div className="send-money-container">
                    <form className="send-money-form" onSubmit={handleSubmit}>
                        <h2>Apply Fixed Deposit</h2>

                        <div className="send-money-grid">
                            <div className="send-money-form-group">
                                <label htmlFor="tenure">Tenure<span>*</span></label>
                                <select
                                    id="tenure"
                                    value={formData.tenure}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select One</option>
                                    <option value="3">3 Months</option>
                                    <option value="6">6 Months</option>
                                    <option value="12">1 Year</option>
                                    <option value="24">2 Years</option>
                                    <option value="36">3 Years</option>
                                </select>
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
                            <label htmlFor="idProof">Upload Any Proof of Identity</label>
                            <div
                                {...getRootProps()}
                                style={{
                                    border: '2px dashed #007bff',
                                    padding: '20px',
                                    textAlign: 'center',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    margin: '1rem 0',
                                    backgroundColor: isDragActive ? '#e0f7fa' : '#f9f9f9',
                                }}
                            >
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p>Drop the image here...</p>
                                ) : (
                                    <>
                                        <p>Drag & drop some images here, or click to select images</p>
                                        <span>{formData.idProof?.name}</span>
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

                        <div className="send-money-form-group">
                            <label>Return Amount</label>
                            <input
                                type="text"
                                value={calculateReturnAmount(formData.amount, parseInt(formData.tenure) || 0)}
                                readOnly
                            />
                        </div>

                        <div className="send-money-form-group">
                            <label>Mature Date</label>
                            <input
                                type="text"
                                value={calculateMatureDate(parseInt(formData.tenure) || 0)}
                                readOnly
                            />
                        </div>

                        {
                            btnState === 'Submit Application' && (
                                <button type="submit" className="send-money-send-btn">{btnState}</button>
                            )
                        }

                        {
                            btnState === 'Processing...' && (
                                <button type="submit" disabled className="send-money-send-btn">{btnState}</button>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ApplyFRD;
