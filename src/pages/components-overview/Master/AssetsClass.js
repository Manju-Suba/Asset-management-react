import Grid from '@mui/material/Grid';
// import { TextField } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import SearchSharpIcon from '@mui/icons-material/SearchSharp';
// import Addassetcategory from './MasterModals/Addassetcategory';
import Mastertable from './Mastertable';

// ============================|| ANT ICONS ||============================ //

const AssetsClass = () => {
  

  return (
    <>
      <Grid item container spacing={2}>
        {/* left side */}
        {/* <Grid item lg={3} md={4} sm={5} xs={6}>
                    <TextField
                        // margin="normal"
                        className="search_button"
                        required
                        fullWidth
                        name="asset"
                        type={'text'}
                        placeholder="search "
                        sx={{ border: 'none' }}
                        InputProps={{
                            style: {
                                width: '90%',
                                height: '100%',
                                color: '#708090',
                                bgcolor: '#FBFBFB',
                                marginLeft: '20px',
                                marginTop: '5px'
                            },
                            startAdornment: (
                                <IconButton aria-label="Toggle password visibility" edge="start">
                                    <SearchSharpIcon sx={{ color: '#708090', fontSize: '19px', fontWeight: '700' }} />
                                </IconButton>
                            )
                        }}
                    />
                </Grid> */}
        <Grid item lg={6} md={4} sm={2} xs={0} display={{ lg: 'inline', md: 'inline', sm: 'inline', xs: 'none' }}></Grid>
        {/* <Grid item lg={3} md={4} sm={5} xs={6}>
                    <Addassetcategory bussiness={getAllBusinessList} />
                </Grid> */}
        <Grid item lg={6} md={4} sm={2} xs={2} />
      </Grid>
      {/* table */}
      <Grid item sx={{ mt: 2 }}>
        <Mastertable />
      </Grid>
    </>
  );
};
export default AssetsClass;
