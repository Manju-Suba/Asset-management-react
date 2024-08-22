import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AuditDisposedApproved from './AuditDisposedApproved';
import AuditDisposedPending from './AuditDisposedPending';
import AuditRejectedAssets from './AuditRejectedAssets';
import AuditObservation from './AuditObservation';
// import AuditDisposedAssets from './AuditDisposedAssets';
// import AuditDisposedWaiting from './AuditDisposedWaiting';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`transfer-tabpanel-${index}`} aria-labelledby={`transfer-tab-${index}`} {...other}>
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

function a11yProps(index) {
  return {
    id: `transfer-tab-${index}`,
    'aria-controls': `transfer-tabpanel-${index}`
  };
}

export default function AuditDisposedHeader({ onRowClick }) {
  const [value, setValue] = React.useState(0);
  const [isRowClicked, setIsRowClicked] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRowClick = () => {
    setIsRowClicked(!isRowClicked);
    onRowClick();
  };

  return (
    <Box sx={{ width: '100%' }}>
      {!isRowClicked && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="tab-ind-sty">
            <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Pending" {...a11yProps(0)} />
            <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Approved" {...a11yProps(1)} />
            <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Rejected" {...a11yProps(2)} />
            <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Observation" {...a11yProps(3)} />
          </Tabs>
        </Box>
      )}
      <CustomTabPanel value={value} index={0} sx={{ width: '0px' }}>
        <AuditDisposedPending onRowClick={handleRowClick} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AuditDisposedApproved />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AuditRejectedAssets />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <AuditObservation />
      </CustomTabPanel>
    </Box>
  );
}
