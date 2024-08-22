import React, { useState, useRef } from 'react';
import { Space, Table } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { useLocation } from 'react-router-dom';
import { Pagination } from 'antd';
// image
import Computeriamge from 'assets/images/users/computer.png';
import { getAllAssetStockListByPage } from 'components/redux/Assetlist/action';
import { getAllAssetClass } from 'components/redux/master/AssetClass/action';
// import { getAllAssetSubClass } from 'components/redux/master/AssetSubClass/action';
import { useDispatch, useSelector } from 'react-redux';
import MTransfer from 'assets/images/icons/transferred.png';
import MScrap from 'assets/images/icons/move_to_scrap.png';
import { Grid } from '../../../../node_modules/@mui/material/index';
import { STATUS_ASSET } from '../../../constants/constants';
//Select Dropdown
import CustomSelect from '../CustomSelect';

//import style css
import '../../../menu-items/style.css';
import TransferModal from './TransferModal';
import ScrapModal from './ScrapModal';

const AssetListint = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [pageNo, setPageNo] = useState();
	const [AssetRecord, setAssetRecord] = useState();
	const [AssetScrapRecord, setAssetScrapRecord] = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalScrapOpen, setIsModalScrapOpen] = React.useState(false);
	const [pageSize, setPageSize] = useState(10);
	const queryParams = new URLSearchParams(location.search);
	const assetClass = queryParams.get('class');
	const AllSoftware = useSelector((state) => state.AssetListData && state.AssetListData.AllAssetStockList);
	const AssetListcount = useSelector(
		(state) => state.AssetListData && state.AssetListData.AllAssetStockList && state.AssetListData.AllAssetStockList.assetsCount
	);
	const [selectedClass, setSelectedClass] = useState(assetClass || 'Choose Asset Class');
	// const [selectedSubClass, setSelectedSubClass] = useState('Choose SubClass');
	const [selectedAssetType, setSelectedAssetType] = useState('Asset Status');
	const search = useRef(false);
	const searchValue = useRef('');
	const [loading, setLoading] = useState(false);
	const { SCRAPPED, ONLINE, OFFLINE } = STATUS_ASSET;
	const All = [
		{ value: 'Online', label: 'Online' },
		{ value: 'Offline', label: 'Offline' },
		{ value: 'Scrapped', label: 'Scrapped' },
		{ value: 'Maintenance', label: 'Maintenance' }
	];

	const AssetClassDetails = useSelector((state) => state.AssetClassData && state.AssetClassData.AssetClassData);
	// const AssetSubClassDetails = useSelector((state) => state.AssetSubClassData && state.AssetSubClassData.AssetSubClass);

	const getAssetClassData = async (pagenumber, Size) => {
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			const paagereduce = pagenumber - 1;
			await dispatch(
				getAllAssetStockListByPage(
					selectedClass,
					null,
					selectedAssetType,
					paagereduce,
					Size,
					search.current,
					searchValue.current,
					signal
				)
			);
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleClassChange = async (value) => {
		setSelectedClass(value);
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			setPageNo(1);
			await dispatch(
				getAllAssetStockListByPage(value, null, selectedAssetType, 0, pageSize, search.current, searchValue.current, signal)
			);
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};
	const handleAssetTypeChange = async (value) => {
		setSelectedAssetType(value);
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			setPageNo(1);
			await dispatch(
				getAllAssetStockListByPage(selectedClass, null, value, 0, pageSize, search.current, searchValue.current, signal)
			);
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleStatusModal = (Record) => {
		setAssetRecord(Record);
		setIsModalOpen(true);
	};

	const handleScrapStatusModal = (Record) => {
		setAssetScrapRecord(Record);
		setIsModalScrapOpen(true);
	};

	// for datatable search start
	const handleSearchChange = (event) => {
		searchValue.current = event.target.value;
		if (event.target.value != '') {
			search.current = true;
		} else {
			search.current = false;
		}
		getAssetClassData(pageNo, pageSize);
	};

	// Assuming you have AllSoftware data and columns defined somewhere
	const assetList = AllSoftware?.assets || [];

	const addSerialNumbers = (data) => {
		return data.map((item, index) => {
			let paagereduce;
			if (pageNo == 0) {
				paagereduce = pageNo;
			} else {
				if (pageNo == undefined) {
					paagereduce = 0;
				} else {
					paagereduce = pageNo - 1;
				}
			}

			const numberstart = paagereduce * pageSize;
			return {
				...item,
				sno: numberstart + index + 1
			};
		});
	};

	const dataWithSerialNumbers = addSerialNumbers(assetList);

	const getpagerecord = (pageNumber, pageSize) => {
		setPageNo(pageNumber);
		setPageSize(pageSize);
		getAssetClassData(pageNumber, pageSize);
	};

	const columns = [
		{
			title: <span className="table-hd-fs">SI.No</span>,
			dataIndex: 'sno',
			key: 'sno',
			sorter: {
				compare: (a, b) => a.sno - b.sno,
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
			title: <span className="table-hd-fs">Picture</span>,

			dataIndex: 'assetId',
			key: 'assetId',
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
			title: <span className="table-hd-fs">Asset Id.</span>,
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
			sorter: (a, b) => (a.childId && b.childId ? a.childId.localeCompare(b.childId) : 0),
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) =>
				sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				)
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
				let badgeClass = '';
				switch (record.assetStatus) {
					case SCRAPPED:
						badgeClass = 'table-value-badge-danger';
						break;
					case OFFLINE:
						badgeClass = 'table-value-badge-warning';
						break;
					case ONLINE:
						badgeClass = 'table-value-badge-success';
						break;
					default:
						badgeClass = 'table-value-badge';
				}
				return <span className={badgeClass}>{record.assetStatus}</span>;
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
				compare: (a, b) => a.assetLifetime.localeCompare(b.assetLifetime),
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
			render: (_, record) => {
				return (
					<Space>
						<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
							<div
								role="button"
								className="btn-scrap-transfer"
								tabIndex="0"
								onClick={() => handleStatusModal(record, 'Replaced')}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										handleStatusModal(record, 'Replaced');
									}
								}}
							>
								<img src={MTransfer} alt="Move to Transfer" />
							</div>
						</Grid>
						<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
							<div
								role="button"
								className="btn-scrap-transfer"
								tabIndex="0"
								onClick={() => handleScrapStatusModal(record)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										handleScrapStatusModal(record);
									}
								}}
							>
								<img src={MScrap} alt="Move to Scrap" />
							</div>
						</Grid>
					</Space>
				);
			}
		}
	];

	React.useEffect(() => {
		dispatch(getAllAssetClass());
		getAssetClassData(pageNo, pageSize);
	}, [dispatch, pageNo, pageSize]);

	return (
		<>
			<Container maxWidth="xl" sx={{ height: 'auto', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
				<Toolbar disableGutters sx={{ height: '50%' }}>
					<Grid item container spacing={2} columns={16}>
						<Grid item lg={3} sm={5}>
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
								value={searchValue.current}
								onChange={handleSearchChange}
							/>
						</Grid>

						{/* 2nd col */}
						<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
							<CustomSelect
								defaultValue={assetClass || 'Asset Class'} // Set an empty default value
								style={{ width: '100%', height: '33px' }}
								// mode="multiple"
								// allowClear
								showSearch
								onChange={handleClassChange}
								options={[
									{ value: '', label: 'Asset Class' }, // Empty option
									...AssetClassDetails.map((option) => ({ value: option.assetClass, label: option.assetClass }))
								]}
							/>
						</Grid>
						{/* 3nd  col*/}
						<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
							<CustomSelect
								defaultValue="Asset Status"
								value={selectedAssetType}
								style={{ width: '100%', height: '33px' }}
								showSearch
								onChange={handleAssetTypeChange}
								options={[
									{ value: '', label: 'Asset Status' },
									...All.map((option) => ({
										value: option.value,
										label: option.label
									}))
								]}
							/>
						</Grid>
					</Grid>
				</Toolbar>
			</Container>
			{/* <Table className="table-hd" columns={columns} dataSource={AllSoftware} /> */}
			<Table
				className="table-hd"
				columns={columns}
				dataSource={dataWithSerialNumbers}
				pagination={false}
				loading={loading}
				showSorterTooltip={false}
			/>
			<div className="align-center-data">
				<Pagination
					defaultCurrent={pageNo}
					total={AssetListcount}
					current={pageNo}
					pageSize={pageSize}
					onChange={getpagerecord}
					hideOnSinglePage={true}
				/>
			</div>
			<TransferModal
				AssetData={AssetRecord}
				PageNo={pageNo}
				PageSize={pageSize}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
			<ScrapModal
				AssetData={AssetScrapRecord}
				PageNo={pageNo}
				PageSize={pageSize}
				isModalOpen={isModalScrapOpen}
				setIsModalOpen={setIsModalScrapOpen}
			/>
		</>
	);
};

export default AssetListint;
