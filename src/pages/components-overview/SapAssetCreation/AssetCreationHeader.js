import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllassetTicketApproved from './AllassetTicketApproved';
import AllassetTicket from './AllassetTicket';

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

export default function AssetCreationHeader() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="tab-ind-sty">
          <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Pending" {...a11yProps(0)} />
          <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Approved" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} sx={{ width: '0px' }}>
        <AllassetTicket />
        {/* <AuditDisposedPending onRowClick={handleRowClick} /> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AllassetTicketApproved />
      </CustomTabPanel>
    </Box>
  );
}
