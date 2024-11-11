import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { toast } from 'wc-toast';

function VerifyEmail() {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  

  useEffect(() => {
    if (token) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/verify-email`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('userToken', token);
        dispatch({ type: 'LOGIN', payload: { token } });

        toast.success("Email Verified Successfully");
        navigate('/dashboard');
      })
      .catch(error => {
        console.error(error.response);
        toast.error("Verification failed, please try again.");
        navigate('/register');
      });
    } else {
      toast.error("Invalid or missing token.");
      navigate('/register');
    }
  }, [token, dispatch, navigate]);

  return (
    <div>
      {/* Optional content for user feedback can be added here */}
    </div>
  );
}

export default VerifyEmail;
