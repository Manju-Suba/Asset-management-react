import React, { useState } from 'react';
import { Space, Table } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import { Select } from 'antd';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
// import EditSharpIcon from '@mui/icons-material/EditSharp';
// import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
// image
import Computeriamge from 'assets/images/users/computer.png';
import { getAssetByClass, getAllAssetList } from 'components/redux/Assetlist/action';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '../../../../node_modules/@mui/material/index';
// import Editassets from '../Assets/AssetModals/EditAssetPopup';

//import style css
import '../../../menu-items/style.css';

const AssetCateTable = ({ assetClass }) => {
	const dispatch = useDispatch();
	// const [editasset, setEditAsset] = React.useState([]);
	// const [isModalOpen, setIsModalOpen] = React.useState(false);
	const AssetListByClass = useSelector((state) => state.AssetListData && state.AssetListData.AssetByClass);
	const [selectedAssetType, setSelectedAssetType] = useState('Choose Asset Type');
	const [selectedAssetNo, setSelectedAssetNo] = useState(null);
	const [searchValue, setSearchValue] = useState('');
	const AssetIdByClass = useSelector((state) => state.AssetListData && state.AssetListData.AllAssetList);

	// const handleEditModal = (e, Record) => {
	//     setEditAsset(Record);
	//     setIsModalOpen(true);
	// };

	const handleAssetNoChange = (value) => {
		setSelectedAssetNo(value);
		dispatch(getAssetByClass(assetClass, selectedAssetType, value));
	};

	const handleAssetTypeChange = (value) => {
		setSelectedAssetType(value);
		setSelectedAssetNo(null);
		dispatch(getAssetByClass(assetClass, value, selectedAssetNo));
	};

	// for datatable search start
	const handleSearchChange = (event) => {
		setSearchValue(event.target.value);
	};

	// Assuming you have AssetListByClass data and columns defined somewhere
	const filteredData = AssetListByClass.filter((row) => {
		return Object.values(row).some((value) => {
			if (value !== null && value !== undefined) {
				return value.toString().toLowerCase().includes(searchValue.toLowerCase());
			}
			return false;
		});
	});
	// for datatable search end

	const columns = [
		{
			title: <span className="table-hd-fs">Picture </span>,

			dataIndex: 'assetId',
			key: 'assetId',
			render: () => (
				<Space size="middle">
					<img src={Computeriamge} alt={Computeriamge} style={{ width: '30px' }} />
				</Space>
			)
		},
		{
			dataIndex: 'assetId',
			key: 'assetId',
			title: (
				<span className="table-hd-fs">
					Asset Id.
				</span>
			)
		},
		{
			title: <span className="table-hd-fs">Asset Status</span>,
			dataIndex: 'assetStatus',
			key: 'assetStatus',
			render: (_, record) => {
				return <span className="table-value-badge">{record.assetStatus}</span>;
			}
		},
		{
			title: <span className="table-hd-fs">Asset Life Time</span>,
			dataIndex: 'assetLifetime',
			key: 'assetLifetime'
		},
		{
			title: <span className="table-hd-fs">Cost Of Asset</span>,
			dataIndex: 'costOfAsset',
			key: 'costOfAsset'
		}
		// {
		//     title: (
		//         <span className="table-hd-fs">
		//             Action
		//         </span>
		//     ),

		//     key: 'action',
		//     render: (_, record) => (
		//         <Space>
		//             <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
		//                 <EditSharpIcon sx={{ fontSize: '16px' }} onClick={(e) => handleEditModal(e, record)} />
		//             </Grid>

		//             <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
		//                 <DeleteIcon sx={{ fontSize: '16px' }} />
		//             </Grid>
		//         </Space>
		//     )
		// }
	];

	React.useEffect(() => {
		dispatch(getAllAssetList(assetClass, selectedAssetType));
		dispatch(getAssetByClass(assetClass, selectedAssetType, selectedAssetNo));
	}, [dispatch]);

	return (
		<>
			<Container maxWidth="xl" sx={{ height: '100%', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
				<Toolbar disableGutters sx={{ height: '50%' }}>
					<Grid item container spacing={2} columns={16}>
						{/* 1st col */}
						<Grid item lg={2} sm={4}>
							{/* search box */}
							<TextField
								name="asset"
								type={'text'}
								placeholder="search "
								sx={{ border: 'none' }}
								InputProps={{
									style: { width: '100%', height: '33px', color: '#C7C7C7', bgcolor: '#FBFBFB' },
									startAdornment: (
										<IconButton aria-label="Toggle password visibility" edge="start">
											<SearchSharpIcon sx={{ color: '#C7C7C7', fontSize: '18px', fontWeight: '700' }} />
										</IconButton>
									)
								}}
								value={searchValue}
								onChange={handleSearchChange}
							/>
						</Grid>
						{/* 3nd  col*/}
						<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
							<Select defaultValue="Asset Status" style={{ width: '100%', height: '33px' }} onChange={handleAssetTypeChange}>
								<Select.Option value="">Select</Select.Option>
								<Select.Option value="Online">Online</Select.Option>
								<Select.Option value="Offline">Offline</Select.Option>
							</Select>
						</Grid>

						{/* 2nd col */}
						<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
							<Select
								defaultValue="Asset No"
								style={{ width: '100%', height: '33px' }}
								onChange={handleAssetNoChange}
								options={[
									{ value: '', label: 'Select' }, // Empty option
									...AssetIdByClass.map((option) => ({ value: option.assetId, label: option.assetId }))
								]}
							/>
						</Grid>
						{/* 4th col */}
						{/* 5th col */}

						<Grid item lg={6} sm={4}></Grid>
					</Grid>
				</Toolbar>
			</Container>
			<Table className="table-hd" columns={columns} dataSource={filteredData} showSorterTooltip={false} />
			{/* <Editassets AssetData={editasset} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}
		</>
	);
};

export default AssetCateTable;
