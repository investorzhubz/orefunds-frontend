import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './admin.css'
import { useAuthContext } from '../../Hooks/useAuthContext'
import {ToastContainer,toast} from 'react-toastify'
function EditRefund() {
    const {user} =useAuthContext()
    const [allRefund,setAllRefunds]=useState(true)
    const [allRefundData,setAllRefundsData]=useState(null)
    const [accountNumber,setAccountNumber]=useState('')
    const [bankName,setBankName]=useState('')
    const [ createRefund,setCreateRefund]=useState(false)
    const [buttonState,setButtonState]=useState('Edit Refund')
    const {refundNo}=useParams()
    const [name,setName]=useState('')
    const [refundNumber,setRefundNumber]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [address,setAddress]=useState('')
    const [totalRefund,setTotalRefund]=useState(null)
    const [refundDate,setRefundDate]=useState(null)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/refund/get-refund/${refundNo}`,{
            headers:{
                Authorization:`Bearer ${user.token}`,
                "Content-Type":'applicayion/json'
            }
        }).then(response=>{
            setAllRefundsData(response.data)
            console.log(response.data)
            setAccountNumber(response.data.accountNumber)
            setBankName(response.data.bankName)
            setName(response.data.name)
            setRefundNumber(response.data.refundNumber)
            setPhoneNumber(response.data.phoneNumber)
            setAddress(response.data.address)
            setTotalRefund(response.data.totalRefund)
            setRefundDate(response.data.refundDate)

        }).catch(error=>{
            console.log(error)
        })


    },[allRefund])

    const handleSubmit=(e)=>{
        e.preventDefault()
        setButtonState("Processing...")
        const data={
            refundNumber:refundNumber,
            phoneNumber:phoneNumber,
            address:address,
            totalRefund:totalRefund,
            refundDate,refundDate,
            name:name,
            accountNumber:accountNumber,
            bankName:bankName,

        }
        console.log(data)

        axios.put(`${process.env.REACT_APP_BACKEND_URL}/refund/update-refund/${refundNo}`,data,{
            headers:{
                Authorization:`Bearer ${user.token}`,
                "Content-Type":'application/json'
            }
        }).then(response=>{
           
            toast.success("Refund Edited Successfully")
            
            setButtonState("Edit Refund")

        }).catch(error=>{
            
            toast.error(error.response.data.error)
            setButtonState("Edit Refund")

        })
    }

  return (
    <div>
        <div className="refund-form">
            <ToastContainer />
                    <h2>Edit Client's Details</h2>
                      <div className="refundNumber">
                      <input type="text" name='refund' placeholder='Enter Refund Number'  onChange={(e)=>{
                        setRefundNumber(e.target.value)
                    }} value={refundNumber}/>
                      </div>
                    <input type="text" name='name' placeholder='Name' onChange={(e)=>{
                        setName(e.target.value)
                    }} value={name}/>
                     <input type="text" name='address' placeholder='Address' onChange={(e)=>{
                        setAddress(e.target.value)
                    }} value={address}/>
                     <input type="tel" name='phone' placeholder='Phone Number' onChange={(e)=>{
                        setPhoneNumber(e.target.value)
                    }} value={phoneNumber}/>
                    <input type="text" name='bank Name' placeholder='Bank Name' onChange={(e)=>{
                        setBankName(e.target.value)
                    }} value={bankName}/>
                     <input type="text" name='Account Number' placeholder='Account Number' onChange={(e)=>{
                        setAccountNumber(e.target.value)
                    }} value={accountNumber}/>

                  <input type="number" name='total refund' placeholder='Total Refund Amount' onChange={(e)=>{
                        setTotalRefund(e.target.value)
                    }} value={totalRefund}/>
                    <input type="date" name='refund date' placeholder='Refund Date' onChange={(e)=>{
                        setRefundDate(e.target.value)
                    }} value={refundDate}/>

                    <button onClick={(e)=>{
                        handleSubmit(e)
                    }}>{buttonState}</button>

                </div>
    </div>
  )
}

export default EditRefund