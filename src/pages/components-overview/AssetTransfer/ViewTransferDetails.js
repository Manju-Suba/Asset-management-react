import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import TransferList from './TransferList';
import { Grid } from '../../../../node_modules/@mui/material/index';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        // <Box sx={{ p: 1, }}>
        <Typography>{children}</Typography>
        // </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default function ViewTransferDetails({ onRowClick, selectedData }) {
  const handleBackButtonClick = () => {
    onRowClick();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box className="tob-cen pad-header">
        <Grid>
          {' '}
          <KeyboardBackspaceIcon className="arrow-back" onClick={handleBackButtonClick} />{' '}
          <pre style={{ display: 'inline' }}>
            <h4 style={{ display: 'inline', marginRight: '5px' ,fontWeight: '800'}}>Asset Transfer details</h4>
          </pre>
        </Grid>
      </Box>
      <TransferList selectedAsset={selectedData} />
    </Box>
  );
}
