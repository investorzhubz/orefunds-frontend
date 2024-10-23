import React from 'react'
import './onlineservice.css'
import { FaMobileAlt, FaPiggyBank, FaShieldAlt, FaHome, FaUniversity, FaCreditCard, FaLock } from 'react-icons/fa';

function OnlineService() {
  return (
    <div className="online container">
      <div className="card">
        <FaPiggyBank className="icon" />
        <h3>Digital Banking</h3>
        <ul>
          <li>Bank & savings accounts</li>
          <li>Credit cards</li>
          <li>Personal loans</li>
        </ul>
      </div>
      <div className="card">
        <FaMobileAlt className="icon" />
        <h3>Mobile & Web Banking</h3>
        <ul>
          <li>Instant Access</li>
          <li>Savings Fixed Term</li>
          <li>Savings Instant</li>
        </ul>
      </div>
      <div className="card">
        <FaShieldAlt className="icon" />
        <h3>Insurance Policies</h3>
        <ul>
          <li>Pet insurance</li>
          <li>Transport Insurance</li>
          <li>Accident insurance</li>
        </ul>
      </div>
      <div className="card">
        <FaHome className="icon" />
        <h3>Home & Property Loan</h3>
        <ul>
          <li>Residential Mortgages</li>
          <li>Buy-to-let Mortgages</li>
          <li>Building Mortgages</li>
        </ul>
      </div>
      <div className="card">
        <FaUniversity className="icon" />
        <h3>All Bank Account</h3>
        <ul>
          <li>Instant Access Savings</li>
          <li>Instant Access Cash</li>
          <li>Young Savers Account</li>
        </ul>
      </div>
      <div className="card">
        <FaCreditCard className="icon" />
        <h3>Borrowing Accounts</h3>
        <ul>
          <li>Bank Credit Card</li>
          <li>Setter personal loan</li>
          <li>Overdraft</li>
        </ul>
      </div>
      <div className="card">
        <FaLock className="icon" />
        <h3>Private Banking</h3>
        <ul>
          <li>Dedicated personal service</li>
          <li>Specialist teams</li>
          <li>Tailored Products</li>
        </ul>
      </div>
      <div className="card">
        <FaPiggyBank className="icon" />
        <h3>Fixed Term Accounts</h3>
        <ul>
          <li>Fixed Term Saving</li>
          <li>Fixed Rate Cash</li>
          <li>Resume Your Current</li>
        </ul>
      </div>
    </div>
  )
}

export default OnlineService