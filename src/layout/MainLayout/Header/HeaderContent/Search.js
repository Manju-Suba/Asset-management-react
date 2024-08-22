// material-ui
import { Box } from '@mui/material';

// assets
// import { Grid } from '../../../../../node_modules/@mui/material/index';

import navigation from 'menu-items';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => (
  <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
    <Breadcrumbs navigation={navigation} title />
  </Box>
);

export default Search;
