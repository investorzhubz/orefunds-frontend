import React, { useEffect, useState } from 'react';
import defaultProfile from '../../resources/images/default.png';
import { FaTachometerAlt, FaPaperPlane, FaExchangeAlt, FaDollarSign, FaMinusCircle, FaPlusCircle, FaTicketAlt, FaReceipt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../Hooks/useAuthContext';

function Sidebar({ shouldMenuSlide }) {
  const [dropdownStates, setDropdownStates] = useState({
    paymentRequest: false,
    deposit: false,
    loan: false,
    fixedDeposit: false,
    dps: false
  });
  const [data, setData] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/get-user`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [user.token]);

  const toggleDropdown = (dropdown) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  return (
    <div className={shouldMenuSlide ? 'dashboard-menu slide-in-left' : 'dashboard-menu'}>
      <div className="sidebar">
        <div className="sidebar-header">
          {data && data.profile === 'null' ? (
            <img src={defaultProfile} alt="profile" className="profile-image" />
          ) : (
            <img
              src={`${process.env.REACT_APP_IMG_BACKEND_URL}images/${data?.profile}`}
              alt="profile"
              className="profile-image"
            />
          )}

          <h3 className="profile-name">
            {data?.firstname} {data?.lastname}
          </h3>
        </div>

        <nav className="sidebar-navigation">
          <ul>
            <Link style={{ textDecoration: 'none', color: '#6e6e6e' }} to={'/dashboard'}>
              <li>
                <FaTachometerAlt /> <p>Dashboard</p>
              </li>
            </Link>
            <Link style={{ textDecoration: 'none', color: '#6e6e6e' }} to={'/transfer/send_money/'}>
              <li>
                <FaPaperPlane /> <p>Send Money</p>
              </li>
            </Link>
            <Link style={{ textDecoration: 'none', color: '#6e6e6e' }} to={'/transfer/exchange_money/'}>
              <li>
                <FaExchangeAlt /> <p>Exchange Money</p>
              </li>
            </Link>

            {/* Payment Request Dropdown */}
            <li className='nav-with-drop'>
              <div className="nav-item" onClick={() => toggleDropdown('paymentRequest')}>
                <FaDollarSign /> <p>Payment Request</p>
                {dropdownStates.paymentRequest ? <FaMinusCircle color='#ccc' /> : <FaPlusCircle color='#ccc' />}
              </div>
              {dropdownStates.paymentRequest && (
                <div className='sidebar-dropdown'>
                  <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: '.8rem' }} to={'/payment_requests/create/'}>
                    <span>New Request</span>
                  </Link>
                  <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: '.8rem' }} to={'/payment_requests/'}>
                    <span>All Request</span>
                  </Link>
                </div>
              )}
            </li>

            {/* Deposit Dropdown */}
            <li className='nav-with-drop'>
              <div className="nav-item" onClick={() => toggleDropdown('deposit')}>
                <FaDollarSign /> <p>Deposit Money</p>
                {dropdownStates.deposit ? <FaMinusCircle color='#ccc' /> : <FaPlusCircle color='#ccc' />}
              </div>
              {dropdownStates.deposit && (
                <div className='sidebar-dropdown'>
                  <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: '.8rem' }} to={'/deposit/automatic_methods/'}>
                    <span>Automatic Deposit</span>
                  </Link>
                  <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: '.8rem' }} to={'/deposit/manual_methods/'}>
                    <span>Manual Deposit</span>
                  </Link>
                  <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: '.8rem' }} to={'/deposit/redeem_gift_card/'}>
                    <span>Redeem Gift Card</span>
                  </Link>
                </div>
              )}
            </li>

            {/* Loan Dropdown */}
            <li className='nav-with-drop'>
              <div className="nav-item" onClick={() => toggleDropdown('loan')}>
                <FaDollarSign /> <p>Loans</p>
                {dropdownStates.loan ? <FaMinusCircle color='#ccc' /> : <FaPlusCircle color='#ccc' />}
              </div>
              {dropdownStates.loan && (
                <div className='sidebar-dropdown'>
                  <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: '.8rem' }} to={'/loans/apply_loan'}>
                    <span>Apply New Loan</span>
                  </Link>
                  <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: '.8rem' }} to={'/loans/my_loans'}>
                    <span>My Loans</span>
                  </Link>
                </div>
              )}
            </li>

            {/* Fixed Deposit Dropdown */}
            <li className='nav-with-drop'>
              <div className="nav-item" onClick={() => toggleDropdown('fixedDeposit')}>
                <FaDollarSign /> <p>Fixed Deposit</p>
                {dropdownStates.fixedDeposit ? <FaMinusCircle color='#ccc' /> : <FaPlusCircle color='#ccc' />}
              </div>
              {dropdownStates.fixedDeposit && (
                <div className='sidebar-dropdown'>
                  <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: '.8rem' }} to={'/fixed_deposits/apply'}>
                    <span>Apply New FD</span>
                  </Link>
                  <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: '.8rem' }} to={'/fixed_deposits/history'}>
                    <span>FD History</span>
                  </Link>
                </div>
              )}
            </li>

            {/* DPS Dropdown */}
            <li className='nav-with-drop'>
              <div className="nav-item" onClick={() => toggleDropdown('dps')}>
                <FaDollarSign /> <p>DPS Scheme</p>
                {dropdownStates.dps ? <FaMinusCircle color='#ccc' /> : <FaPlusCircle color='#ccc' />}
              </div>
              {dropdownStates.dps && (
                <div className='sidebar-dropdown'>
                  <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: '.8rem' }} to={'/dps_schemes/plans'}>
                    <span>DPS Plans</span>
                  </Link>
                  <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: '.8rem' }} to={'/dps_schemes'}>
                    <span>My DPS</span>
                  </Link>
                </div>
              )}
            </li>

            <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: '.8rem' }} to={'/tickets/create_ticket/'}>
              <li>
                <FaTicketAlt /> <p>Support Tickets</p>
              </li>
            </Link>

            <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: '.8rem' }} to={'/transactions/history'}>
              <li>
                <FaReceipt /> <p>Transactions Report</p>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
