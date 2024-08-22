import React, { createContext, useContext, useState, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import axiosInstance from '../constants/Global';
import { jwtDecode } from 'jwt-decode';
import { PERMISSIONS, API_AUTH_URL, ROLE_LIST } from '../constants/constants';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useState({
    username: '',
    permissions: []
  });

  const login = async (formData) => {
    try {
      // const response = await axiosInstance.post(`/auth/signin`, formData, {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      const response = await axios.post(API_AUTH_URL + '/auth/signin', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 && response.data && response.data.data && response.data.data.length > 0) {
        const token = response.data.data[0].token;
        let decoded;
        if (token === '') {
          decoded = '';
        } else {
          decoded = jwtDecode(token);
          let role = decoded?.role?.[0]?.authority || '';
          let username = decoded?.username || '';
          localStorage.setItem('token', token);
          setCookie('token', token);
          if (role === ROLE_LIST.ADMIN) {
            setUser({
              username: username,
              permissions: [
                PERMISSIONS.CAN_VIEW_DASHBOARD,
                PERMISSIONS.CAN_VIEW_ASSET_LIST,
                PERMISSIONS.CAN_VIEW_ASSET_ALLOCATION,
                PERMISSIONS.CAN_VIEW_ASSET_TRANSFER,
                PERMISSIONS.CAN_VIEW_MASTER,
                PERMISSIONS.CAN_VIEW_ASSET_AUDIT,
                PERMISSIONS.CAN_VIEW_DISPOSED_AUDIT,
                PERMISSIONS.CAN_VIEW_REPORT
              ]
            });
            setCookie('permissions', [
              PERMISSIONS.CAN_VIEW_DASHBOARD,
              PERMISSIONS.CAN_VIEW_ASSET_LIST,
              PERMISSIONS.CAN_VIEW_ASSET_ALLOCATION,
              PERMISSIONS.CAN_VIEW_ASSET_TRANSFER,
              PERMISSIONS.CAN_VIEW_MASTER,
              PERMISSIONS.CAN_VIEW_ASSET_AUDIT,
              PERMISSIONS.CAN_VIEW_DISPOSED_AUDIT,
              PERMISSIONS.CAN_VIEW_REPORT,
              PERMISSIONS.CAN_VIEW_PROFILE
            ]);
          } else if (role === ROLE_LIST.AUDITOR) {
            setUser({
              username: username,
              permissions: [PERMISSIONS.CAN_VIEW_AUDIT_DISPOSED, PERMISSIONS.CAN_VIEW_PROFILE]
            });
            setCookie('permissions', [PERMISSIONS.CAN_VIEW_AUDIT_DISPOSED, PERMISSIONS.CAN_VIEW_PROFILE]);

          } else if (role === ROLE_LIST.SAP) {
            setUser({
              username: username,
              permissions: [PERMISSIONS.CAN_VIEW_SAP_ACTION_DATA, PERMISSIONS.CAN_VIEW_PROFILE]
            });
            setCookie('permissions', [PERMISSIONS.CAN_VIEW_SAP_ACTION_DATA, PERMISSIONS.CAN_VIEW_PROFILE]);
            
          } else if (role === ROLE_LIST.USER) {
            setUser({
              username: username,
              permissions: [
                PERMISSIONS.CAN_VIEW_USER_ASSET_LIST,
                PERMISSIONS.CAN_VIEW_USER_SCRAP_ASSET,
                PERMISSIONS.CAN_VIEW_USER_DISPOSED_ASSET,
                PERMISSIONS.CAN_VIEW_PROFILE
              ]
            });
            setCookie('permissions', [
              PERMISSIONS.CAN_VIEW_USER_ASSET_LIST,
              PERMISSIONS.CAN_VIEW_USER_SCRAP_ASSET,
              PERMISSIONS.CAN_VIEW_USER_DISPOSED_ASSET,
              PERMISSIONS.CAN_VIEW_PROFILE
            ]);
          } else if (role === ROLE_LIST.USER1) {
            setUser({
              username: username,
              permissions: [
                PERMISSIONS.CAN_VIEW_USER1_ASSET_LIST,
                PERMISSIONS.CAN_VIEW_USER1_SCRAP_ASSET,
                PERMISSIONS.CAN_VIEW_USER1_DISPOSED_ASSET,
                PERMISSIONS.CAN_VIEW_PROFILE
              ]
            });
            setCookie('permissions', [
              PERMISSIONS.CAN_VIEW_USER1_ASSET_LIST,
              PERMISSIONS.CAN_VIEW_USER1_SCRAP_ASSET,
              PERMISSIONS.CAN_VIEW_USER1_DISPOSED_ASSET,
              PERMISSIONS.CAN_VIEW_PROFILE
            ]);
          } else {
            setUser({ username: username, permissions: [PERMISSIONS.CAN_VIEW_AUDIT_DISPOSED, PERMISSIONS.CAN_VIEW_PROFILE] });
            setCookie('permissions', [PERMISSIONS.CAN_VIEW_AUDIT_DISPOSED, PERMISSIONS.CAN_VIEW_PROFILE]);
          }
        }
      } else {
        throw new Error('Login failed');
      }

      return response;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post(
        `/auth/signout`,
        {},
        {
          headers: {}
        }
      );
      if (response.status === 200) {
        window.localStorage.clear();
        localStorage.removeItem('token');
        ['token', 'permissions'].forEach((obj) => removeCookie(obj));
        Object.keys(cookies).forEach((cookieName) => {
          removeCookie(cookieName, { path: '/' });
        });
      }
      return response;
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const value = useMemo(
    () => ({
      user,
      cookies,
      login,
      logout
    }),
    [cookies]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
