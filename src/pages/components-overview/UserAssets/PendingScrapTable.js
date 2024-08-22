import React, { useState, useRef } from 'react';
import { Space, Table } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Grid } from '../../../../node_modules/@mui/material/index';
import { Pagination } from 'antd';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { Button } from '../../../../node_modules/@mui/material/index';
// import { API_BASE_URL } from '../../../constants/constants';
//Select Dropdown
import CustomSelect from '../CustomSelect';
// image
import Computeriamge from 'assets/images/users/computer.png';
import { getDisposalPendingRequest } from 'components/redux/DisposalAsset/action';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { getAllAssetSubClass } from 'components/redux/master/AssetSubClass/action';
import { useDispatch, useSelector } from 'react-redux';

const PendingScrapTable = ({ onRowClick }) => {
	const dispatch = useDispatch();
	const [selectedCategory, setSelectedCategory] = React.useState('Choose Asset Class');
	const [selectedAssetType, setSelectedAssetType] = React.useState(null);
	const [pageNo, setPageNo] = useState();
	const [pageSize, setPageSize] = useState(10);
	const [loading, setLoading] = useState(false);
	const search = useRef(false);
	const searchValue = useRef('');
	const StatusOption = 'Waiting';
	const AssetList = useSelector((state) => state.DisposalAssetData && state.DisposalAssetData.DisposalPendingRequest);
	const AssetListcount = useSelector(
		(state) =>
			state.DisposalAssetData &&
			state.DisposalAssetData.DisposalPendingRequest &&
			state.DisposalAssetData.DisposalPendingRequest.pendingRequestCounts
	);
	const AssetClassDetails = useSelector((state) => state.AssetCateData && state.AssetCateData.AssetCategoryData);
	const handleCategoryChange = async (value) => {
		setSelectedAssetType(selectedAssetType);
		setSelectedCategory(value);
		dispatch(getAllAssetSubClass(value));
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			await dispatch(
				getDisposalPendingRequest(
					StatusOption,
					value,
					"Choose SubClass",
					selectedAssetType,
					pageNo,
					pageSize,
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


	const handleSearchChange = (event) => {
		searchValue.current = event.target.value;
		if (event.target.value != '') {
			search.current = true;
		} else {
			search.current = false;
		}
		getAssetAllocationData(pageNo, pageSize);
	};

	const getAssetAllocationData = async (pagenumber, Size) => {
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			const paagereduce = pagenumber - 1;
			await dispatch(
				getDisposalPendingRequest(
					StatusOption,
					selectedCategory,
					"Choose SubClass",
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

	const columns = [
		{
			title: <span className="table-hd-fs">Picture</span>,

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
			title: <span className="table-hd-fs">Plant</span>,

			key: 'plant',
			dataIndex: 'plant',
			sorter: {
				compare: (a, b) => a.plant.localeCompare(b.plant),
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
			title: <span className="table-hd-fs">Status</span>,

			dataIndex: 'assetStatus',
			key: 'assetStatus',
			render: () => {
				return <Button className="btn-status-pending">{'Pending from Admin'}</Button>;
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
		getAssetAllocationData(pageNo, pageSize);
	}, [dispatch]);

	const assetList = AssetList?.waitingAssets || [];
	const getpagerecord = (pageNumber, pageSize) => {
		setPageNo(pageNumber);
		setPageSize(pageSize);
		getAssetAllocationData(pageNumber, pageSize);
	};

	return (
		<>
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
										{ value: '', label: 'Select' },
										...AssetClassDetails.map((option) => ({ value: option.assetClass, label: option.assetClass }))
									]}
								/>
							</Grid>
							<Grid item lg={6} sm={4}></Grid>
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
		</>
	);
};

export default PendingScrapTable;
