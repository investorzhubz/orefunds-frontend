
import React, { useState,useCallback } from 'react'
import './menuitem.css'
import { FaAlignLeft, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { toast } from 'wc-toast';
import { Link } from 'react-router-dom';
function CreateTicket() {
  const [dashUser,setdashUser]=useState(false)
  const {user,dispatch}=useAuthContext();
        const [formData, setFormData] = useState({
          subject: '',
          note: '',
          ticketImg:null,
          email:''
        });
        const [sidemenu,setSideMenu]=useState(false)
        const [btnState,setBtnState]=useState("Submit")
        const [shouldMenuSlide,setShouldMenuSlide]=useState(false)
        const onDrop = useCallback((acceptedFiles) => {
            // Handle the image files
            setFormData((prevFormData) => ({
                ...prevFormData,
                ticketImg: acceptedFiles[0], // assuming you handle one image only
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
      
        const handleSubmit = (e) => {
          e.preventDefault();
          setBtnState("Processing...")
          const paymentData = new FormData();
          paymentData.append('image', formData.ticketImg);
          paymentData.append('subject', formData.subject);
          paymentData.append('note', formData.note);
          paymentData.append('email', formData.email);
          console.log(formData);
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/create-ticket`,paymentData,{
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        }).then(response=>{
            setBtnState("Submit")
            setFormData({
                subject: '',
          note: '',
          ticketImg:null,
          email:''
            })
      
          toast.success("Your support ticket has been submitted successfully");

        }).catch(error=>{
            setBtnState("Submit")
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
        <h2>Create New Ticket</h2>



       <div className="send-money-grid">
       <div className="send-money-form-group">
          <label htmlFor="subject">Subject<span>*</span></label>
          <input 
            type="text"
            id="subject" 
            value={formData.subject} 
            onChange={handleChange} 
            required
          />
        </div>
      
       </div>
       
       <div className="send-money-grid">
       <div className="send-money-form-group">
          <label htmlFor="email">Email<span>*</span></label>
          <input 
            type="email"
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
            required
          />
        </div>
      
       </div>


       <div className="send-money-form-group">
          <label htmlFor="note">Message <span>*</span></label>
          <textarea 
            id="note" 
            rows="3" 
            placeholder="Enter your message" 
            value={formData.note} 
            onChange={handleChange} 
            required
          />
        </div>


       <div className="send-money-form-group ">
          <label htmlFor="note">Attachment</label>
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
        <span>{formData.ticketImg?.path}</span>
        </>
      )}
    </div>
          
        </div>

        

       

      


        {
          btnState=='Submit'&&(
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

export default CreateTicket
