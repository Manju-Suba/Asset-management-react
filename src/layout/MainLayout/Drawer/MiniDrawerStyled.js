// material-ui
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

// project import
import { drawerWidth } from 'config';

const openedMixin = (theme) => ({
    width: drawerWidth,
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden',
    overflowY: 'hidden',
    boxShadow: 'none',
    backgroundColor: 'rgb(67, 128, 235)'
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: 0,
    borderRight: 'none',
    boxShadow: theme.customShadows.z1
});
// const Button =( theme ) => ({
//   // in default mode.
//   backgroundColor: theme.vars.palette.primary.main,
//   color: '#fff',
//   '&:hover': {
//     backgroundColor: red,
//   },

//   // in dark mode.
//   // [theme.getColorSchemeSelector('dark')]: {
//   //   backgroundColor: theme.vars.palette.primary.dark,
//   //   color: theme.vars.palette.primary.main,
//   //   '&:hover': {
//   //     color: '#fff',
//   //     backgroundColor: theme.vars.palette.primary.dark,
//   //   },
//   // },
// });

// ==============================|| DRAWER - MINI STYLED ||============================== //

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
    })
}));

export default MiniDrawerStyled;
