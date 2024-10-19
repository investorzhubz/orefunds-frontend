import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { FaAlignLeft, FaUserAlt, FaTachometerAlt, FaPaperPlane, FaExchangeAlt, FaMoneyCheck, FaDollarSign, FaLandmark, FaPiggyBank, FaLifeRing, FaReceipt, FaTicketAlt, FaSignOutAlt } from 'react-icons/fa';
import defaultProfile from '../../resources/images/default.png'
import Sidebar from './Sidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../Hooks/useAuthContext';
import Loader from '../../Component/Loader/Loader';

function Dashboard() {
    const [sidemenu,setSideMenu]=useState(false)
    const [shouldMenuSlide,setShouldMenuSlide]=useState(false)
    const [data,setData]=useState(null)
    const [dashUser,setdashUser]=useState(false)
    const hasActiveLoan = true;
    const navigate=useNavigate()
    const {user,dispatch}=useAuthContext()
    const [queryData,setQueryData]=useState({
        activeLoans:null,
        paymentReq:null,
        AFD:null,
        tickets:null
    })

    

    const [loanData,setLoanData]=useState([])


    const logout=()=>{
        dispatch({type:'LOGOUT',payload:null})
        setTimeout(()=>{
            navigate('/login')

        },3000)
    }
    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/loans`,{
            headers:{
                Authorization:`Bearer ${user.token}`
            }  
        }).then(response=>{

           
            setQueryData(((prevData)=>(
                {
                    ...prevData,
                    activeLoans:response.data.length
        
                   }
               )))
        }).catch(error=>{
            console.log(error)
        })
       },[user.token])
       useEffect(()=>{

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-fixed-deposits`,{
            headers:{
                Authorization:`Bearer ${user.token}`
            }  
        }).then(response=>{
            setQueryData(((prevData)=>(
                {
                    ...prevData,
                   AFD:response.data.length
        
                   }
               )))
        }).catch(error=>{
            console.log(error)
        })
       },[user.token])
    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-payment-request`,{
            headers:{
                Authorization:`Bearer ${user.token}`
            }  
        }).then(response=>{
           setQueryData(((prevData)=>(
            {
                ...prevData,
                paymentReq:response.data.length
    
               }
           )))
        }).catch(error=>{
            console.log(error)
        })
       },[user.token])

       useEffect(()=>{

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/isadmin`,{
            headers:{
                Authorization:`Bearer ${user.token}`
            }  
        }).then(response=>{
            console.log(response.data)
           if(response.data.admin){
            navigate(`/admin-panel`)
           }else if(response.data.user){
            console.log("OK")
           }else{
            navigate('/')
           }

        }).catch(error=>{
            console.log(error)
        })
       },[user.token])
    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/loans`,{
            headers:{
                Authorization:`Bearer ${user.token}`
            }  
        }).then(response=>{
            const approvedLoans=response.data.filter((data=>data.status=='approved'))
            setLoanData(approvedLoans)
        }).catch(error=>{
            console.log(error)
        })
       },[user.token])
       useEffect(()=>{

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-tickets`,{
            headers:{
                Authorization:`Bearer ${user.token}`
            }  
        }).then(response=>{
            setQueryData(((prevData)=>(
                {
                    ...prevData,
                    tickets:response.data.length
        
                   }
               )))
        }).catch(error=>{
            console.log(error)
        })
       },[user.token])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-user`,{
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        }).then(response=>{
            setData(response.data)
        }).catch(error=>{
            console.log(error.response)
    
           
        })
    },[])


  return (
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
                            <Link style={{textDecoration:'none', color:'#6e6e6e',marginTop:".8rem"}} to={'/profile-setting'}><p>Profile Settings</p></Link>
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


           {data? <div className="dashboard-main">
                <div className="card-body">
                    <p>Account Number</p>
                    <span>{data.accountNumber}</span>

                </div>

                <div className="balances">
                <div className="card-body">
                    <p>USD Balance</p>
                    <span>${data.balance.USD.toFixed(2)}</span>

                </div>
                <div className="card-body">
                    <p>EUR Balance</p>
                    <span>€{data.balance.EUR.toFixed(2)}</span>

                </div>
                <div className="card-body">
                    <p>GBP Balance</p>
                    <span>₹{data.balance.GBP.toFixed(2)}</span>

                </div>
                </div>

                <div className="activities">
                <div className="card-body activit1">
                    <p>Active Loans</p>
                    <span className='activity-data'>{queryData.activeLoans}</span>
                    <Link style={{textDecoration:'none', color:'white'}} to={'/loans/my_loans'}><h3>View &#8594;</h3>
                    </Link>
                </div>
                <div className="card-body activit2">
                    <p>Payment Requests</p>
                    <span>{queryData.paymentReq}</span>
                    <Link style={{textDecoration:'none', color:'white'}} to={'/payment_requests'}><h3>View &#8594;</h3>
                    </Link>

                </div>
                <div className="card-body activit3">
                    <p>Active Fixed Deposits</p>
                    <span>{queryData.AFD}</span>
                    <Link style={{textDecoration:'none', color:'white'}} to={'/fixed_deposits/history'}><h3>View &#8594;</h3>
                    </Link>

                </div>
                <div className="card-body activit4">
                    <p>Active Tickets</p>
                    <span>{queryData.tickets}</span>
                    <Link style={{textDecoration:'none', color:'white'}} to={'/tickets/create_ticket'}><h3>View &#8594;</h3>
                    </Link>

                </div>

                </div>
                <div className="loan-container">
      <h2>Upcoming Loan Payment</h2>
      <div className="loan-table">
        <table className='equal-table'>
          <thead>
            <tr>
            <th>Loan ID</th>
              <th>Loan Product</th>

              <th>Total Payable</th>
              <th>Amount Paid</th>
              <th>Due Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loanData.length>0 ? (
                
                loanData.map((data,index)=>(
                    <tr>
                    <td>{index+1}</td>
                    <td>{data.loanProduct} </td>

                    <td>{data.totalpayableAmount} {data.currency}</td>
                    <td>{data.amountPaid} {data.currency}</td>
                    <td>{data.dueAmount} {data.currency}</td>
                    <td>{data.status}</td>
                    <td className='pay-button'><Link to={'/deposit/manual_methods'}><button>Pay Now</button></Link></td>
                    {/* {
                        data.user==false&&(
                            <td className='action-tb'>
                        <button>Accept</button>
                        <button>Reject</button>
                    </td>
                        )
                    }
                   */}
                  </tr>
                 ))
                
            ) : (
              <tr>
                <td colSpan="10" className="no-loan-message">
                  No Active Loan Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
            </div>:<Loader />}





        </div>
      
    </div>
  )
}

export default Dashboard
