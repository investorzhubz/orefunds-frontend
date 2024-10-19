import React, { useEffect, useState } from 'react'
import {FaUser, FaEye,FaEyeSlash} from 'react-icons/fa'
import {useAuthContext}from '../../Hooks/useAuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'
function ForgotPassword() {
    const [data,setData]=useState([])
    const [disabled,setDisabled]=useState(false)
    const {user,dispatch}=useAuthContext()
    const [btnState,setBtnState]=useState('Submit')
    const [seePassword,setSeePassword]=useState(false)

    const navigate=useNavigate()
  
  
  
    // useEffect(()=>{
    //     console.log(data)
    //     if(data.email&&data.password){
    //         setDisabled(false)
    //     }else{
    //         // setDisabled(true)
    //     }
  
  
    // },[data])
  
    const handleSubmit=(e)=>{
        e.preventDefault()
        setDisabled(true)
        setBtnState("Processing...")
        console.log("in handle submit")
        console.log(process.env.REACT_APP_API_URL)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/forgot-password`,data,{
            headers:{
                "Content-Type":'application/json'
            }
        }).then(response=>{
            setDisabled(false)
            setBtnState("Submit")
            setData({
               
                email:"",
               
            })
            toast.success("Check your email for the password reset link");
          
        }).catch(error=>{
            setDisabled(false)
          console.log("in bad response")
          setBtnState("Submit")
         
              toast.error(error.response.data.error)
  
    
        })
    
       }
    return (
      <div className='login-user'>
         
      <div className='signup'>
    
  
        <div className="signup-form">
          <form onSubmit={(e)=>{
              handleSubmit(e)
          }}>
              <div className="form-head">
              <h3>Reset your password </h3>
              </div>
              <div className="form-input">
              <label>Email</label>
              <input type="email" onChange={(e)=>{
                  setData({
                      ...data,
                      email:e.target.value
                  })
              }} value={data?.email} placeholder='Enter your account email' required/>
              </div>
              {/* <div className="form-input">
              <label>New Password</label>
              <div className='password-input' >
              <input type={seePassword?"text":"password"} onChange={(e)=>{
                  setData({
                      ...data,
                      password:e.target.value
                  })
              }} value={data?.password} placeholder='Enter Password' required/>
                     {
                      seePassword?(
                              <div onClick={()=>{
                                  console.log("Eye Slash")
                                  setSeePassword(false)
                              }} >
                                  <FaEyeSlash  style={{zIndex:99,cursor:"pointer"}}/>
                             
                              </div>
                          ):(
                              <div onClick={()=>{
                                  console.log("Eye")
                                  setSeePassword((true))
  
                              }} style={{zIndex:99,cursor:"pointer"}}>
                                   <FaEye />
  
                              </div>
                             
                          )
                      }
              </div>
              </div> */}
  
              <button type='submit' disabled={disabled}  className={disabled?'disabled':'enable'}>{btnState}</button>
  
          </form>
        </div>
      
      </div>
    
      </div>
    )
  }

export default ForgotPassword
