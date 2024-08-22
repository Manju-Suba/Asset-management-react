import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack } from '@mui/material';
// import { Box, Grid, Stack, Typography } from '@mui/material';

// project import
// import MainCard from 'components/MainCard';

// assets

//import image
// import workflow2 from 'assets/images/users/workflow-setting-alt 1.png';
import workflow3 from 'assets/images/users/workflow-setting-alt 1 (3).png';

// icons
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ label, value, bgcolor, width, color }) => (
    // <MainCard contentSX={{ p:0 ,pb:0}} sx={{ pt: 0, pl: 0, pb: 0, border: 'none' }}>
    <Stack>
        <Grid item container alignItems="center">
            <Grid>
                <Grid
                    item
                    sx={{
                        pl: 0,
                        width: width,
                        height: '118px',
                        borderRadius: '10px',
                        // bgcolor: '#4380EB',
                        bgcolor: bgcolor,
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}
                >
                    <Grid container>
                        <Grid
                            item
                            lg={12}
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 2, paddingTop: '10px' }}
                        >
                            <img src={workflow3} alt={workflow3} style={{ width: '24px', mt: 4, height: '24px' }} />
                        </Grid>
                        <Grid item lg={12} sx={{ color: '#fff', fontSize: '24px', fontWright: '700', pt: 0, textAlign: 'center' }}>
                            <Grid item sx={{ fontSize: '17px', color: color, justifyContent: 'center' }}>
                                {label}
                            </Grid>
                            <Grid item sx={{ fontSize: '10px', color: color, mt: 1 }}>
                                {value}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* )} */}
        </Grid>
    </Stack>
    // </MainCard>
);

AnalyticEcommerce.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    subtitle: PropTypes.string,
    // image:PropTypes.,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
    color: 'primary'
};

export default AnalyticEcommerce;
