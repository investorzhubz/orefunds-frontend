import React, { useEffect, useState } from 'react'
import './registeruser.css'
import registerHero from '../../resources/images/register.jpg'
import { FaUser } from 'react-icons/fa'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import Navigation from '../../Component/Navigation/Navigation'



// {process.env.REACT_APP_APP_NAME}

function RegisterUser() {

    const [onlineRegistration,setOnlineRegistration]=useState(true)
    const [strengthMessage, setStrengthMessage] = useState('');
    const [passwordMatch,setPasswordMatch]=useState('')
    const [emailSent, setEmailSent] = useState(false);
    const [terms,setTerms]=useState(false)
    const navigate=useNavigate()
    const [register,setRegister]=useState(false)
    const [completed,setCompleted]=useState()
    const [currencies,setCurrencies]=useState(null)
    const {user,dispatch}=useAuthContext()
    const [formData,setFormData]=useState({
        firstname:'',
        lastname:'',
        country:'',
        state:'',
        city:'',
        zipcode:'',
        dob:'',
        address:'',
        phoneNumber:'',
        email:'',
        occupation:'',
        pin:'',
        password:'',
        incomeRange: '',
        confirmPassword:''

    })

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/check-emailverified`,{
            headers:{
                Authorization:`Bearer ${user?.token}`
            }
        }).then(response=>{
            if(!response.data.verifyEmail){
            setOnlineRegistration(false)
            setRegister(false)
            setCompleted(true)
                
            }else{
              navigate('/dashboard')
            }
        }).catch(error=>{
            console.log(error.response.data)
    
           
        })

    },[])

    const handleResendVerfificationEmail = () => {
        // Simulate email resend action

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/resend-eamil-verification`,{
            headers:{
                Authorization:`Bearer ${user?.token}`
            }
        }).then(response=>{
            setEmailSent(true);
            toast.success('Verification Email Sent')
        }).catch(error=>{
            console.log(error.response)
    
           
        })
       
        setTimeout(() => {
          setEmailSent(false); // Reset after showing confirmation
        }, 3000); // 3 seconds delay to reset message
      };
    
        // Handles form input changes
  const handleChange = (e) => {

    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData)
  };

  useEffect(()=>{
    if(formData.password!=''){
        checkPasswordStrength(formData.password);
    }else{
        setStrengthMessage("not yet")
    }

  },[formData.password])

  useEffect(()=>{
    if(formData.confirmPassword!=''){
       if(formData.confirmPassword===formData.password){
        setPasswordMatch("Match")
       }else{
        setPasswordMatch('Faulty')
       }
    }else{
        setPasswordMatch('not yet')
    }

  },[formData.confirmPassword,formData.password])

  const checkPasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasLowerCase = /[a-z]/.test(formData.password);
    const hasNumbers = /\d/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    const hasMinLength = password.length >= 8;

    let strength = '';

    if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && hasMinLength) {
      strength = 'Strong';
    } else if (hasUpperCase && hasLowerCase && hasNumbers ) {
      strength = 'Moderate';
    } else {
      strength = 'Weak';
    }
    setStrengthMessage(strength);
}

  const handleSubmit=(e)=>{
    console.log("Submit")
    e.preventDefault()

    console.log(formData)
  if(passwordMatch=='Match'){
    
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/create-user`,formData).then(response=>{
        toast.success("Account Created Successfully")
        localStorage.setItem('user',JSON.stringify(response.data))
          dispatch({type:'LOGIN',payload:response.data})
        setRegister(false)
        setCompleted(true)
    }).catch(error=>{
        console.log(error.response)

        toast.error(error.response.data.error)
    })
  }


  }



    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/currencies`).then(response=>{
            setCurrencies(response.data)
        }).catch(error=>{
            console.log(error)
        })
        
    },[])



    const employmentTypes = [
        "Self Employed", 
        "Public/Government Office", 
        "Private/Partnership Office", 
        "Business/Sales", 
        "Internship", 
        "Trading/Market", 
        "Self-employed", 
        "Military/Paramilitary", 
        "Politician/Celebrity", 
      ];

      const incomeRanges = [
        "$100.00 - $500.00",
        "$700.00 - $1,000.00",
        "$1,000.00 - $2,000.00",
        "$2,000.00 - $5,000.00",
        "$5,000.00 - $10,000.00",
        "$15,000.00 - $20,000.00",
        "$25,000.00 - $30,000.00",
        "$30,000.00 - $70,000.00",
        "$80,000.00 - $140,000.00",
        "$150,000.00 - $300,000.00",
        "$300,000.00 - $1,000,000.00"
    ]

    const accountTypes = [
        "Checking Account",
        "Saving Account",
        "Fixed Deposit Account",
        "Current Account",
        "Crypto Currency Account",
        "Business Account",
        "Non Resident Account",
        "Cooperate Business Account",
        "Investment Account"
    ]
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", 
        "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", 
        "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
        "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", 
        "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
        "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", 
        "Congo (Democratic Republic of the)", "Costa Rica", "Croatia", "Cuba", "Cyprus", 
        "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", 
        "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", 
        "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", 
        "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", 
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", 
        "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", 
        "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
        "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", 
        "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", 
        "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", 
        "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", 
        "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", 
        "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
        "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
        "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", 
        "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", 
        "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", 
        "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", 
        "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
        "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", 
        "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
      ];
  return (
    <div className='reigister-user'>
      <Navigation />

        <div className="register-hero">
            <div className="register-hero-text">
            <p>EGS Bank Acccount</p>
            <span>Designed with your needs in mind</span>
            </div>
        </div>
      <div className="register-steps">
        <p className={onlineRegistration?'active-step':"not-active"}>Online Registration</p>
        <p className={terms?'active-step':"not-active"}>Terms & Conditions</p>
        <p className={register?'active-step':"not-active"}>Register</p>
        <p className={completed?'active-step':"not-active"}>Completed</p>
      </div>


     <div className="register-data">
     {
        onlineRegistration&&(
           <div className='get-started'>
            <h4>Let's Get Started</h4>
            <p>Get more with Evergreen Stellar Savings Sign up for now.</p>

            <button onClick={()=>{
                setOnlineRegistration(false)
                setTerms(true)
            }}>Get Started Now</button>
           </div>
        )

      }

{
        terms&&(
           <div className='terms-conditions'>
             <p className='notice'>Before you continue, Kindly read and accept our terms and conditions.</p>
            <h4>Terms and Conditions</h4>

             <div className="terms-container">
      <p>
        Before you can start using our online service you must agree to be bound by the conditions below. You must read the conditions before you 
        decide whether to accept them. If you agree to be bound by these conditions, please click the I accept button below. If you click on the
        Decline button, you will not be able to continue your registration for our online services. We strongly recommend that you print a copy of 
        these conditions for your reference.
      </p>

      <h2>1. DEFINITIONS</h2>
      <p>In these conditions the following words have the following meanings:</p>
      <ul>
        <li><strong>ACCOUNT</strong>: Any account which you hold and access via our online service.</li>
        <li><strong>ADDITIONAL SECURITY DETAILS</strong>: The additional information you give us to help us identify you, including the additional security question you provide yourself.</li>
        <li><strong>IDENTITY DETAILS</strong>: The access code we may provide you with.</li>
        <li><strong>Trustfundway ACCOUNT NUMBER, PASSWORD, and ACCOUNT PIN</strong>: You choose to identify yourself when you use our online service.</li>
        <li><strong>YOU, YOUR, and YOURSELF</strong>: Refer to the person who has entered into this agreement with us.</li>
      </ul>

      <h2>2. USING THE ONLINE SERVICE</h2>
      <p>
        a. These conditions apply to your use of our online service and in relation to any accounts. They explain the relationship between you and us in relation to our online service. You should read these conditions carefully to understand how these services work and your and our rights and duties under them. If there is a conflict between these conditions and your account conditions, these conditions will apply. This means that, when you use our online service both sets of conditions will apply unless they contradict each other, in which case, the relevant condition in these conditions apply.
      </p>
      <p>
        b. If any of your accounts is a joint account, these conditions apply to all of you together and any of you separately. If more than one of you uses our online service, you must each choose your own username, password, and additional security details.
      </p>
      <p>
        c. By registering to use our online service, you accept these conditions and agree that we may communicate with you by email or through our website.
      </p>
      <p>
        d. When you use our online service, you must follow the instructions we give you from time to time. You are responsible for ensuring that your computer, software, and other equipment are capable of being used with our online service.
      </p>
      <p>
        e. Our online sites are secure. Disconnection from the Internet or leaving these sites will not automatically log you off. You must always use the log-off facility when you are finished and never leave your machine unattended while you are logged in. As a security measure, if you have not used the sites for more than a specified period of time, we will ask you to log in again.
      </p>

      <h2>3. WHAT RULES APPLY TO SECURITY?</h2>
      <p>
        a. As part of the registration for our online service, you must provide us with identity details before we will allow you to use the services for the first time. You must enter your identity details immediately after signing in so we can identify you.
      </p>
      <p>
        b. Every time you use our online service, you must give us your username, your password, and the answer to an additional security question.
      </p>
      <p>
        c. You can change your username or password online by following the instructions on the screen.
      </p>
      <p>
        d. For administration or security reasons, we can require you to choose a new username or change your password before you use (or carry on using) our online service.
      </p>
      <p>
        e. You must not write down, store (whether encrypted or otherwise) on your computer or let anyone else know your password, identity details, or additional security details, and the fact that they are for use with your accounts.
      </p>
      <p>
        f. If you think that someone else knows your password or any of your additional security details or has used any of them to use our online service, you must do the following:
      </p>
      <ul>
        <li>For your password, change it online as soon as possible. If you have difficulty changing your password, you must phone us on +1 234 567 8910 immediately. You can give us your username if you phone to change your password.</li>
        <li>For your additional security details, you will need to phone us immediately to change your additional security details.</li>
      </ul>
      <p>
        g. We may give the police or any prosecuting authority any information they need if we think it will help them find out if someone else is using your username, password, or any of your additional security details.
      </p>
      <p>
        h. We may also keep any emails sent to or from us. We do this to check what was written and also to help train our staff.
      </p>
    </div>
           



         <div className="terms-button">
         <button onClick={()=>{
                setOnlineRegistration(true)
                setTerms(false)
            }}>Decline</button>


<button onClick={()=>{
                setOnlineRegistration(false)
                setTerms(false)
                setRegister(true)
            }}>Accept</button>
         </div>
           </div>
        )

      }
     </div>

     {
        register&&(
            <div className='register'>
      <div className="register-head">
        <FaUser />
        <p> Kindly provide the information requested below to enable us create an account for you.</p>
      </div>

      <form className='register-form' onSubmit={(e)=>{
        handleSubmit(e)
      }}>
        <div className="personal-info">
          <h4>Personal Details</h4>

          <div className="name">
            <div className='first-name'>
              <label>First Name</label>
              <input
                type="text"
                name="firstname"
                placeholder='First Name'
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className='last-name'>
              <label>Last Name</label>
              <input
                type="text"
                name="lastname"
                placeholder='Last Name'
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="address">
            <div className="country">
              <label>Country</label>
              <select
                name="country"
                className="country-select"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="state">
              <label>State or Region</label>
              <input
                type="text"
                name="state"
                placeholder='State or region'
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="city">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder='City'
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="zipcode">
              <label>Zip Code</label>
              <input
                type="text"
                name="zipcode"
                placeholder='Zipcode/postalcode'
                value={formData.zipcode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="dob">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="house-address">
              <label>House Address</label>
              <input
                type="text"
                name="address"
                placeholder='House Address'
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="phone">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder='Phone Number'
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="email">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder='Email Address'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="employment-info">
          <h4>Employment Information</h4>
          <div className="employment-details">
            <div className="occupation">
              <label>Occupation</label>
              <select
                name="occupation"
                className="type-select"
                value={formData.occupation}
                onChange={handleChange}
                required
              >
                <option value="">Select Employment Type</option>
                {employmentTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="income-range">
              <label>Annual Income Range</label>
              <select
                name="incomeRange"
                className="type-select"
                value={formData.incomeRange}
                onChange={handleChange}
                required
              >
                <option value="">Select Income Range</option>
                {incomeRanges.map((range, index) => (
                  <option key={index} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="banking-info">
          <h4>Banking Details</h4>
          <div className="banking-details">
            <div className="account-type">
              <label>Account Type</label>
              <select
                name="accountType"
                className="type-select"
                value={formData.accountType}
                onChange={handleChange}
                required
              >
                <option value="">Select Account Type</option>
                {accountTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* <div className="currency">
              <label htmlFor="currency">Currency <span>*</span></label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                required
              >
                <option value="Select One" disabled>Select One</option>
                {currencies.map((currency, index) => (
                  <option key={index} value={currency.currency}>{currency.currency}</option>
                ))}
              </select>
            </div> */}

            <div className="2fa">
              <label>2FA PIN</label>
              <input
                type="number"
                name="pin"
                placeholder='PIN'
                value={formData.pin}
                onChange={handleChange}
                required
              />
            </div>

            <div className="password">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                required
              />
               {
                strengthMessage=='Weak'&&(
                    <p style={{color:'red'}}>Password strength: {strengthMessage}</p>
                )
               }
                {
                strengthMessage=='Moderate'&&(
                    <p style={{color:'orange'}}>Password strength: {strengthMessage}</p>
                )
               }
                {
                strengthMessage=='Strong'&&(
                    <p style={{color:'green'}}>Password strength: {strengthMessage}</p>
                )
               }
            </div>

            <div className="confirm-password">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder='Confirm Password'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              {
                passwordMatch=='Faulty'&&(
                 <p style={{color:'red'}}>Passwords do not match</p>
                )
              }
            </div>
          </div>
        </div>

        <div className="registerform-btn">
          <button type="submit">Submit</button>
          <button type="reset" onClick={() => setFormData({
            firstname: '',
            lastname: '',
            country: '',
            state: '',
            city: '',
            zipcode: '',
            dob: '',
            address: '',
            phoneNumber: '',
            email: '',
            occupation: '',
            incomeRange: '',
            accountType: '',
            currency: '',
            pin: '',
            password: '',
            confirmPassword: ''
          })}>Reset</button>
        </div>
      </form>
    </div>
        )
     }


     {
        completed&&(
            <div className="email-verification-panel">
      <h2>Email Verification Required</h2>
      <p>Please verify your email to Continue.</p>
      <button onClick={handleResendVerfificationEmail} className="resend-btn">
        Resend Verification Email
      </button>
      {emailSent && <p className="confirmation-message">Verification email sent!</p>}
    </div>
        )
     }
      
    </div>
  )
}

export default RegisterUser
