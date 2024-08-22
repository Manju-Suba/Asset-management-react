import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import AuthCard from './AuthCard';
import logo from 'assets/images/users/login image.png';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
    <Box sx={{ width: '100%', minHeight: '800px', maxHeight: '100%', bgcolor: '#fff' }}>
        {/* <AuthBackground /> */}
        <Grid
            item
            columns={12}
            container
            // sx={{display:'flex',pt:6,}}
        >
            <Grid item lg={6} md={6} sm={6} xs={6} display={{ xs: 'none', lg: 'inline', md: 'inline', sm: 'inline' }}>
                <img src={logo} alt={logo} className="login_image" />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Grid item>
                    <AuthCard>{children}</AuthCard>
                </Grid>
            </Grid>
        </Grid>
    </Box>
);

AuthWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthWrapper;
