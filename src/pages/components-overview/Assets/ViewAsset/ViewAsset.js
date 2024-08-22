import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssetDetail from './AssetDetails';
import { Grid } from '../../../../../node_modules/@mui/material/index';
import AuditLogDetails from './AuditLogDetails';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { Space } from 'antd';
import TransferList from 'pages/components-overview/AssetTransfer/TransferList';
import MaintenanceList from './MaintenanceList';
import { useDispatch } from 'react-redux';
import { getStockAndScrap } from 'components/redux/asset/action';
import { getAllAssetListByPage } from 'components/redux/Assetlist/action';
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

export default function ViewAsset({ onRowClick, selectedData, positionGeo, selectedCategory, selectedAssetType, table, pageNo }) {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState(0);
	const [view, setView] = React.useState(false);
	const [isEditable, setIsEditable] = React.useState(true);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleBackButtonClick = () => {
		const controller = new AbortController();
		const signal = controller.signal;
		dispatch(getAllAssetListByPage(selectedCategory, null, selectedAssetType, pageNo - 1, 10, false, '', signal));
		dispatch(getStockAndScrap(table, selectedCategory, selectedAssetType, '', pageNo - 1, 10, false, ''));
		onRowClick();
	};
	const handleEditAction = () => {
		setView(true);
		setIsEditable(false);
	};
	const handleViewAction = () => {
		setView(false);
		setIsEditable(true);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box className="tob-cen">
				<Grid container alignItems="center" justifyContent="space-between">
					<Grid item>
						<ArrowBackIcon className="arrow-back" onClick={handleBackButtonClick} />
					</Grid>
					<Grid item>
						<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
							<Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Asset Details" {...a11yProps(0)} />
							<Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Audit Log Details" {...a11yProps(1)} />
							<Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Transfer Details" {...a11yProps(2)} />
							<Tab sx={{ fontSize: '12px', color: '#919EAB' }} label="Maintenance Details" {...a11yProps(3)} />
						</Tabs>
					</Grid>
					<Grid item>
						{value === 0 && (
							<Grid sx={{ fontSize: '12px', color: '#919EAB' }}>
								{view ? (
									<React.Fragment>
										<Space>
											<Button variant="text" sx={{ color: '#919EAB' }} onClick={handleViewAction}>
												<Typography>Cancel</Typography>
											</Button>
										</Space>
									</React.Fragment>
								) : (
									<React.Fragment>
										<Button variant="text" sx={{ color: '#919EAB' }} onClick={handleEditAction}>
											<Typography>
												<EditIcon sx={{ fontSize: '14px', color: '#919EAB' }} /> Edit
											</Typography>
										</Button>
									</React.Fragment>
								)}
							</Grid>
						)}
					</Grid>
				</Grid>
			</Box>
			<CustomTabPanel value={value} index={0} sx={{ width: '0px' }}>
				<AssetDetail
					selectedAsset={selectedData}
					geoLocation={positionGeo}
					editAble={isEditable}
					handleViewAction={handleViewAction}
					selectedCategory={selectedCategory}
					selectedAssetType={selectedAssetType}
					tableRefresh={table}
				/>
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<AuditLogDetails selectedAsset={selectedData.id} AssetId={selectedData.assetId} />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={2}>
				<TransferList selectedAsset={selectedData} />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={3}>
				<MaintenanceList selectedAsset={selectedData} />
			</CustomTabPanel>
			{/* <CustomTabPanel value={value} index={2}></CustomTabPanel> */}
		</Box>
	);
}
