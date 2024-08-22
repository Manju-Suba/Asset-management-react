import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AssetsClass from './AssetsClass';
// import Masterassecttype from './AssetType/Masterassecttype';
import Location from './Location/Location';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function Masterheader() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{ fontSize: '16px', fontWeight: '700', color: '#919EAB' }} label="Asset Class" {...a11yProps(0)} />
          {/* <Tab sx={{ fontSize: '16px', fontWeight: '700', color: '#919EAB' }} label="Asset Child Id" {...a11yProps(1)} /> */}
          <Tab sx={{ fontSize: '16px', fontWeight: '700', color: '#919EAB' }} label="Plant" {...a11yProps(1)} />
          {/*           <Tab sx={{ fontSize: '16px', fontWeight: '700', color: '#919EAB' }} label="Location" {...a11yProps(3)} />
                    <Tab sx={{ fontSize: '16px', fontWeight: '700', color: '#919EAB' }} label="Department" {...a11yProps(4)} />
                    <Tab sx={{ fontSize: '16px', fontWeight: '700', color: '#919EAB' }} label="Business" {...a11yProps(5)} />
                    <Tab sx={{ fontSize: '16px', fontWeight: '700', color: '#919EAB' }} s label=" Employee" {...a11yProps(6)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} sx={{ width: '0px' }}>
        <AssetsClass />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={1}>
        <Masterassecttype />
      </CustomTabPanel> */}
      <CustomTabPanel value={value} index={1}>
        <Location />
      </CustomTabPanel>
      {/*       <CustomTabPanel value={value} index={3}>
                <Location />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <Department />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
                <Business />
            </CustomTabPanel> */}

      {/* <CustomTabPanel value={value} index={6}>
                <Employee />
            </CustomTabPanel> */}
    </Box>
  );
}
