import React, { useEffect, useState } from 'react'
import { FaAlignLeft, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Sidebar from './Sidebar';
import axios from 'axios';
import { toast } from 'wc-toast';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { Link } from 'react-router-dom';
function ExchangeMoney() {
  const {user,dispatch}=useAuthContext();
  const [dashUser,setdashUser]=useState(false)
    const [formData, setFormData] = useState({
       exchangeFrom: '',
        exchangeTo: '',
        exchangeAmount: '',
        amount: '',
        note: '',
      });
      const [sidemenu,setSideMenu]=useState(false)
      const [shouldMenuSlide,setShouldMenuSlide]=useState(false)
      const [btnState,setBtnState]=useState("Exchange Money")
      const [currencies,setCurrencies]=useState(null)
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setBtnState("Processing...")
        console.log(formData);
        // Handle form submission logic
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/exchange-money`,formData,{
          headers:{
              Authorization:`Bearer ${user.token}`
          }
      }).then(response=>{
          setBtnState("Exchange Money")
          toast.success("Transaction Successfull")
          setFormData({
            exchangeFrom: '',
            exchangeTo: '',
            exchangeAmount: '',
            amount: '',
            note: '',
          })
      }).catch(error=>{
          toast.error(error.response.data.error)
          setBtnState("Exchange Money")
          console.log(error.response)
  
         
      })
      };


useEffect(() => {
    const savedCurrencies = JSON.parse(localStorage.getItem('currencies'));

    if (!savedCurrencies || !savedCurrencies.EUR || !savedCurrencies.USD || !savedCurrencies.GBP) {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/currencies`)
            .then(response => {
                const { EUR, USD, GBP } = response.data;

                // Save only EUR, USD, and GBP in localStorage
                const selectedCurrencies = { EUR, USD, GBP };
                localStorage.setItem('currencies', JSON.stringify(selectedCurrencies));

                // Also set them in your state
                setCurrencies(selectedCurrencies);
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        // If currencies are found in localStorage, set them in state
        setCurrencies(savedCurrencies);
    }
}, []);


useEffect(()=>{
  const exTo=formData.exchangeTo
  const exFrom=formData.exchangeFrom
 

  if(formData.exchangeFrom&&formData.exchangeTo){
   
      const exchangeOne= formData.amount*currencies[exTo]
      const exchangeTwo=(exchangeOne/currencies[exFrom]).toFixed(2)
    console.log(exchangeTwo)
    setFormData({
      ...formData,
      exchangeAmount:exchangeTwo
    })
    
  }
console.log(formData.exchangeFrom,formData.exchangeTo)

},[formData.amount,formData.exchangeTo])


const logout=()=>{
  dispatch({type:'LOGOUT',payload:null})
}

  return (
    <div>
        <div className='dashboard'>
         <div className="dashboard-header">
            <div className="rights-side">
                <Link to='/' style={{textDecoration:'none',color:'white',cursor:'pointer'}}><p>{process.env.REACT_APP_APP_NAME}</p></Link>
                <FaAlignLeft onClick={()=>{
                    setShouldMenuSlide(true)
                    setSideMenu(!sidemenu)
                }} />
            </div>
            <div className="left-side">
                <FaUserAlt onClick={()=>{
                    setdashUser(!dashUser)
                }}/>
             </div>
             {
                    dashUser&&(
                        <div className="user-menu">
                            
                            <Link style={{textDecoration:'none', color:'#6e6e6e',marginTop:".8rem"}} to={'/user-profile'}><p>Profile Overview</p></Link>
                            <Link style={{textDecoration:'none', color:'#6e6e6e',marginTop:".8rem"}} to={'/profile-setting'}> <p>Profile Settings</p></Link>
                            <p className='logout' onClick={()=>{
                                logout()
                            }}><FaSignOutAlt />Logout</p>
                        </div>
                    )
                }
        </div>
        <div className="dashboard-main-section">
            {
                sidemenu&&(
                   <Sidebar shouldMenuSlide={shouldMenuSlide} />
                )
            }
            <div className="send-money-container">
      <form className="send-money-form" onSubmit={handleSubmit}>
        <h2>Exchange Money</h2>

       <div className="send-money-grid">
       <div className="send-money-form-group">
          <label htmlFor="exchangeFrom">Exchange From<span>*</span></label>
          <select 
            id="exchangeFrom" 
            value={formData.exchangeFrom} 
            onChange={handleChange} 
            required
          >

            
            <option value="" disabled>Select One</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <div className="send-money-form-group">
          <label htmlFor="exchangeTo">Exchange To<span>*</span></label>
          <select 
            id="exchangeTo" 
            value={formData.exchangeTo} 
            onChange={handleChange} 
            required
          >

            
            <option value="" disabled>Select One</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
       </div>

       <div className="send-money-grid">
     
        <div className="send-money-form-group">
          <label htmlFor="amount">Amount <span>*</span></label>
          <input 
            type="number" 
            id="amount" 
            placeholder="Enter amount" 
            value={formData.amount} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="send-money-form-group">
          <label htmlFor="currency">Exchanged Amount</label>
          <input 
            type="number" 
            id="exchangeAmount" 
            value={formData.exchangeAmount} 
            onChange={handleChange} 
            readOnly
          />
        </div>
       </div>

        

       

        <div className="send-money-form-group">
          <label htmlFor="note">Note</label>
          <textarea 
            id="note" 
            rows="3" 
            placeholder="Enter a note (optional)" 
            value={formData.note} 
            onChange={handleChange} 
          />
        </div>

        <p className="send-money-transaction-fee">$ exchange fee will apply</p>

        {
          btnState=='Exchange Money'&&(
            <button type="submit" className="send-money-send-btn">{btnState}</button>
          )
        }

        {
          btnState=='Processing...'&&(
            <button type="submit"  disabled className="send-money-send-btn">{btnState}</button>
          )
        }
      </form>
    </div>



        </div>
      
    </div>
    </div>
  )
}

export default ExchangeMoney
