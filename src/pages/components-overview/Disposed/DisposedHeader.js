import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

import CloseToDispose from './CloseToDispose';
import DisposalPendingRequest from './DisposalPendingRequest';
import ReplacedAsset from './ReplacedAsset';
import RenewedAsset from './RenewedAsset';
import DisposedAsset from './DisposedAsset';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`transfer-tabpanel-${index}`}
            aria-labelledby={`transfer-tab-${index}`}
            {...other}
        >
            {value === index && <Typography>{children}</Typography>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `transfer-tab-${index}`,
        'aria-controls': `transfer-tabpanel-${index}`
    };
}

export default function DisposedHeader() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="tab-ind-sty">
                    <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Close To Disposed" {...a11yProps(0)} />
                    <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Pending Request" {...a11yProps(1)} />
                    <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Replaced" {...a11yProps(2)} />
                    <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Renewed" {...a11yProps(3)} />
                    <Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Disposed" {...a11yProps(4)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0} sx={{ width: '0px' }}>
                <CloseToDispose />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <DisposalPendingRequest />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <ReplacedAsset />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <RenewedAsset />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <DisposedAsset />
            </CustomTabPanel>
        </Box>
    );
}
