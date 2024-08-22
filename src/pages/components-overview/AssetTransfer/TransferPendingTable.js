import React, { useState, useRef } from 'react';
import { Space, Table, Checkbox } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import { Pagination } from 'antd';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
// image
import Computeriamge from 'assets/images/users/computer.png';
import { getAssetTransferByStatus, assetTransferUpdate, multiAssetTransferUpdate } from 'components/redux/assetTransfer/action';
import { getAllAssetClass } from 'components/redux/master/AssetClass/action';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '../../../../node_modules/@mui/material/index';
import { toast } from 'react-toastify';
// import { API_BASE_URL } from '../../../constants/constants';
//Select Dropdown
import CustomSelect from '../CustomSelect';

const TransferPendingTable = () => {
	const dispatch = useDispatch();
	const [selectAll, setSelectAll] = React.useState(false);
	const [selectedRows, setSelectedRows] = React.useState([]);
	const [selectedClass, setSelectedClass] = useState('Choose Asset Class');
	const [selectedAssetType, setSelectedAssetType] = useState('Asset Status');
	const [pageSize, setPageSize] = useState(10);
	const [pageNo, setPageNo] = useState();
	const [loading, setLoading] = useState(false);
	const search = useRef(false);
	const searchValue = useRef('');

	const AssetTransfer = useSelector((state) => state.AssetTransferData && state.AssetTransferData.AssetTransferStatus);
	const transferTotalCount = useSelector(
		(state) =>
			state.AssetTransferData &&
			state.AssetTransferData.AssetTransferStatus &&
			state.AssetTransferData.AssetTransferStatus.transferDetailsCount
	);
	const AssetClassDetails = useSelector((state) => state.AssetClassData && state.AssetClassData.AssetClassData);
	const status = 'Pending';
	const All = [
		{ value: 'Online', label: 'Online' },
		{ value: 'Offline', label: 'Offline' },
		{ value: 'Scrapped', label: 'Scrapped' },
		{ value: 'Maintenance', label: 'Maintenance' }
	];
	// for datatable search start
	const handleSearchChange = (event) => {
		searchValue.current = event.target.value;
		if (event.target.value != '') {
			search.current = true;
		} else {
			search.current = false;
		}
		getTransferPendingData(pageNo, pageSize, status, selectedClass, selectedAssetType, '');
	};

	const getTransferPendingData = async (pagenumber, Size, AssetStatus, AssetClass, assetType, subclass) => {
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			const paagereduce = pagenumber - 1;
			await dispatch(
				getAssetTransferByStatus(
					AssetStatus,
					AssetClass,
					assetType,
					subclass,
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

	const handleClassChange = (value) => {
		setSelectedClass(value);
		getTransferPendingData(pageNo, pageSize, status, value, 'Asset Status', '');
	};

	const handleAssetTypeChange = (value) => {
		setSelectedAssetType(value);
		getTransferPendingData(pageNo, pageSize, status, selectedClass, value, '');
	};

	const handleSelectAllChange = (e) => {
		const updatedSelectAll = e.target.checked;
		setSelectAll(updatedSelectAll);
		const updatedSelectedRows = updatedSelectAll ? [...AssetTransfer] : [];
		setSelectedRows(updatedSelectedRows);
	};

	const handleCheckboxChange = (e, record) => {
		const updatedSelectedRows = [...selectedRows];

		if (e.target.checked) {
			updatedSelectedRows.push(record);
		} else {
			const index = updatedSelectedRows.findIndex((row) => row.id === record.id);
			if (index !== -1) {
				updatedSelectedRows.splice(index, 1);
			}
		}

		setSelectedRows(updatedSelectedRows);
		setSelectAll(updatedSelectedRows.length === AssetTransfer.length);
	};

	const updatestatus = (id, assetId, status) => {
		try {
			dispatch(assetTransferUpdate(id, assetId, status))
				.then((response) => {
					toast.success(response.data.message);
					let pstatus = 'Pending';
					// pageReduce = pageNo ==0?0:pageNo - 1;
					// console.log("approve",pageNo);
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
					dispatch(getAssetTransferByStatus(pstatus, '', '', '', paagereduce, pageSize));
					if (Array.isArray(AssetTransfer.transferDetailDto) && AssetTransfer.transferDetailDto.length === 1 && pageNo > 1) {
						setPageNo(pageNo - 1);
					}
					setSelectAll(false);
				})
				.catch((error) => {
					toast.error(error.response.data.message);
				});
		} catch (error) {
			toast.error('Validation error', errorInfo);
		}
	};

	const updateMultiRecordStatus = (selectedRows, status) => {
		const selectedRowIds = selectedRows.map((row) => row.id);
		try {
			dispatch(multiAssetTransferUpdate(selectedRowIds, status))
				.then((response) => {
					toast.success(response.data.message);
					let pstatus = 'Pending';
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
					dispatch(getAssetTransferByStatus(pstatus, '', '', '', paagereduce, pageSize));
					setSelectAll(false);
					setSelectedRows([]);
				})
				.catch((error) => {
					toast.error(error.response.data.message);
				});
		} catch (error) {
			toast.error('Validation error', errorInfo);
		}
	};

	const addSerialNumbers = (data) => {
		return data.map((item, index) => {
			return {
				...item,
				sno: index + 1 // Generating serial number starting from 1
			};
		});
	};
	const assetList = AssetTransfer?.transferDetails || [];
	const dataWithSerialNumbers = addSerialNumbers(assetList);

	const columns = [
		{
			title: <Checkbox onChange={handleSelectAllChange} checked={selectAll} />,
			dataIndex: 'checkbox',
			key: 'checkbox',
			render: (_, record) => (
				<Checkbox
					key={record.key}
					onChange={(e) => handleCheckboxChange(e, record)}
					checked={selectedRows.some((row) => row.id === record.id)}

					//   checked={record.checked}
				/>
			)
		},
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
			title: <span className="table-hd-fs">Asset Id</span>,
			dataIndex: 'assetId',
			key: 'assetId',
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

			dataIndex: 'fromPlant',
			key: 'fromPlant',
			sorter: {
				compare: (a, b) => a.fromPlant.localeCompare(b.fromPlant),
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
			title: <span className="table-hd-fs">To Plant</span>,
			dataIndex: 'toPlant',
			key: 'toPlant',
			sorter: {
				compare: (a, b) => a.toPlant.localeCompare(b.toPlant),
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

			dataIndex: 'status',
			key: 'status',
			render: (_, record) => {
				return <span className="table-value-badge-warning">{record.status || 'Pending'}</span>;
			},
			sorter: {
				compare: (a, b) => a.status.localeCompare(b.status),
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
			title: <span className="table-hd-fs">Picture </span>,

			dataIndex: 'picture',
			key: 'picture',
			render: (_, record) => {
				if (record.pictureWithPath) {
					return (
						<Space size="middle">
							<img src={ record.pictureWithPath} alt={'Previous'} style={{ width: '30px' }} />
						</Space>
					);
				} else {
					return (
						<Space size="middle">
							<img src={Computeriamge} alt={Computeriamge} style={{ width: '30px' }} />
						</Space>
					);
				}
			}
		},
		{
			title: <span className="table-hd-fs">Action</span>,

			key: 'action',
			render: (_, record) => (
				<Space>
					<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
						<Button
							color="success"
							size="small"
							className="w-unset btn-approve"
							onClick={() => updatestatus(record.id, record.assetId, 'Approved')}
							data-id={record.id}
							disabled={selectedRows.some((row) => row.id === record.id)}
						>
							<CheckIcon sx={{ fontSize: '16px' }} />
						</Button>
					</Grid>
					<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
						<Button
							color="error"
							size="small"
							className="w-unset btn-reject"
							onClick={() => updatestatus(record.id, record.assetId, 'Rejected')}
							data-id={record.id}
							disabled={selectedRows.some((row) => row.id === record.id)}
						>
							<ClearIcon sx={{ fontSize: '16px' }} />
						</Button>
					</Grid>
					{/* <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
                        <MoreVertIcon className="cursor-pointer" sx={{ fontSize: '16px' }} />
                    </Grid> */}
				</Space>
			)
		}
	];

	React.useEffect(() => {
		getTransferPendingData(pageNo, pageSize, status, selectedClass, selectedAssetType, '');
		dispatch(getAllAssetClass());
	}, [dispatch, pageNo, pageSize, selectedAssetType, selectedClass]);

	const getpagerecord = (pageNumber, pageSize) => {
		setPageNo(pageNumber);
		setPageSize(pageSize);
		getTransferPendingData(pageNumber, pageSize);
		// You can perform any action you want with the clicked page number
	};
	return (
		<>
			<Container maxWidth="xl" sx={{ height: '100%', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
				<Toolbar
					disableGutters
					sx={{
						height: '50%',
						pl: { sm: 2 },
						pr: { xs: 1, sm: 1 },
						...(selectedRows.length > 0 && {
							bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
						})
					}}
				>
					{selectedRows.length > 0 ? (
						<Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
							{selectedRows.length} selected
						</Typography>
					) : (
						<Grid container spacing={2} columns={16}>
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
									onChange={handleClassChange}
									options={[
										{ value: '', label: 'Asset Class' },
										...AssetClassDetails.map((option) => ({
											value: option.assetClass,
											label: option.assetClass
										}))
									]}
								/>
							</Grid>
							{/* 3nd  col*/}
							<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
								<CustomSelect
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
							<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus"></Grid>
							<Grid item lg={6} sm={4}></Grid>
						</Grid>
					)}

					{selectedRows.length > 0 && (
						<Tooltip>
							<Space>
								<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
									<Button
										title="Approve"
										color="success"
										size="small"
										onClick={() => updateMultiRecordStatus(selectedRows, 'Approved')}
										className="w-unset btn-approve"
									>
										<CheckIcon sx={{ fontSize: '16px' }} />
									</Button>
								</Grid>
								<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
									<Button
										title="Reject"
										color="error"
										size="small"
										onClick={() => updateMultiRecordStatus(selectedRows, 'Rejected')}
										className="w-unset btn-reject"
									>
										<ClearIcon sx={{ fontSize: '16px' }} />
									</Button>
								</Grid>
							</Space>
						</Tooltip>
					)}
				</Toolbar>
			</Container>
			<Table
				className="table-hd"
				columns={columns}
				dataSource={dataWithSerialNumbers}
				loading={loading}
				showSorterTooltip={false}
				pagination={false}
			/>
			<div className="align-center-data">
				<Pagination
					defaultCurrent={pageNo}
					total={transferTotalCount}
					pageSize={pageSize}
					onChange={getpagerecord}
					hideOnSinglePage={true}
				/>
			</div>
		</>
	);
};

export default TransferPendingTable;
