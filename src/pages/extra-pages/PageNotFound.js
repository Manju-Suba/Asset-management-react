import { Box, Grid } from '@mui/material';
import logo from 'assets/images/users/404.svg';
import { Card } from '../../../node_modules/@mui/material/index';
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const PageNotFound = () => {
  const goBack = () => {
    window.history.back();
  };

  const handleLoginClick = () => {
    window.location.href = '/asset_management_react/'; // Redirect to an expired page
    return null;
  };

  const token = localStorage.getItem('token') || '';
  // let routes;
  // if (token == '') {
  //   routes = [LoginRoutes];
  // } else {
  //   }
  // }

  return (
    <Box sx={{ width: '100%', maxHeight: '100%', bgcolor: '#f0f8ff' }}>
      {/* <AuthBackground /> */}
      <Grid
        item
        columns={12}
        container
        // sx={{display:'flex',pt:6,}}
      >
        <Grid item lg={6} md={6} sm={6} xs={6} display={{ xs: 'inline', lg: 'inline', md: 'inline', sm: 'inline' }}>
          <img src={logo} alt={logo} className="page_notfound_image" />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Grid item className="h-100px">
            <Grid spacing={3} columns={12} xs={12} sm={12} md={12} lg={12} className="ds-flext-center w-100px">
              <div className="login-right w-100px">
                <Grid
                  sx={{
                    mt: 4
                  }}
                >
                  <Card sx={{ height: '100%', width: '100%', overflow: 'auto', borderRadius: '10px' }} className="error-box">
                    <div>
                      <h1 className="error-404-message">
                        Oops!<br></br>Page Not Found
                      </h1>
                      <div className="mui-text-center margin-top-30px">
                        {token !== '' ? (
                          <Button variant="outlined" onClick={goBack} startIcon={<UndoIcon />}>
                            Go Back
                          </Button>
                        ) : (
                          <Button variant="outlined" onClick={handleLoginClick} startIcon={<UndoIcon />}>
                            Go to Login Page
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item sx={{ pl: 1.5 }}></Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageNotFound;
