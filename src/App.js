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

function App() {
  const {user}=useAuthContext()
  const location = useLocation();
  const navigate=useNavigate()

  useEffect(() => {
    const checkToken = async () => {
      if (user && user.token) {
        try {
          await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/check-token`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          console.log("Valid");
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error === 'Token has expired') {
            localStorage.removeItem('user');
            console.log('User data removed from local storage');
            navigate('/rf-admin') // Redirect to login page
          } else {
            console.error('An error occurred:', error);
          }
        }
      }
    };

    checkToken();
  }, [location, user]);
  return (
    <div className="App">
      <ScrollToTop />
     <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/rf-admin' element={!user?<Login />:<Admin />}/>
      <Route path='/admin' element={user?<Admin />:<Login/>}/>
      <Route path='/edit-refund/:refundNo' element={user?<EditRefund />:<Login/>}/>
      <Route path='/check-refund/' element={<CheckRefund />}/>
      <Route path='/about-us/' element={<About/>}/>
      <Route path='/testimonials/' element={<Testimonial/>}/>
      <Route path='/contact/' element={<Contact/>}/>
      <Route path='/privacy-policy/' element={<PrivacyPolicy/>}/>
      <Route path='*'   element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
