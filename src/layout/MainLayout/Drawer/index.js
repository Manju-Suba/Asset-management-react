import PropTypes from 'prop-types';
import { useMemo } from 'react';

//import css
import '../Drawer/DrawerHeader/Header.css';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// project import
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled';
import { drawerWidth } from 'config';
import { Grid } from '../../../../node_modules/@mui/material/index';

// image
// import groupimage from 'assets/images/users/Group image.png';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

const MainDrawer = ({ open, handleDrawerToggle, window }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined;

  // header content
  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);
  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">
      {!matchDownMD ? (
        <MiniDrawerStyled variant="permanent" open={open} className="sidebar sidebar-wid bg-img-menu">
          {drawerHeader}
          <div className="buttontype">{drawerContent}</div>
          <Grid className="end-bg-img">
            {/* <img src={groupimage} alt={groupimage} style={{ width: '80%', height: '171px', marginLeft: '20px', }} /> */}
          </Grid>
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              // borderRight: `1px solid ${theme.palette.divider}`,
              // backgroundImage: 'none',
              boxShadow: 'inherit',
              backgroundColor: 'rgb(67, 128, 235)'
            }
          }}
        >
          {open && drawerHeader}

          {open && drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

MainDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default MainDrawer;
