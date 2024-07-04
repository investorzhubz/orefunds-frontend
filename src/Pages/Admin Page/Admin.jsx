import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './admin.css'
import { useAuthContext } from '../../Hooks/useAuthContext'
import {ToastContainer,toast} from 'react-toastify'
import { Link } from 'react-router-dom'


function Admin() {
    const {user} =useAuthContext()
    const [allRefund,setAllRefunds]=useState(true)
    const [allRefundData,setAllRefundsData]=useState(null)
    const [accountNumber,setAccountNumber]=useState('')
    const [bankName,setBankName]=useState('')
    const [ createRefund,setCreateRefund]=useState(false)
    const [buttonState,setButtonState]=useState('Create Refund')

    const [name,setName]=useState('')
    const [refundNumber,setRefundNumber]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [address,setAddress]=useState('')
    const [totalRefund,setTotalRefund]=useState(null)
    const [refundDate,setRefundDate]=useState(null)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/refund/get-refund`,{
            headers:{
                Authorization:`Bearer ${user.token}`,
                "Content-Type":'applicayion/json'
            }
        }).then(response=>{
            setAllRefundsData(response.data)
            console.log(response.data)

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

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/refund/create-refund`,data,{
            headers:{
                Authorization:`Bearer ${user.token}`,
                "Content-Type":'application/json'
            }
        }).then(response=>{
           
            toast.success("Refund Created Successfully")
            setAccountNumber('')
            setBankName('')
            setName('')
            setRefundNumber('')
            setPhoneNumber('')
            setAddress('')
            setTotalRefund('')
            setRefundDate('')
            setButtonState("Create Refund")

        }).catch(error=>{
            
            toast.error(error.response.data.error)
            setButtonState("Create Refund")

        })
    }

  return (
    <div classname='admin'>
        <ToastContainer />

        <div className='admin-tabs'>
        <p className={allRefund?'active-tab':''} onClick={()=>{
            setCreateRefund(false)
            setAllRefunds(true)
        }}>All refunds</p>
         <p className={createRefund?'active-tab':''} onClick={()=>{
            setAllRefunds(false)
            setCreateRefund(true)
            
        }}>Create Refund</p>
        </div>


        {
            createRefund&&(
                <div className="refund-form">
                    <h2>Fill in the Client's Details</h2>
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
               
            )

        }

        {
           allRefund&&
           (
            allRefundData?(
             <div className="all-refund">
                {
                    allRefundData.map((data,index)=>(
                        <Link to={`/edit-refund/${data.refundNumber}`} style={{textDecoration:'none',color:'black'}}>
                        <div className="refund-data" key={index}>
                            <p>{data.refundNumber}</p>
                            <p>{Date(data.createdAt.toString()).split('GMT+0100 (West Africa Standard Time)')}</p>
                        </div>
                        </Link>
                        
                    ))
                }
             </div>
           ):(
            <p>Fetching Data...</p>
           )
        )
        }


    </div>
  )
}

export default Admin