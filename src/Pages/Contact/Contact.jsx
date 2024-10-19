import React, { useState } from 'react'
import './contact.css'
import Navigation from '../../Component/Navigation/Navigation'
import Footer from '../../Component/Footer/Footer'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

import { useAuthContext } from '../../Hooks/useAuthContext'

function Contact() {
  const [NLEmail,setNLEmail]=useState(null)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [phoneNumber,setPhoneNumber]=useState('')
  const [subject,setSubject]=useState('')
  const {user} =useAuthContext()
  const [message,setMessage]=useState('')
  const [buttonState,setButtonState]=useState('Submit')

  const handleNLSubmit=(e)=>{
    e.preventDefault()
    if(!NLEmail){
      toast.error("Enter an Email")
    }else{
      toast.success("News Letter Signup Successful")
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    setButtonState("Processing...")
    const data={
        name:name,
        email:email,
        phoneNumber:phoneNumber,
        subject:subject,
        message:message
    }

    console.log(data)

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/send-email`,data,{
        headers:{
            Authorization:`Bearer ${user.token}`,
            "Content-Type":'application/json'
        }
    }).then(response=>{
       
        toast.success("Message Submitted Successfully")
        
        setName('')
        setEmail('')
        setPhoneNumber('')
        setSubject('')
        setMessage('')
        setButtonState("Submit")

    }).catch(error=>{
        
        toast.error(error.response.data.error)
        setButtonState("Submit")

    })
}
  return (
    <div className='contact about'>
      <ToastContainer/>
        <Navigation />
 <div class="about-header">
      <div class="header-container">
        <h1 class="about-title abouth1">Contact Us</h1>
        <h3 class="about-title abouth3">Home/ Contact Us</h3>
      </div>
    </div>

    <div class="section-contact">
      <div class="section-contact-header">
        <h3>Contact Us</h3>
        <h2>Contact Details</h2>
      </div>
      <div class="contact-details-container">
        <div class="contact-details-tabs">
          <div class="contact-details-tabs-icon">
            <ion-icon name="location-outline"></ion-icon>
          </div>
          <div class="contact-details-tabs-text">
            <p>
              Our Location
              <span>
              6 Wayside Rd Suite G-1,
                <br />
                Burlington, MA 01803, United States
              </span>
            </p>
          </div>
        </div>
        <div class="contact-details-tabs">
          <div class="contact-details-tabs-icon">
            <ion-icon name="mail-outline"></ion-icon>
          </div>
          <div class="contact-details-tabs-text">
            <p>
              Email Address
              <span>
              support@pncrefunds.com
              </span>
            </p>
          </div>
        </div>
        {/* <div class="contact-details-tabs">
          <div class="contact-details-tabs-icon">
            <ion-icon name="call-outline"></ion-icon>
          </div>
          <div class="contact-details-tabs-text">
            <p>
              Phone Number
              <span>
                Emergency Cases<br />
                774-362-1928
              </span>
            </p>
          </div>
        </div> */}
      </div>
    </div>

    <div class="section-contact-form">
      <div class="section-contact-header">
        <h3>Contact Us</h3>
        <h2>Contact Details</h2>
      </div>
      <div className="contact-form">
        <form>
          <input type="name" id="name" name="name" placeholder="Your name" onChange={(e)=>{
            setName(e.target.value)
          }}/>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            onChange={(e)=>{
              setEmail(e.target.value)
            }}/>

          <input type="phone" id="phone" name="phone" placeholder="Phone"  onChange={(e)=>{
            setPhoneNumber(e.target.value)
          }}/>
          <input
            type="subject"
            id="subject"
            name="subject"
            placeholder="Subject"
            onChange={(e)=>{
              setSubject(e.target.value)
            }}
          />

          <input type="text" id="text" name="text" placeholder="Type message"  onChange={(e)=>{
            setMessage(e.target.value)
          }}/>
          <button className='contact-form-btn' onClick={(e)=>{
            handleSubmit(e)
          }}>{buttonState}</button>
        </form>
      </div>
    </div>
    <div className="newsletter about">
    <div class="section-about-newsletter">
      <div class="about-newsletter header-container">
        <h2>Subscribe to Receive Latest Updates</h2>
      </div>
      <div class="about-newsletter form-container">
        <form>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
          onChange={(e)=>{
            setNLEmail(e.target.value)
          }}/>
          <input onClick={(e)=>{
            handleNLSubmit(e)
          }} type="submit" id="submit" />
        </form>
      </div>
    </div>
    </div>
    <Footer />
    </div>
  )
}

export default Contact