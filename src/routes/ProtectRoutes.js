import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
// import axiosInstance from '../constants/Global';
import { useCookies } from 'react-cookie'; // Import useCookies hook

const ProtectedRoute = ({ isAllowed, redirectPath = '/', permissions, children }) => {
  const cookies = useAuth();
  const [cookiess, removeCookie] = useCookies(['token', 'permissions']);
  const users = getDecodeToken();
  const currentTime = new Date().getTime();

  useEffect(() => {
    if (users) {
      const isTokenExpired = users.exp < currentTime / 1000;
      if (isTokenExpired) {
        toast.error('Session is expired');
        Object.keys(cookiess).forEach((cookieName) => {
          removeCookie(cookieName);
        });
      }
    } else {
      Object.keys(cookiess).forEach((cookieName) => {
        removeCookie(cookieName);
      });
    }
  }, [currentTime, removeCookie, users]);
  if (cookies.cookies.token === 'undefined') {
    return <Navigate to="/" replace />;
  }
  if (!cookies.cookies.token) {
    return <Navigate to="/" replace />;
  }
  if (cookies && cookies.cookies && cookies.cookies.token === '') {
    return <Navigate to="/" replace />;
  }

  if (!isAllowed || !cookies.cookies.permissions || !cookies.cookies.permissions.includes(permissions)) {
    return <Navigate to={redirectPath} replace />;
  }

  // If allowed, render the children or outlet
  return children ? children : <Outlet />;
};

const getDecodeToken = () => {
  const token = localStorage.getItem('token') || '';
  let decoded;
  if (token === '') {
    decoded = '';
  } else {
    decoded = jwtDecode(token);
  }
  return decoded;
};

export default ProtectedRoute;
