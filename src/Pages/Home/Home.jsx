import React, { useEffect, useState } from 'react'
import './home.css'
import Navigation from '../../Component/Navigation/Navigation'
import banner1 from '../../resources/images/banner-1.jpg'
import banner2 from '../../resources/images/banner-2.jpg'
import banner3 from '../../resources/images/banner-3.jpg'
import loanImg from '../../resources/images/calculator-1.jpg'
import { FaShieldAlt, FaRegClock, FaChartLine, FaClock } from 'react-icons/fa';
import OnlineService from '../../Component/Online Service/OnlineService'
import aboutUS from '../../resources/images/about-1 (1).jpg'
import Footer from '../../Component/Footer/Footer'
import { Link } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
function Home() {
    const [heroView,setHeroView]=useState(banner1)
    const [NLEmail,setNLEmail]=useState(null)

  const handleNLSubmit=(e)=>{
    e.preventDefault()
    if(!NLEmail){
      toast.error("Enter an Email")
    }else{
      toast.success("News Letter Signup Successful")
    }
    
  }
        // State for storing input values and calculated result
        const [loanAmount, setLoanAmount] = useState('');
        const [loanTerm, setLoanTerm] = useState('');
        const [interestRate, setInterestRate] = useState('');
        const [monthlyPayment, setMonthlyPayment] = useState('');
      
        // Function to handle input changes
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          if (name === 'loanAmount') setLoanAmount(value);
          else if (name === 'loanTerm') setLoanTerm(value);
          else if (name === 'interestRate') setInterestRate(value);
        };
      
        // Function to calculate the monthly payment
        const calculateMonthlyPayment = () => {
          const amount = parseFloat(loanAmount);
          const term = parseInt(loanTerm);
          const rate = parseFloat(interestRate) / 100 / 12;
          const monthlyPayment = (amount * rate) / (1 - Math.pow(1 + rate, -term));
          setMonthlyPayment(monthlyPayment.toFixed(2));
        };
      
        // Function to handle form submission
        const handleSubmit = (e) => {
          e.preventDefault();
          calculateMonthlyPayment();
        };
      
        // Function to reset the form
        const handleReset = () => {
          setLoanAmount('');
          setLoanTerm('');
          setInterestRate('');
          setMonthlyPayment('');
        };
    // const bannerArray=[banner1,banner2,banner3]
    // useEffect(()=>{
    //     setInterval(()=>{
    //       setHeroView(bannerArray[])  
    //     },5000)

    // },[])



const blockArray=[
    {
        icon:<FaShieldAlt size={40} />,
        title:'Secure International Transactions',
        text:'"Encryption, authentication, and compliance ensure secure international transactions for global financial stability.'
    },
    {
        icon:<FaRegClock size={40}/>,
        title:'24/7 Support from the Expert Team',
        text:'Our expert team provides 24/7 support for seamless assistance and guidance in all transactions.'
    },
    {
        icon:<FaChartLine size={40}/>,
        title:'Lowest Processing Fees Than Other Banks',
        text:'Our bank offers the lowest processing fees compared to other banks, ensuring cost-effective transactions.'

    }, 
    {
        icon:<FaClock size={40}/>,
        title:'Fast Refunds',
        text:'Experience fast refunds with our efficient processing to ensure quick and hassle-free reimbursements.'

    },

]
  return (
    <div className='home-page'>
      <ToastContainer/>
        <div className="navbar">
            <Navigation />
        </div>

      <div classname='home'>
        <div className="hero-section" style={{backgroundImage: `url(${heroView})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}}>

            <h2>Open Our <span style={{color:'#85BB65'}}>Current</span> <br />
            Account Online</h2>
            <p>Unlock Your Financial Potential with Us – Your Trusted Banking Partner</p>

            <Link to='/contact' style={{cursor:'pointer',textDecoration:"none"}}><button>Make an Appointment</button></Link>

        </div>

        <div className="block-section">
            {
                blockArray.map((block,index)=>(
                    <div className='single-block'>
                        <div className="block-icon">
                            {block.icon}
                        </div>
                        <h4>{block.title}</h4>
                        <p>{block.text}</p>

                    </div>
                ))
            }
        </div>


        <div className="about-section">
        <div class="section-about-content">
      <div class="about-container img-container">
        <img src={aboutUS} />
      </div>
      <div class="about-container">
        <h3>About Us</h3>
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

          <div class="about-us-features-button">
          <Link to='/about-us' style={{cursor:'pointer',textDecoration:"none"}}><p>Discover More</p></Link>
          </div>
        </div>
      </div>
    </div>

        </div>

        <div className="online-service-section">
            <p>OUR SERVICES</p>
            <h1>Online Banking at Your <br />Fingertips</h1>
            <OnlineService />
        </div>

        <div className="loan-calculator">
      <div className="form-section">
        <p>Calculate Loan</p>
        <h3>Online EMI Calculator</h3>
        <div className="calculator">
          <input
            type="number"
            name="loanAmount"
            placeholder="Loan Amount"
            value={loanAmount}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="loanTerm"
            placeholder="Number of months"
            value={loanTerm}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="interestRate"
            placeholder="Interest Rate"
            value={interestRate}
            onChange={handleInputChange}
          />

          <div className="calculator-buttons">
            <button type="submit" onClick={handleSubmit}>
              Calculate
            </button>
            <button type="button" onClick={handleReset}>
              Reset Data
            </button>
          </div>
          <input type="number" readOnly value={monthlyPayment} />
        </div>
      </div>

      <div className="loan-img">
        <img src={loanImg} alt="" />
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
            }}
          />
          <input onClick={(e)=>{
            handleNLSubmit(e)
          }} type="submit" id="submit" />
        </form>
      </div>
    </div>
    </div>

      </div>

 <Footer />
        
    </div>
  )
}

export default Home