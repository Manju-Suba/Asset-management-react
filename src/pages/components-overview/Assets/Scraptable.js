import React, { useState, useRef } from 'react';
import { Space, Table, Popover } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
// import { Select } from 'antd';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Grid } from '../../../../node_modules/@mui/material/index';
import { Pagination } from 'antd';
// import EditSharpIcon from '@mui/icons-material/EditSharp';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DriveFileMoveSharpIcon from '@mui/icons-material/DriveFileMoveSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { Button } from '../../../../node_modules/@mui/material/index';
// import { API_BASE_URL } from '../../../constants/constants';
//Select Dropdown
import CustomSelect from '../CustomSelect';
// image
import Computeriamge from 'assets/images/users/computer.png';
import ViewAsset from './ViewAsset/ViewAsset';
import { getStockAndScrap } from 'components/redux/asset/action';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { getAllAssetSubClass } from 'components/redux/master/AssetSubClass/action';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Scraptable = ({ onRowClick }) => {
	const dispatch = useDispatch();
	const [selectedAsset, setSelectedAsset] = useState(null);
	const [selectedCategory, setSelectedCategory] = React.useState('Choose Asset Class');
	// const [selectedSubClass, setSelectedSubClass] = useState('Choose SubClass');
	// const [selectedAssetType, setSelectedAssetType] = React.useState(null);
	const [pageNo, setPageNo] = useState();
	const [pageSize, setPageSize] = useState(10);
	const [loading, setLoading] = useState(false);
	const search = useRef(false);
	const searchValue = useRef('');
	// const All = [
	//   { value: 'Online', label: 'Online' },
	//   { value: 'Offline', label: 'Offline' },
	//   // { value: 'Scrap', label: 'Scrapped' },
	//   { value: 'Maintenance', label: 'Maintenance' }
	// ];

	const AssetList = useSelector((state) => state.AssetData && state.AssetData.AssetScrapStock);
	const AssetListcount = useSelector(
		(state) => state.AssetData && state.AssetData.AssetScrapStock && state.AssetData.AssetScrapStock.assetsCount
	);
	const AssetClassDetails = useSelector((state) => state.AssetClassData && state.AssetClassData.AssetClassData);
	// const AssetSubClassDetails = useSelector((state) => state.AssetSubClassData && state.AssetSubClassData.AssetSubClass);
	const [positionGeoRef, setPositionGeoRef] = useState({ latitude: null, longitude: null });

	const handleCategoryChange = async (value) => {
		// setSelectedAssetType(selectedAssetType);
		setSelectedCategory(value);
		dispatch(getAllAssetSubClass(value));
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			await dispatch(getStockAndScrap('Disposed', value, null, null, pageNo, pageSize, search.current, searchValue.current, signal));
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	// const handleSubClassChange = async (value) => {
	//   setSelectedSubClass(value);
	//   setLoading(true);
	//   try {
	//     const controller = new AbortController();
	//     const signal = controller.signal;
	//     await dispatch(
	//       getStockAndScrap(
	//         'Disposed',
	//         selectedCategory,
	//         value,
	//         selectedAssetType,
	//         pageNo,
	//         pageSize,
	//         search.current,
	//         searchValue.current,
	//         signal
	//       )
	//     );
	//   } catch (error) {
	//     setLoading(false);
	//     console.error('Error fetching data:', error);
	//   } finally {
	//     setLoading(false);
	//   }
	// };

	const getAssetAllocationData = async (pagenumber, Size) => {
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			const paagereduce = pagenumber - 1;
			await dispatch(
				getStockAndScrap('Disposed', selectedCategory, null, null, paagereduce, Size, search.current, searchValue.current, signal)
			);
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSearchChange = (event) => {
		searchValue.current = event.target.value;
		if (event.target.value != '') {
			search.current = true;
		} else {
			search.current = false;
		}
		getAssetAllocationData(pageNo, pageSize);
	};

	const fetchGeoLocation = () => {
		if (!('geolocation' in navigator)) {
			console.log('Geolocation is not available in your browser.');
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setPositionGeoRef({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
			},
			(error) => {
				if (error.code === error.PERMISSION_DENIED) {
					toast.error('Please give access for location.');
				} else {
					console.error('Error getting geolocation:', error.message);
				}
			}
		);
	};

	// const handleAssetTypeChange = async (value) => {
	//   setSelectedAssetType(value);
	//   // dispatch(getAllAssetStockDetails(selectedCategory, value));
	//   try {
	//     const controller = new AbortController();
	//     const signal = controller.signal;
	//     await dispatch(
	//       getStockAndScrap('Stock', selectedCategory, null, value, pageNo, pageSize, search.current, searchValue.current, signal)
	//     );
	//   } catch (error) {
	//     setLoading(false);
	//     console.error('Error fetching data:', error);
	//   } finally {
	//     setLoading(false);
	//   }
	// };

	const columns = [
		{
			title: <span className="table-hd-fs">Picture </span>,

			dataIndex: 'picture',
			key: 'picture',
			render: (_, record) => {
				if (record.pictureWithPath) {
					return (
						<Space size="middle">
							<img src={record.pictureWithPath} alt={'Previous'} style={{ width: '30px', height: '27px' }} />
						</Space>
					);
				} else {
					return (
						<Space size="middle">
							<img src={Computeriamge} alt={Computeriamge} style={{ width: '30px', height: '27px' }} />
						</Space>
					);
				}
			}
		},
		{
			dataIndex: 'assetId',
			key: 'assetId',
			title: <span className="table-hd-fs">Asset Id</span>,
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
			dataIndex: 'childId',
			key: 'childId',
			title: <span className="table-hd-fs">Child Id</span>,
			sorter: {
				compare: (a, b) => a.childId.localeCompare(b.childId),
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
			title: <span className="table-hd-fs">Asset Class</span>,
			dataIndex: 'assetClass',
			key: 'assetClass',
			sorter: {
				compare: (a, b) => a.assetClass.localeCompare(b.assetClass),
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
			title: <span className="table-hd-fs">Asset Description</span>,

			dataIndex: 'description',
			key: 'description',
			sorter: {
				compare: (a, b) => a.description.localeCompare(b.description),
				multiple: 1
			},
			render: (_, record) => {
				return (
					<Popover content={record.description} title="Asset Description" trigger={record.description.length > 10 ? `hover` : ''}>
						{record.description.length > 10 ? `${record.description.slice(0, 10)}...` : record.description}
					</Popover>
				);
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
			title: <span className="table-hd-fs">Asset Status</span>,

			dataIndex: 'assetStatus',
			key: 'assetStatus',
			render: (_, record) => {
				return (
					<Button className="btn-status-rejected" color="error">
						{record.assetStatus}
					</Button>
				);
			},
			sorter: {
				compare: (a, b) => a.assetStatus.localeCompare(b.assetStatus),
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
			title: <span className="table-hd-fs">Asset Life Time</span>,
			dataIndex: 'assetLifetime',
			key: 'assetLifetime',
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
			title: <span className="table-hd-fs">Cost Of Asset</span>,

			dataIndex: 'costOfAsset',
			key: 'costOfAsset',
			sorter: {
				compare: (a, b) => a.costOfAsset.localeCompare(b.costOfAsset),
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
			title: <span className="table-hd-fs">Action</span>,

			key: 'action',
			render: () => (
				<Space>
					{/* <Grid item sx={{ color: '#A5A1A1', fontSize: '1px' }}>
                        <CheckCircleRoundedIcon sx={{ fontSize: '16px' }} />
                    </Grid> */}
					<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
						<RemoveRedEyeIcon sx={{ fontSize: '16px' }} />
					</Grid>

					{/* <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
                        <DeleteIcon sx={{ fontSize: '16px' }} />
                    </Grid>
                    <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
                        <DriveFileMoveSharpIcon sx={{ fontSize: '16px' }} />
                    </Grid> */}
				</Space>
			)
		}
	];

	const handleRowClick = (record) => {
		setSelectedAsset(record);
		onRowClick();
	};

	React.useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		dispatch(getAllAssetCategoryDetails(signal));
		fetchGeoLocation();
		getAssetAllocationData(pageNo, pageSize);
	}, [dispatch]);

	const assetList = AssetList?.assets || [];

	const getpagerecord = (pageNumber, pageSize) => {
		setPageNo(pageNumber);
		setPageSize(pageSize);
		getAssetAllocationData(pageNumber, pageSize);
	};

	return (
		<>
			{selectedAsset ? (
				<ViewAsset
					onRowClick={handleRowClick}
					selectedData={selectedAsset}
					positionGeo={positionGeoRef}
					selectedCategory={selectedCategory}
					selectedAssetType={null}
					table={'Disposed'}
					pageNo={pageNo}
				/>
			) : (
				<>
					<Container maxWidth="xl" sx={{ height: '100%', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
						<Toolbar disableGutters sx={{ height: '50%' }}>
							<Grid item container spacing={2} columns={16}>
								{/* 1st col */}
								<Grid item lg={3} sm={5}>
									{/* search box */}
									<TextField
										name="asset"
										type={'text'}
										placeholder="search "
										className="search-input-bg"
										sx={{ border: 'none' }}
										InputProps={{
											style: { width: '100%', height: '33px', color: '#C7C7C7', bgcolor: '#FBFBFB' },
											startAdornment: (
												<IconButton aria-label="Toggle password visibility" edge="start">
													<SearchSharpIcon sx={{ color: '#C7C7C7', fontSize: '18px', fontWeight: '700' }} />
												</IconButton>
											)
										}}
										value={searchValue.current}
										onChange={handleSearchChange}
									/>
								</Grid>

								{/* 2nd col */}
								<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
									<CustomSelect
										defaultValue="Asset Class"
										style={{ width: '100%', height: '33px' }}
										showSearch
										onChange={handleCategoryChange}
										options={[
											{ value: 'Choose Asset Class', label: 'Asset Class' },
											...AssetClassDetails.map((option) => ({ value: option.assetClass, label: option.assetClass }))
										]}
									/>
								</Grid>
								{/* <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
                  <CustomSelect
                    defaultValue={selectedSubClass || 'Choose SubClass'}
                    style={{ width: '100%', height: '33px' }}
                    showSearch
                    onChange={handleSubClassChange}
                    options={[
                      { value: '', label: 'Choose SubClass' },
                      ...AssetSubClassDetails.map((option) => ({
                        value: option.subClass,
                        label: option.subClass
                      }))
                    ]}
                  />
                </Grid> */}
								<Grid item lg={2} sm={4} className="select-ant-cus">
									{/* <CustomSelect
                    defaultValue="Asset Status"
                    style={{ width: '100%', height: '33px' }}
                    showSearch
                    onChange={handleAssetTypeChange}
                    options={[
                      { value: null, label: 'Asset type' },
                      ...All.map((option) => ({
                        value: option.value,
                        label: option.label
                      }))
                    ]}
                  /> */}
								</Grid>
							</Grid>
						</Toolbar>
					</Container>
					<Table
						className="table-hd"
						columns={columns}
						dataSource={assetList}
						pagination={false}
						loading={loading}
						showSorterTooltip={false}
						onRow={(record) => {
							return {
								onClick: () => handleRowClick(record)
							};
						}}
					/>
					<div className="align-center-data">
						<Pagination
							defaultCurrent={pageNo}
							total={AssetListcount}
							pageSize={pageSize}
							onChange={getpagerecord}
							hideOnSinglePage={true}
						/>
					</div>
				</>
			)}
		</>
	);
};

export default Scraptable;
