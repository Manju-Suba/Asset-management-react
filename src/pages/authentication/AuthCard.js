import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

const AuthCard = ({ children }) => <Box>{children}</Box>;

AuthCard.propTypes = {
    children: PropTypes.node
};

export default AuthCard;
