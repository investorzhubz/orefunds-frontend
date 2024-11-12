import React, { useEffect, useState } from 'react'
import './loginuser.css'
import {FaUser, FaEye,FaEyeSlash} from 'react-icons/fa'
import {useAuthContext}from '../../Hooks/useAuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'wc-toast';
import axios from 'axios'
import Navigation from '../../Component/Navigation/Navigation';

function LoginUser() {
  const [data,setData]=useState([])
  const [disabled,setDisabled]=useState(true)
  const {user,dispatch}=useAuthContext()
  const [btnState,setBtnState]=useState('Sign in')
  const [seePassword,setSeePassword]=useState(false)
  const navigate=useNavigate()



  useEffect(()=>{
      console.log(data)
      if(data.email&&data.password){
          setDisabled(false)
      }else{
          setDisabled(true)
      }


  },[data])

  const handleSubmit=(e)=>{
      e.preventDefault()
      setBtnState("Processing...")
      console.log("in handle submit")
      console.log(process.env.REACT_APP_API_URL)
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login-user`,data,{
          headers:{
              "Content-Type":'application/json'
          }
      }).then(response=>{
          setData({
             
              email:"",
              password:'',
             
          })
          toast.success("You have successfully signed in")
        console.log("in good response")
          localStorage.setItem('user',JSON.stringify(response.data))
          dispatch({type:'LOGIN',payload:response.data})
          setBtnState("Sign In")
        
            navigate('/dashboard')
  
        
      }).catch(error=>{
          
        console.log("in bad response")
        setBtnState("Sign in")
            toast.error(error.response.data.error)

  
      })
  
     }
  return (
    <>
    <Navigation />
    <div className='login-user'>
        
       
    <div className='signup'>
  

      <div className="signup-form">
        <form onSubmit={(e)=>{
            handleSubmit(e)
        }}>
            <div className="form-head">
            <h3>Login to Account </h3>
            </div>
            <div className="form-input">
            <label>Email / Account Number</label>
            <input type="text" onChange={(e)=>{
                setData({
                    ...data,
                    email:e.target.value
                })
            }} value={data?.email} placeholder='Enter your email or Account Number' required/>
            </div>
            <div className="form-input">
            <label>Password</label>
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
            </div>

            <button type='submit' disabled={disabled}  className={disabled?'disabled':'enable'}> {btnState}</button>
           <Link to='/forgot-password' style={{textDecoration:'none',width:'100%'}}> <button   className='forgot-pass'>Forgot Password</button></Link>

        </form>
      </div>
    
    </div>
  
    </div>
    
    </>
  )
}

export default LoginUser
