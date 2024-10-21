import React, { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../../Hooks/useLogin'
import { ToastContainer,toast } from 'wc-toast'
import { useAuthContext } from '../../Hooks/useAuthContext'

function Login() {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const {loading,error,login}=useLogin()
    const [btn, setBtnState] = useState('Login');
    const {dispatch}=useAuthContext()
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
      setBtnState('Processing...')
        e.preventDefault()
        const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/login-admin`,{
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({username,password})
       })
       const json=await response.json()
       
       if(!response.ok){
         
        toast.error(json.error)
        setBtnState('Login')
       }
       if(response.ok){
        setBtnState('Login')
          localStorage.setItem('user',JSON.stringify(json))
          dispatch({type:'LOGIN',payload:json})
          navigate('/admin-panel')

       }
        

    }

  return (
    <div className="signup">
      <ToastContainer />
      <div className="signfrom">
      <div className="signav" style={{position:'relative' ,zIndex:'999'}}>
       
        
       </div>
        <div className='signupform' >
        <form className="form" onSubmit={handleSubmit}>
          <div>
   
     
          </div>
       <p className="form-title">Log in to your account</p>
       <div className="input-container">
          <input placeholder="Username" type="text" onChange={(e)=>{
            setUsername(e.target.value)
          }} value={username}/>
        </div>
        <div className="input-container">
          <input placeholder="Enter password" type="password"  onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
        </div>
         <button className="submit" type="submit">
        {btn}
      </button>
      
   </form>
        

      
    </div>
    </div>
    
    
    </div>
  )
}

export default Login