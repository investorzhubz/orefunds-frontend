import React from 'react'
import './footer.css'
import FooterLogo from '../../resources/images/pnc-logo-rev.svg'
import { Link } from 'react-router-dom'
import logo from '../../resources/images/logo.png'
function Footer() {
  return (
    <div className='footer'>
      <div  className='footer-widget'>
      <div className="pnc-bank-section">
            <img src={logo} alt="footer logo" />
            <p>Managing your finances is a lifelong journey with many milestones and obstacles along the way. Whether you're just starting out, in your prime working years, or preparing for retirement, having a sound financial plan is crucial for achieving your goals and qualifying for the banking products you need.</p>
        </div>
        <div className="usefulLinks">
        <h3>Useful Links</h3>
            <ul>
            <li>
            <Link to='/about-us' style={{color:'white',cursor:'pointer',textDecoration:"none"}}>About Us</Link></li>
            <li><Link to='/contact' style={{color:'white',cursor:'pointer',textDecoration:"none"}}>Contact Us</Link></li>
            <li><Link to='/testimonials' style={{color:'white',cursor:'pointer',textDecoration:"none"}}>Testimonials</Link></li>
            <li><Link to='/privacy-policy' style={{color:'white',cursor:'pointer',textDecoration:"none"}}>Privacy Policy</Link></li>
            </ul>
            
        
    </div>

    <div className="contactInfo">
        <h3>Contact</h3>
        <ul>
        <li>support@capitaledgesaving.com</li>
        {/* <li>6 Wayside Rd Suite G-1, Burlington,
MA 01803, United States</li> */}
        </ul>

    </div>
      </div>
    <div className="copyright">
        <p>Copyright 2023 by <span style={{color:'#85BB65'}}>{process.env.REACT_APP_APP_NAME}</span>. All Right Reserved.</p>
    </div>
    </div>
    

  )
}

export default Footer