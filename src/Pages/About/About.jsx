import React, { useState } from 'react'
import './about.css'
import Navigation from '../../Component/Navigation/Navigation'
import aboutUS from '../../resources/images/about-1 (1).jpg'
import Footer from '../../Component/Footer/Footer'
import { Link } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import aboutImg from '../../resources/images/about-img.png'
import aboutImg1 from '../../resources/images/about-img-3.png'
import aboutImg2 from '../../resources/images/about-img-2.png'
import map from '../../resources/images/world-map.png'
import { FaBell } from 'react-icons/fa'

function About() {
  const [NLEmail,setNLEmail]=useState(null)

  const handleNLSubmit=(e)=>{
    e.preventDefault()
    if(!NLEmail){
      toast.error("Enter an Email")
    }else{
      toast.success("News Letter Signup Successful")
    }
    
  }
  return (
    <div className='about'>
    <ToastContainer/>
        <Navigation/>
         <div class="about-header">
      <div class="header-container">
        <h1 class="about-title abouth1">About Us</h1>
        <h3 class="about-title abouth3">Home/ About Us</h3>
      </div>
    </div>
    <div class="section-about-content">
      <div class="about-container img-container">
        <img src={aboutUS} />
      </div>
      <div class="about-container">
        <span>About Us</span>
        <h2>Financial Guidance for Every Stage of Life.</h2>
        <p>
          Managing your finances is a lifelong journey with many milestones and
          obstacles along the way. Whether you're just starting out, in your
          prime working years, or preparing for retirement, having a sound
          financial plan is crucial for achieving your goals and qualifying for
          the banking products you need.
        </p>
        <div class="about-us-features">
          <div class="about-us-features-container container-1">
            <div class="about-us-features-icon">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
            <div class="about-us-features-content">
              <h2>Solution Focused</h2>
              <p>
                We are very focused on providing the best solution on financial
                Guidance
              </p>
            </div>
          </div>
          <div class="about-us-features-container container-2">
            <div class="about-us-features-icon">
              <ion-icon name="checkmark-done-circle-outline"></ion-icon>
            </div>
            <div class="about-us-features-content">
              <h2>99.99% Success</h2>
              <p>
                We are very focused on providing the best solution on financial
                Guidance
              </p>
            </div>
          </div>


        </div>
      </div>
    </div>
    <div className="notification">
          <div className="noti-first-section">
            {/* <FaBell /> */}
            <span>About Us</span>
            <h3>Your ally in achieving ambition beyond borders</h3>
            <p>We understand that with global ambition, comes global challenges, and we are here to bridge the gap by offering seamless cross-border financial services. Consider us your friendly digital guide to all things finance, helping you make the most of your money.
</p>
            <div className="check">
              <p><span>&#10003;</span>Customer Satisfaction</p>
            </div>
          </div>

          <div className="ambition-second-section">
            <img className='img1'src={aboutImg} alt="" />
            <img className='img2' src={aboutImg1} alt="" />
            <img className='img3' src={aboutImg2} alt="" />
          </div>
          
        </div>
    <div class="section-about-details">
      <div class="section-about-details-tabs">
        <div class="section-about-details-tabs-icon">
          <ion-icon name="people-outline"></ion-icon>
        </div>
        <div class="section-about-details-tabs-text">
          <p>50k+</p>
          <p>Happy Clients</p>
        </div>
      </div>
      <div class="section-about-details-tabs">
        <div class="section-about-details-tabs-icon">
          <ion-icon name="cash-outline"></ion-icon>
        </div>
        <div class="section-about-details-tabs-text">
          <p>90Bn</p>
          <p>Total Transactions</p>
        </div>
      </div>
      <div class="section-about-details-tabs">
        <div class="section-about-details-tabs-icon">
          <ion-icon name="git-branch-outline"></ion-icon>
        </div>
        <div class="section-about-details-tabs-text">
          <p>20k+</p>
          <p>Branches in USA</p>
        </div>
      </div>
    </div>
    <div className="home-account">
          <span>Our core values</span>
          <h3>Our values help us set the bar for good banking high.</h3>
          <p>Our values define us. They guide us in building and improving our product, hiring teammates, and serving our customers.</p>

          <div className="map-img">

      
             
              <div>
                <img src={map} alt="" />
              </div>


          
          </div>

        </div>
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
          />
          <input onClick={(e)=>{
            handleNLSubmit(e)
          }} type="submit" id="submit" />
        </form>
      </div>
    </div>
    <Footer />
    </div>
  )
}

export default About