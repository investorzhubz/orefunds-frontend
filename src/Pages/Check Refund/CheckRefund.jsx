import React,{useState}from 'react'
import './checkrefund.css'
import Navigation from '../../Component/Navigation/Navigation'
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'
import { useAuthContext } from '../../Hooks/useAuthContext'
import Loader from '../../Component/Loader/Loader'
import Footer from '../../Component/Footer/Footer'

function CheckRefund() {
    const [refundNumber,setRefundNumber]=useState('')
    const [btn,setBtnState]=useState('Check Results')
    const [refundData,setRefundData]=useState(null)
    const [startLoading,setStartLoading]=useState(false)
    const {user} =useAuthContext()

    const handleSubmit=(e)=>{
         
        e.preventDefault()
        setStartLoading(true)
        setTimeout(()=>{
            if(!refundNumber){
                toast.error("Enter A refund Number")
                setStartLoading(false)
            }else{
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/refund/get-refund/${refundNumber}`).then(response=>{
                    setRefundData(response.data)
                    setStartLoading(false)
        
                }).catch(error=>{
                    setStartLoading(false)
                    toast.error(error.response.data.error)
                })
                
            }

        },2000)  

    }
  return (
    <div className='check-refunds'>
        <ToastContainer />
         <div className="navbar">
            <Navigation />
        </div>

        <div className="check-refund-hero">
            <h2>Check Refunds</h2>
            <span>Home / Check Refunds</span>
        </div>


        <div className="refundcheckform">
            <input type='text' placeholder='Enter Refund Number' onChange={(e)=>{
                setRefundNumber(e.target.value)
            }}/>

            <button onClick={(e)=>{
                handleSubmit(e)
            }}>{btn}</button>

</div>
            {
                refundData&&(
            <div className="view-refund">
                <h2>Your Refund Information</h2>
               <div>
               <label>Name</label>
                <input type="text" readOnly value={refundData.name} />
               </div>
                <div>
                <label>Address</label>
                <input type="text" readOnly value={refundData.address} />
                </div>
               <div>
               <label>Phone Number</label>
                <input type="text" readOnly value={refundData.phoneNumber} />
               </div>
                <div>
                <label>Account Number</label>
                <input type="text" readOnly value={refundData.accountNumber} />
                </div>
                 <div> <label>Bank Name</label>
                <input type="text" readOnly value={refundData.bankName} /></div>
                  <div ><label>Total Refund($)</label>
                <input type="text" readOnly value={refundData.totalRefund} /></div>

                </div>
               
                )
                   
                
            }
           
       <Footer />
       {
                startLoading&&(
                    
                 <div className="loader">
                 <Loader />
             </div>
                )
            }
    </div>
  )
}

export default CheckRefund