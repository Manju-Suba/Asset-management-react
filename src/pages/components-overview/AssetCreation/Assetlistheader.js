import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllassetTicket from './AllassetTicket';
// import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { getAllAssetClass } from 'components/redux/master/AssetClass/action';

import { useDispatch, useSelector } from 'react-redux';

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`assetlist-tabpanel-${index}`}
			aria-labelledby={`assetlist-tab-${index}`}
			{...other}
		>
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
		id: `assetlist-tab-${index}`,
		'aria-controls': `assetlist-tabpanel-${index}`
	};
}

export default function Assetlistheader() {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState(0);

	const AssetClassDetails = useSelector((state) => state.AssetClassData && state.AssetClassData.AssetClassData);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	React.useEffect(() => {
		dispatch(getAllAssetClass());
	}, [dispatch]);

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="tab-ind-sty">
					<Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="All" {...a11yProps(0)} />
					{AssetClassDetails.map((assetClass, index) => (
						<Tab
							key={assetClass.assetClass}
							sx={{ fontSize: '12px', color: '#919EAB' }}
							label={assetClass.assetClass}
							{...a11yProps(index + 1)}
						/>
					))}
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0} sx={{ width: '0px' }}>
				<AllassetTicket />
			</CustomTabPanel>
		</Box>
	);
}
