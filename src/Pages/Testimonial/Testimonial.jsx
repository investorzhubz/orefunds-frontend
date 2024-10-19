import React, { useState } from 'react'
import './testimonial.css'
import Navigation from '../../Component/Navigation/Navigation'
import Footer from '../../Component/Footer/Footer'
import { toast,ToastContainer } from 'react-toastify'
function Testimonial() {
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
    <div className='testimonial about'>
      <ToastContainer/>
        <Navigation />
        <div class="about-header">
      <div class="header-container">
        <h1 class="about-title abouth1">Testimonials</h1>
        <h3 class="about-title abouth3" style={{fontWeight:'600'}}>Home/ Testimonials</h3>
      </div>
    </div>

    <div class="customer-testimonials-section">
      <div class="testimonials-introduction">
        <p>
          At {process.env.REACT_APP_APP_NAME}, we're proud to have built a trusted relationship with our
          customers over the years. Their success is our success, and we're
          honored to play a role in helping businesses of all sizes achieve
          their financial goals. Don't just take our word for it - hear directly
          from some of our satisfied customers about the difference Inc Bank has
          made for their company.
        </p>
      </div>

      <div class="customer-testimonials-row">
        <div class="customer-container-testimonial">
          <p class="refunds-text">
            <i class="fa fa-quote-left"></i>
            I was about to give up on getting a refund from my bank, but then I
            found {process.env.REACT_APP_APP_NAME}. Their team was persistent and knowledgeable, and they
            were able to successfully negotiate a refund on my behalf. The money
            I recovered made a real difference for my family.
            <i class="fa fa-quote-right"></i>
          </p>
          <p class="testimonial-name">Sarah L., Freelance Writer</p>
        </div>
        <div class="customer-container-testimonial">
          <p class="refunds-text">
            <i class="fa fa-quote-left"></i>
            My bank's refund policies are notoriously complex and difficult to
            navigate. {process.env.REACT_APP_APP_NAME} cut through the red tape and got me a refund on
            some unfair ATM fees in a matter of weeks. I'm grateful for their
            expertise and advocacy.
            <i class="fa fa-quote-right"></i>
          </p>
          <p class="testimonial-name">Juan D., Restaurant Owner</p>
        </div>
        <div class="customer-container-testimonial">
          <p class="refunds-text">
            <i class="fa fa-quote-left"></i>
            As a non-profit organization, every dollar counts for us. {process.env.REACT_APP_APP_NAME}
            helped us recoup over $1,000 in improper fees, which we were then
            able to reinvest into our programs. Their service is a game-changer
            for small and mid-sized organizations like ours.
            <i class="fa fa-quote-right"></i>
          </p>
          <p class="testimonial-name">Emily G., Non-Profit Director</p>
        </div>
      </div>
      <div class="customer-testimonials-row">
        <div class="customer-container-testimonial">
          <p class="refunds-text">
            <i class="fa fa-quote-left"></i>
            {process.env.REACT_APP_APP_NAME} is a lifesaver for busy professionals like myself. I don't
            have the time or energy to deal with my bank's customer service
            department, but this service handled everything for me. I was able
            to recoup over $300 in just a few weeks."
            <i class="fa fa-quote-right"></i>
          </p>
          <p class="testimonial-name">Maria P., Marketing Consultant</p>
        </div>
        <div class="customer-container-testimonial">
          <p class="refunds-text">
            <i class="fa fa-quote-left"></i>
            As a small business owner, I'm always looking for ways to cut costs
            and maximize my profits. {process.env.REACT_APP_APP_NAME} has helped me do just that by
            securing refunds on overdraft fees and other unfair charges from my
            bank. I highly recommend their services
            <i class="fa fa-quote-right"></i>
          </p>
          <p class="testimonial-name">Tom S., Retail Store Owner</p>
        </div>
        <div class="customer-container-testimonial">
          <p class="refunds-text">
            <i class="fa fa-quote-left"></i>
            "I'm so grateful to {process.env.REACT_APP_APP_NAME} for their persistence and dedication in
            getting me a refund from my bank. They navigated the complex process
            and communicated with me every step of the way. The money I
            recovered made a big difference for my family."
            <i class="fa fa-quote-right"></i>
          </p>
          <p class="testimonial-name">Anita K., Homemaker</p>
        </div>
      </div>
      <div class="customer-testimonials-row">
        <div class="customer-container-testimonial">
          <p class="refunds-text">
            <i class="fa fa-quote-left"></i>
            I've used the bank refunds service from {process.env.REACT_APP_APP_NAME} multiple times now,
            and I'm always impressed by how quick and easy the process is.
            They've helped me recoup hundreds of dollars in unfair fees, and the
            customer service has been outstanding.
            <i class="fa fa-quote-right"></i>
          </p>
          <p class="testimonial-name">Jessica R., Small Business Owner</p>
        </div>
        <div class="customer-container-testimonial">
          <p class="refunds-text">
            <i class="fa fa-quote-left"></i>
            As a busy entrepreneur, I don't have time to deal with the hassle of
            navigating bank policies and procedures to get refunds. {process.env.REACT_APP_APP_NAME} took
            care of everything for me, and I was able to get a full refund on
            some unexpected overdraft fees. Highly recommend their services!"
            <i class="fa fa-quote-right"></i>
          </p>
          <p class="testimonial-name">Michael T., Startup Founder</p>
        </div>
        <div class="customer-container-testimonial">
          <p class="refunds-text">
            <i class="fa fa-quote-left"></i>
            "I'm so grateful to {process.env.REACT_APP_APP_NAME} for their persistence and dedication in
            getting me a refund from my bank. They navigated the complex process
            and communicated with me every step of the way. The money I
            recovered made a big difference for my family."
            <i class="fa fa-quote-right"></i>
          </p>
          <p class="testimonial-name">Anita K., Homemaker</p>
        </div>
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
          />
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

export default Testimonial