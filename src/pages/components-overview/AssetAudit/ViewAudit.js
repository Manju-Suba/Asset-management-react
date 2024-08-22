import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AuditList from './AuditList';
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

export default function ViewAudit({ onRowClick, selectedData }) {
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
            <h4 style={{ display: 'inline', marginRight: '5px' }}>Audit details for </h4>
            <p style={{ display: 'inline', color: 'blue' }}>{selectedData?.assetClass || ''}</p>
          </pre>
        </Grid>
        <Grid sx={{ fontSize: '12px', color: '#919EAB' }}>Audit</Grid>
      </Box>
      <AuditList selectedAsset={selectedData} />
    </Box>
  );
}
