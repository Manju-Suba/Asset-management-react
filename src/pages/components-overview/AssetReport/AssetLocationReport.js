import React, { useState } from 'react';
import { Space, Table } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import { Select } from 'antd';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
// image
import Computeriamge from 'assets/images/users/computer.png';
import { getAssetByLocation } from 'components/redux/AssetReport/action';
import { getAllLocationDetails } from 'components/redux/master/Location/action';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '../../../../node_modules/@mui/material/index';

const AssetLocationReport = () => {
	const dispatch = useDispatch();
	const AssetbyLocation = useSelector((state) => state.AssetReportData && state.AssetReportData.AssetByLocation);
	const [selectedLocation, setSelectedLocation] = useState(null);

	const locationData = useSelector((state) => state.LocationData && state.LocationData.LocationList);

	const handleLocationChange = (value) => {
		setSelectedLocation(value);
		dispatch(getAssetByLocation(value));
	};

	const columns = [
		{
			title: <span className="table-hd-fs">Picture </span>,

			dataIndex: 'name',
			key: 'name',
			render: () => (
				<Space size="middle">
					<img src={Computeriamge} alt={Computeriamge} style={{ width: '30px' }} />
				</Space>
			)
		},
		{
			dataIndex: 'assetId',
			key: 'assetId',
			title: <span className="table-hd-fs">Asset tag </span>,
			sorter: {
				compare: (a, b) => a.assetId.localeCompare(b.assetId),
				multiple: 1
			},
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) => {
				return sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				);
			}
		},
		{
			title: <span className="table-hd-fs">Name</span>,
			dataIndex: 'assetCategory',
			key: 'assetCategory',
			render: (_, record) => record.name || '',
			sorter: {
				compare: (a, b) => a.assetCategory.localeCompare(b.assetCategory),
				multiple: 1
			},
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) => {
				return sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				);
			}
		},
		{
			title: <span className="table-hd-fs">Type</span>,

			dataIndex: 'type',
			key: 'type',
			render: (_, record) => record.assetType?.name || '',
			sorter: {
				compare: (a, b) => a.type.localeCompare(b.type),
				multiple: 1
			},
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) => {
				return sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				);
			}
		},
		{
			title: <span className="table-hd-fs">Brand</span>,

			dataIndex: 'brand',
			key: 'brand',
			render: (_, record) => record.brand?.name || '',
			sorter: {
				compare: (a, b) => a.brand.localeCompare(b.brand),
				multiple: 1
			},
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) => {
				return sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				);
			}
		},
		{
			title: <span className="table-hd-fs">Location</span>,

			dataIndex: 'location',
			key: 'location',
			render: (_, record) => record.location?.name || '',
			sorter: {
				compare: (a, b) => a.location.localeCompare(b.location),
				multiple: 1
			},
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) => {
				return sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				);
			}
		}
	];

	React.useEffect(() => {
		dispatch(getAllLocationDetails());
		dispatch(getAssetByLocation(selectedLocation));
	}, [dispatch]);

	return (
		<>
			<Container maxWidth="xl" sx={{ height: '100%', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
				<Toolbar
					disableGutters
					sx={{
						height: '50%',
						pl: { sm: 2 },
						pr: { xs: 1, sm: 1 }
					}}
				>
					<Grid container spacing={2} columns={16}>
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
							/>
						</Grid>

						{/* 2nd col */}
						<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
							<Select
								defaultValue="Location"
								style={{ width: '100%', height: '33px' }}
								showSearch
								onChange={handleLocationChange}
								options={locationData.map((option) => ({
									value: option.id,
									label: option.name
								}))}
							/>
						</Grid>
						{/* 3nd  col*/}
						<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus"></Grid>
						{/* 4th col */}
						{/* 5th col */}

						<Grid item lg={6} sm={4}></Grid>
					</Grid>
				</Toolbar>
			</Container>
			<Table className="table-hd" columns={columns} dataSource={AssetbyLocation} />
		</>
	);
};

export default AssetLocationReport;
