import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { toast } from 'react-toastify'

function VerifyEmail() {


    const navigate=useNavigate()
    const {user,dispatch}=useAuthContext()
    const params = new URLSearchParams(window.location.search);

    const token = params.get('token');

    console.log(token)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/verify-email`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(response=>{
          localStorage.setItem('user',JSON.stringify(token))
          dispatch({type:'LOGIN',payload:{token:token}})
            toast.success("Email Verified Successfully")
           setTimeout(()=>{
            navigate('/dashboard')
           },1000)
        }).catch(error=>{
            navigate('/register')
            console.log(error.response)
    
           
        })

    },[token])

  return (
    <div>
      
    </div>
  )
}

export default VerifyEmail
