import './App.css';
import {Routes,Route, useNavigate,useLocation} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Login from './Pages/LoginAdmin/Login';
import Admin from './Pages/Admin Page/Admin';
 import { useAuthContext } from './Hooks/useAuthContext';
 import 'react-toastify/dist/ReactToastify.css';
import EditRefund from './Pages/Admin Page/EditRefund';
import CheckRefund from './Pages/Check Refund/CheckRefund';
import About from './Pages/About/About';
import Testimonial from './Pages/Testimonial/Testimonial';
import Contact from './Pages/Contact/Contact';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import NotFound from './Component/NotFound/NotFound';
import ScrollToTop from './Component/Scroll To Top/ScrollToTop'
import axios from 'axios';
import { useEffect } from 'react';
import RegisterUser from './Pages/Register/RegisterUser';
import LoginUser from './Pages/Login/LoginUser';
import Dashboard from './Pages/Dashboard/Dashboard';
import SendMoney from './Pages/Dashboard/SendMoney';
import ExchangeMoney from './Pages/Dashboard/ExchangeMoney';
import NewPaymentReq from './Pages/Dashboard/NewPaymentReq';
import AllPaymentReq from './Pages/Dashboard/AllPaymentReq';
import AutomaticDeposits from './Pages/Dashboard/AutomaticDeposits';
import ManualDeposits from './Pages/Dashboard/ManualDeposits';
import RedeemGiftCard from './Pages/Dashboard/RedeemGiftCard';
import Withdraw from './Pages/Dashboard/Withdraw';
import ApplyLoan from './Pages/Dashboard/ApplyLoan';
import MyLoans from './Pages/Dashboard/MyLoans';
import ApplyFRD from './Pages/Dashboard/ApplyFRD';
import FDRHistory from './Pages/Dashboard/FDRHistory';
import DPSPlans from './Pages/Dashboard/DPSPlans';
import MyDPS from './Pages/Dashboard/MyDPS';
import CreateTicket from './Pages/Dashboard/CreateTicket';
import { ToastContainer } from 'react-toastify'
import VerifyEmail from './Component/Verify Email/VerifyEmail';
import ForgotPassword from './Pages/Forgot Passsword/ForgotPassword';
import ResetPassword from './Pages/Forgot Passsword/ResetPassword';
import Profile from './Pages/Dashboard/Profile';
import ViewProfile from './Pages/Dashboard/ViewProfile';
import AdminPanel from './Pages/Admin Panel/AdminPanel';
import Users from './Pages/Admin Panel/Users';
import Tickets from './Pages/Admin Panel/Tickets';
import DepositRequest from './Pages/Admin Panel/DepositRequests';
import LoanRequest from './Pages/Admin Panel/LoanRequest';
import GiftCard from './Pages/Admin Panel/GiftCard';
import FixedDeposits from './Pages/Admin Panel/FixedDeposits';
import Invoice from './Component/Invoice/Invoice';
import TransactionsHistory from './Pages/Dashboard/TransactionsHistory';

