import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid } from '../../../../node_modules/@mui/material/index';
import AssetDetails from './AssetDetails';

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

export default function ViewAssetAudit({ onRowClick, selectedData ,geoLocation}) {
	const handleBackButtonClick = () => {
		onRowClick();
	};
	
	return (
		<Box sx={{ width: '100%' }}>
			<Box className="tob-cen">
				<Grid container alignItems="center" justifyContent="space-between">
					<Grid item xs={16} sm={16} md={16} lg={16}>
						<ArrowBackIcon className="arrow-back" onClick={handleBackButtonClick} />
					</Grid>
					<Grid item>
						<AssetDetails selectedAsset={selectedData} geoLocation={geoLocation} />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
