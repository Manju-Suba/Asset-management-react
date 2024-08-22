// material-ui
import { useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
// import { SettingOutlined, BellOutlined } from '@ant-design/icons';
// import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { jwtDecode } from 'jwt-decode';

// project import
import Search from './Search';
import Profile from './Profile';
import MobileSection from './MobileSection';
import { Grid, Typography } from '../../../../../node_modules/@mui/material/index';
import { ProfileData } from 'components/redux/User/action';
import { useDispatch, useSelector } from 'react-redux';
// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.UserProfileData && state.UserProfileData.UserDetails);
  const getDecodeToken = () => {
    const token = localStorage.getItem('token') || '';
    let decoded;
    if (token === '') {
      decoded = '';
    } else {
      decoded = jwtDecode(token);
    }
    return decoded;
  };
  
  const users = getDecodeToken();
  useEffect(() => {
    dispatch(ProfileData(users.id));
  }, [dispatch]);

  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
      <Grid sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', color: 'black' } }}>
        {/* <IconButton
          component={Link}
          target="_blank"
          disableRipple
          color="secondary"
          title="Download Free Version"
          sx={{
            color: '#D9D9D9',
            borderRadius: '100px',
            mr: 1.5,
            border: ' 1px solid #f0f0f0',
            height: '30px',
            width: '30px',
            fontSize: '14px'
          }}
        >
          <SettingOutlined />
        </IconButton>
        <Badge color="error" overlap="circular" badgeContent=" " variant="dot" sx={{ mr: 1.5 }}>
          <IconButton
            component={Link}
            target="_blank"
            disableRipple
            color="secondary"
            title="Download Free Version"
            sx={{
              color: '#D9D9D9',
              borderRadius: '100px',

              border: ' 1px solid #f0f0f0',
              height: '30px',
              width: '30px',
              fontSize: '14px'
            }}
          >
            <BellOutlined sx={{ color: '#D9D9D9', backgroundColor: '#fff', borderRadius: '100px', pb: 3 }} />
          </IconButton>
        </Badge> */}

        {!matchesXs && <Profile ProPicture={profile?.pictureWithPath || null} />}
        <Grid sx={{ width: 100, ml: 1.5 }}>
          <Typography
            variant="caption"
            sx={{
              color: ' var(--grey-Grey-900, #161C24)',
              fontSize: '14px',
              fontWeight: '700',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden', // Ensure text overflow is hidden
              marginRight: '4px' // Add some margin for separation
            }}
          >
            {profile?.fullName || ''}
          </Typography>

          <Grid variant="caption" color="textSecondary" sx={{ textDecoration: 'none', fontSize: '10px' }}>
            {profile?.role || ''}
          </Grid>
        </Grid>
        {/* <Grid sx={{ color: '#ACACAC', mr: 1, mt: 1 }}>
          {' '}
          <ArrowDropDownOutlinedIcon />
        </Grid> */}
      </Grid>
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