function App() {
  const { user,dispatch } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top on pathname change
  }, [pathname]);

  useEffect(() => {

    console.log(location.pathname)
    const checkToken = async () => {
      if (user && user.token) {
        try {
          await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/check-token`, {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          });
          console.log("Valid");
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error === "Token has expired") {
            dispatch({type:'LOGOUT',payload:null})
            localStorage.setItem('user', null);
            console.log("User data removed from local storage");
          } else {
            dispatch({type:'LOGOUT',payload:null})
            console.error("An error occurred:", error);
          }
        }
      }
    };

    checkToken();
  }, [location.pathname, user]);

  useEffect(()=>{
    console.log(location.pathname)
   if(location.pathname!=='/'&&location.pathname!=='/home'&&location.pathname!=='/about-us'&&location.pathname!=='/testimonials'&&location.pathname!=='/privacy-policy'&&location.pathname!=='/contact'){
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/check-emailverified`,{
      headers:{
          Authorization:`Bearer ${user?.token}`
      }
  }).then(response=>{
      if(!response.data.verifyEmail){
      navigate('/register')
          
      }
  }).catch(error=>{
      console.log(error.response)

     
  })
   }

},[location.pathname])
  return (
    <div className="App">
      <ToastContainer />
      {/* Your ScrollToTop component if needed */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rf-admin" element={<Login /> } />
        <Route path="/admin" element={user ? <Admin /> : <Login />} />
        <Route path="/edit-refund/:refundNo" element={user ? <EditRefund /> : <Login />} />
        <Route path="/check-refund/" element={<CheckRefund />} />
        <Route path="/about-us/" element={<About />} />
        <Route path="/testimonials/" element={<Testimonial />} />
        <Route path="/transactions/history" element={user ? <TransactionsHistory /> : <LoginUser />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/privacy-policy/" element={<PrivacyPolicy />} />
        <Route path="/login/" element={!user?<LoginUser />:<Dashboard />} />
        <Route path="/register/" element={<RegisterUser />} />
        <Route path="/dashboard/" element={user ? <Dashboard /> : <LoginUser />} />
        <Route path="/transfer/send_money/" element={user ? <SendMoney /> : <LoginUser />} />
        <Route path="/transfer/exchange_money/" element={user ? <ExchangeMoney /> : <LoginUser />} />
        <Route path="/payment_requests/create/" element={user ? <NewPaymentReq /> : <LoginUser />} />
        <Route path="/payment_requests/" element={user ? <AllPaymentReq /> : <LoginUser />} />
        <Route path="/deposit/automatic_methods/" element={user ? <AutomaticDeposits /> : <LoginUser />} />
        <Route path="/deposit/manual_methods/" element={user ? <ManualDeposits /> : <LoginUser />} />
        <Route path="/deposit/redeem_gift_card/" element={user ? <RedeemGiftCard /> : <LoginUser />} />
        <Route path="/withdraw/manual_methods/" element={user ? <Withdraw /> : <LoginUser />} />
        <Route path="/loans/apply_loan/" element={user ? <ApplyLoan /> : <LoginUser />} />
        <Route path="/loans/my_loans/" element={user ? <MyLoans /> : <LoginUser />} />
        <Route path="/fixed_deposits/apply/" element={user ? <ApplyFRD /> : <LoginUser />} />
        <Route path="/fixed_deposits/history/" element={user ? <FDRHistory /> : <LoginUser />} />
        <Route path="/dps_schemes/plans/" element={user ? <DPSPlans /> : <LoginUser />} />
        <Route path="/dps_schemes/" element={user ? <MyDPS /> : <LoginUser />} />
        <Route path="/tickets/create_ticket/" element={user ? <CreateTicket /> : <LoginUser />} />
        <Route path="/forgot-password/" element={!user? <ForgotPassword />:<Dashboard/>} />
        <Route path="/verify-email/" element={<VerifyEmail />} />
        <Route path="/reset-password/" element={!user? <ResetPassword />:<Dashboard/>} />
        <Route path="/user-profile/" element={user ? <Profile /> : <LoginUser />} />
        <Route path="/profile-setting/" element={user ? <ViewProfile /> : <LoginUser />} />
        <Route path="/admin-panel" element={user ? <AdminPanel /> : <LoginUser />} />
        <Route path="/admin/users" element={user ? <Users /> : <LoginUser />} />
        <Route path="/admin/tickets" element={user ? <Tickets /> : <LoginUser />} />
        <Route path="/admin/deposit" element={user ? <DepositRequest/> : <LoginUser />} />
        <Route path="/admin/loan" element={user ? <LoanRequest/> : <LoginUser />} />
        <Route path="/admin/gift-cards" element={user ? <GiftCard/> : <LoginUser />} />
        <Route path="/admin/fixed-deposits/" element={user ? <FixedDeposits/> : <LoginUser />} />
        <Route path="/invoice/" element={<Invoice/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}


export default App;

