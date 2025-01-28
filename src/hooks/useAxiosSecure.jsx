import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

// Create an axios instance with base URL and credentials
export const axiosSecure = axios.create({
  baseURL: 'https://assignment-twelve-server-drab.vercel.app',
  withCredentials: true,
});

// Interceptor to include the token in request headers
axiosSecure.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
   
    axiosSecure.interceptors.response.use(
      res => res, 
      async error => {
        console.log('Interceptor error', error.response);

        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // If unauthorized or forbidden, log out the user
          logOut();

          // Navigate to login page
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
