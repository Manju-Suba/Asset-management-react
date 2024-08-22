// eslint-disable-next-line
import React, { useEffect } from 'react';
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axiosInstance from 'constants/Global';
// import { useNavigate } from 'react-router-dom';
import { AuthProvider } from 'routes/AuthContext';

const App = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const interceptor = axiosInstance.interceptors.request.use(async (req) => {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       navigate('/');
  //     }
  //     return req;
  //   });
  //   return () => {
  //     axiosInstance.interceptors.request.eject(interceptor);
  //   };
  // }, [navigate]);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <ToastContainer />
        <AuthProvider>
        <Routes />
        </AuthProvider>
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
