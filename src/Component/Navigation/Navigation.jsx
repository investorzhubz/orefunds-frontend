import React, { useState } from 'react'
import './navigation.css'
import logo from '../../resources/images/pnc-logo-rev.svg'
import { FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {toggleMenu,setToggleMenu}=useState(false)
  return (
    <div className='navbar'>
        <div className='logo'>
        <div>
        <Link to='/' style={{textDecoration:'none',color:'white',cursor:'pointer'}}>
        <img src={logo} alt="logo" />
        </Link>
       
        </div>
          <div className="mobile-menu ">
          
            {
              !isMenuOpen&&(
                <FaBars size={30} color='#ffff' onClick={()=>{
                  setIsMenuOpen(true)
                }}/>
              )
            }
      
          </div>
        </div>

        {isMenuOpen&&(
           <div className='mob-menu'>
            
             <div className="topCanvas">
             <Link to='/' style={{textDecoration:'none',color:'white',cursor:'pointer'}}><img src={logo} alt="logo" /></Link>
             {
              isMenuOpen&&(
                <FaTimes size={30} color='#fff' onClick={()=>{
                  setIsMenuOpen(false)
                }} style={{display:'flex',justifyContent:'end'}}/>
              )
              
            }
            
             </div>
           <div className="mob-menu-items">
           <Link to='/' style={{textDecoration:'none',color:'black'}}><p>Home</p></Link>
           <Link to='/about-us' style={{textDecoration:'none',color:'black'}}><p>About</p></Link>
           <Link to='/check-refund' style={{textDecoration:'none',color:'black'}}><p>Check Refund</p></Link>
           <Link to='/testimonials' style={{textDecoration:'none',color:'black'}}><p>Testimonials</p></Link>
           <Link to='/privacy-policy' style={{textDecoration:'none',color:'black'}}><p>Privacy Policy</p></Link>
           <Link to='/contact' style={{textDecoration:'none',color:'black'}}><p>Contact</p></Link>
           
           </div>

           </div>
        )

        }
        <div className="menu-bar">
            <div className="upper-menu">
              <div className="upper-menu-left-side">
              <Link to='/testimonials' style={{textDecoration:'none',color:'white'}}><p>Reviews</p></Link>
           <Link to='/privacy-policy' style={{textDecoration:'none',color:'white'}}><p>Policy</p></Link>
              </div>
              <div className="upper-menu-right-side">
                     <span>
                      <FaEnvelope color='#85BB65'/>
                      <p>support@vipsrefunds.com</p>
                     </span>
              </div>
            </div>
            <div className="lowermenu">
            <Link to='/' style={{textDecoration:'none',color:'black'}}><p>Home</p></Link>
           <Link to='/about-us' style={{textDecoration:'none',color:'black'}}><p>About</p></Link>
           <Link to='/check-refund' style={{textDecoration:'none',color:'black'}}><p>Check Refund</p></Link>
           <Link to='/testimonials' style={{textDecoration:'none',color:'black'}}><p>Testimonials</p></Link>
           <Link to='/privacy-policy' style={{textDecoration:'none',color:'black'}}><p>Privacy Policy</p></Link>
           <Link to='/contact' style={{textDecoration:'none',color:'black'}}><p>Contact</p></Link>

            </div>
        </div>


    </div>
  )
}

export default Navigation