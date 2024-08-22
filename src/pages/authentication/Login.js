import React, { useState } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import AuthLogin from './auth-forms/AuthLogin';
import ForgotPassword from './auth-forms/ForgotPassword';
import AuthWrapper from './AuthWrapper';
import hepllogo from 'assets/images/users/Hepl logo.png';

export const Login = () => {
  const [view, setView] = useState(true); // Fix: moved useState call inside component body

  const handleForgotAction = () => {
    setView(false);
    // setIsEditable(true);
  };

  return (
    <AuthWrapper>
      <Grid spacing={3} columns={12} xs={12} sm={12} md={12} lg={12}>
        <div className="login-right">
          <Grid>
            <img src={hepllogo} alt="hepl-logo" style={{ width: '95px', display: 'flex', margin: 'auto', justifyContent: 'center' }} />
          </Grid>
          <Grid
            sx={{
              mt: 4
            }}
          >
            <Typography
              sx={{
                fontWeight: '700',
                color: '#454F5B',
                fontSize: {
                  lg: '20px',
                  md: '20px',
                  sm: '20px'
                },
                margin: 'auto',
                textAlign: 'center',
                fontFamily: 'Open Sans'
              }}
            >
              <h3 style={{ fontWeight: 700 }}>Welcome to Asset Management Tool</h3>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" alignItems="baseline" sx={{ mt: 3 }}>
              {view ? (
                <Grid>
                  <div className="loginlable">
                    <Typography sx={{ fontWeight: '700', fontSize: '16px' }}>Login</Typography>
                  </div>
                </Grid>
              ):(
                <Grid container justifyContent="center">
                <Grid item xs={12}>
                  <div className="loginlable" style={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: '700', fontSize: '16px' }}>Forgot Password</Typography>
                    {/* <p style={{ fontSize: "12px" }}>No worries, we&apos;ll send you a reset link</p> */}
                  </div>
                </Grid>
              </Grid>
              )}
              
            </Stack>
          </Grid>
          <Grid item sx={{ pl: 1.5 }}>
             {/* Pass handleForgotAction function as a prop */}
              { view ? (
                  <AuthLogin onForgotAction={handleForgotAction} />
                ):(
                  <ForgotPassword />

                )
              }
          </Grid>
        </div>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
