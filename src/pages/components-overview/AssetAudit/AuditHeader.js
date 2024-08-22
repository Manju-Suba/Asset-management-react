import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AuditCompleted from './AuditCompleted';
import AuditPending from './AuditPending';
import RequestList from './RequestList';
import ClassChecklist from './ClassChecklist';

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

export default function AuditHeader() {
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
            <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Pending" {...a11yProps(0)} />
            <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Completed" {...a11yProps(1)} />
            <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Pending from Auditor" {...a11yProps(2)} />
            <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Class Checklist" {...a11yProps(3)} />
          </Tabs>
        </Box>
      )}
      <CustomTabPanel value={value} index={0} sx={{ width: '0px' }}>
        <AuditPending />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AuditCompleted onRowClick={handleRowClick} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} sx={{ width: '0px' }}>
        <RequestList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ClassChecklist onRowClick={handleRowClick} />
      </CustomTabPanel>
    </Box>
  );
}
