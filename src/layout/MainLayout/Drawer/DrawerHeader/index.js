import PropTypes from 'prop-types';

// material-ui

// project import
import logo from 'assets/images/users/hepl white 1.png';
import { Grid } from '../../../../../node_modules/@mui/material/index';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = () => {
    // const theme = useTheme();
    //
    return (
        <Grid sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <img src={logo} alt={logo} style={{ width: '40%', marginTop: '13px' }} />
        </Grid>
    );
};

DrawerHeader.propTypes = {
    open: PropTypes.bool
};

export default DrawerHeader;
