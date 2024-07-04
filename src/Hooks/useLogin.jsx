import { useAuthContext } from "./useAuthContext";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
const useLogin=()=>{
    const [error,setError]=useState(false)
    const [loading,setLoading]=useState(false)
    const {dispatch}=useAuthContext()
    const navigate=useNavigate()

    const login=async (username,password)=>{
        console.log(username,password)
        setLoading(true)
        setError(false)
     
         const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/login-admin`,{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({username,password})
         })
         const json=await response.json()
         
         if(!response.ok){
           

            setLoading(false)
            setError(json.error)
         }
         if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type:'LOGIN',payload:json})
            navigate('/admin')

         }



    }
    return {loading,error,login}


}
export {useLogin}