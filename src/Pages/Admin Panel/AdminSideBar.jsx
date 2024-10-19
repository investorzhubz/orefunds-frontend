import React, { useState } from 'react'
import defaultProfile from '../../resources/images/default.png'
import { FaAlignLeft, FaUserAlt, FaTachometerAlt, FaPaperPlane, FaExchangeAlt, FaMoneyCheck, FaDollarSign, FaLandmark, FaPiggyBank, FaLifeRing, FaReceipt, FaTicketAlt, FaChevronDown, FaChevronCircleRight, FaChevronRight, FaMinusCircle, FaPlusCircle, FaPlus, FaEnvelope, FaUserFriends, FaIdCard, FaCreditCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AdminSidebar({shouldMenuSlide}) {
    const [paymentDrop,setPaymentDrop]=useState(false)
    const [specific,setSpecific]=useState('')
  return (

       <div className={shouldMenuSlide?"dashboard-menu slide-in-left ":"dashboard-menu "}>

<div className="sidebar">
<div className="sidebar-header">
<img 
src={defaultProfile} 
alt="Profile" 
className="profile-image"
/>

<h3 className="profile-name">{process.env.REACT_APP_SITE_NAME}</h3>
</div>

<nav className="sidebar-navigation">
<ul>
<Link style={{textDecoration:'none', color:'#6e6e6e'}}to={'/admin-panel'}>
<li>
<FaTachometerAlt /> <p>Dashboard</p>
</li>
</Link>
<Link style={{textDecoration:'none', color:'#6e6e6e'}}to={'/admin/users/'}>
<li>
<FaUserFriends /> <p>Users</p>
</li>
</Link>
<Link style={{textDecoration:'none', color:'#6e6e6e',marginTop:".8rem"}} to={'/admin/deposit/'}> 
<li>
<FaPlus /> <p>Deposit request</p>
</li>
</Link>
<Link style={{textDecoration:'none', color:'#6e6e6e',marginTop:".8rem"}} to={'/admin/gift-cards/'}> 
<li>
<FaCreditCard /> <p>Gift Card payments</p>
</li>
</Link>

<Link style={{textDecoration:'none', color:'#6e6e6e',marginTop:".8rem"}} to={'/admin/loan/'}> 
<li>
<FaDollarSign /> <p>Loan Requests</p>
</li>
</Link>

<Link style={{textDecoration:'none', color:'#6e6e6e',marginTop:".8rem"}} to={'/admin/fixed-deposits/'}> 
<li>
<FaDollarSign /> <p>Fixed Deposits</p>
</li>
</Link>

<Link style={{textDecoration:'none', color:'#6e6e6e',marginTop:".8rem"}} to={'/admin/tickets/'}> 
<li>
<FaEnvelope/> <p>Tickets</p>
</li>
</Link>




</ul>
</nav>
</div>

</div>

  )
}

export default AdminSidebar
