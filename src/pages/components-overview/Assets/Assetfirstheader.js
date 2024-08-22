import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Assetstable from './Assetstable';
// import Retrailtable from './Retrailtable';
import Stocktable from './Stocktable';
import Scraptable from './Scraptable';

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function Assetfirstheader() {
  const [value, setValue] = React.useState(0);
  const [isRowClicked, setIsRowClicked] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRowClick = () => {
    setIsRowClicked(!isRowClicked); // Update state when a row is clicked
  };

  return (
    <Box sx={{ width: '100%' }}>
      {!isRowClicked && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="tab-ind-sty">
            <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Stock" {...a11yProps(0)} />
            {/* <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Allocated-Allocated" {...a11yProps(1)} /> */}
            {/* <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Retrial" {...a11yProps(2)} /> */}
            <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Scrap" {...a11yProps(1)} />
          </Tabs>
        </Box>
      )}
      <CustomTabPanel value={value} index={0} sx={{ width: '0px' }}>
        <Stocktable onRowClick={handleRowClick} />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={1}>
                <Assetstable onRowClick={handleRowClick} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Retrailtable onRowClick={handleRowClick} />
            </CustomTabPanel> */}
      <CustomTabPanel value={value} index={1}>
        <Scraptable onRowClick={handleRowClick} />
      </CustomTabPanel>
    </Box>
  );
}
