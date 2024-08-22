import React, { useState, useRef } from 'react';
import { Space, Table, Checkbox } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import { Select } from 'antd';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { getAssetAuditPending } from 'components/redux/AssetAudit/action';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '../../../../node_modules/@mui/material/index';
import dayjs from 'dayjs';
import AuditStatusModal from './AuditStatusModal';
import Computeriamge from 'assets/images/users/computer.png';
import Observation from 'assets/images/icons/observation.png';
// import { API_BASE_URL } from '../../../constants/constants';
import { Pagination } from 'antd';
import AuditObservationModal from './AuditObservationModal';
import ViewAssetAudit from './ViewAssetAudit';

const AuditDisposedPending = ({ onRowClick }) => {
	const dispatch = useDispatch();
	const [selectAll, setSelectAll] = React.useState(false);
	const [selectedRows, setSelectedRows] = React.useState([]);
	const [AuditRecord, setAuditRecord] = React.useState([]);
	const [StatusType, setStatusType] = React.useState();
	const [AuditStatus, setAuditStatus] = React.useState();
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [isModalObOpen, setIsModalObOpen] = React.useState(false);
	const [loading, setLoading] = useState(false);
	const [pageNo, setPageNo] = useState();
	const [pageSize, setPageSize] = useState(10);
	const search = useRef(false);
	const searchValue = useRef('');
	const [selectedAsset, setSelectedAsset] = useState(null);
	const AssetAudit = useSelector((state) => state.AssetAuditData && state.AssetAuditData.AssetAuditPending);
	const AssetAuditcount = useSelector(
		(state) =>
			state.AssetAuditData && state.AssetAuditData.AssetAuditPending && state.AssetAuditData.AssetAuditPending.pendingAuditAssetCounts
	);
	const [selectedCategory, setSelectedCategory] = useState('Choose Asset Category');

	const AssetCategoryDetails = useSelector((state) => state.AssetCateData && state.AssetCateData.AssetCategoryData);
	const [positionGeoRef, setPositionGeoRef] = React.useState({ latitude: null, longitude: null });

	const getAssetAuditData = async (pagenumber, Size) => {
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			const paagereduce = pagenumber - 1;
			await dispatch(
				getAssetAuditPending(paagereduce, Size, selectedCategory, StatusType, search.current, searchValue.current, signal)
			);
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleCategoryChange = async (value) => {
		setSelectedCategory(value);
		setLoading(true);
		setPageNo(1);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			await dispatch(getAssetAuditPending(1, pageSize, value, StatusType, search.current, searchValue.current, signal));
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSelectAllChange = (e) => {
		const updatedSelectAll = e.target.checked;
		setSelectAll(updatedSelectAll);
		const updatedSelectedRows = updatedSelectAll ? [...AssetAudit] : [];
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
		setSelectAll(updatedSelectedRows.length === AssetAudit.length);
	};

	const handleSearchChange = (event) => {
		searchValue.current = event.target.value;
		if (event.target.value != '') {
			search.current = true;
		} else {
			search.current = false;
		}
		setPageNo(1);
		getAssetAuditData(1, pageSize);
	};

	const handleStatusModal = (Record, status) => {
		setAuditRecord(Record);
		if (status === 'Approved') {
			setStatusType('Approve');
		} else {
			setStatusType('Reject');
		}
		setAuditStatus(status);
		setIsModalOpen(true);
	};

	const handleStatusObModal = (Record) => {
		setAuditRecord(Record);
		setIsModalObOpen(true);
	};

	const handleRowClick = (record) => {
		setSelectedAsset(record);
		onRowClick();
	};

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
			dataIndex: 'sno',
			key: 'sno',
			title: <span className="table-hd-fs">SI.No</span>,
			condition: true,
			onCell: (record) => ({
				onClick: () => handleRowClick(record, 'name')
			})
		},
		{
			dataIndex: 'assetId',
			key: 'assetId',
			title: <span className="table-hd-fs">Asset No</span>,
			condition: true,
			onCell: (record) => ({
				onClick: () => handleRowClick(record, 'name')
			})
		},
		{
			title: <span className="table-hd-fs">Asset Class</span>,
			dataIndex: 'assetClass',
			key: 'assetClass',
			condition: true,
			onCell: (record) => ({
				onClick: () => handleRowClick(record, 'name')
			})
		},
		{
			title: <span className="table-hd-fs">Plant</span>,

			key: 'plant',
			dataIndex: 'plant',
			condition: true,
			onCell: (record) => ({
				onClick: () => handleRowClick(record, 'name')
			})
		},
		{
			title: <span className="table-hd-fs">Audit Date</span>,

			dataIndex: 'status',
			key: 'status',
			condition: true,
			render: (_, record) => {
				const formattedDate = dayjs(record.nextAuditDate).format('DD MMM YYYY');
				return formattedDate;
			},
			onCell: (record) => ({
				onClick: () => handleRowClick(record, 'name')
			})
		},
		{
			title: <span className="table-hd-fs">Previous Image </span>,

			dataIndex: 'name',
			key: 'name',
			condition: true,
			render: (_, record) => {
				if (record.previewImageWithPath) {
					return (
						<Space size="middle">
							<img src={ record.previewImageWithPath} alt={'Previous'} style={{ width: '30px' }} />
						</Space>
					);
				} else {
					return (
						<Space size="middle">
							<img src={Computeriamge} alt={'Previous'} style={{ width: '30px' }} />
						</Space>
					);
				}
			},
			onCell: (record) => ({
				onClick: () => handleRowClick(record, 'name')
			})
		},
		{
			title: <span className="table-hd-fs">Action</span>,

			key: 'action',
			condition: false,
			render: (_, record) => {
				return (
					<Space>
						<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
							<Button
								color="error"
								size="small"
								className="w-unset btn-reject"
								onClick={() => handleStatusObModal(record)}
								data-id={record.id}
							>
								<img src={Observation} alt="Observation" />
							</Button>
						</Grid>
						<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
							<Button
								color="error"
								size="small"
								className="w-unset btn-reject"
								onClick={() => handleStatusModal(record, 'Rejected')}
								data-id={record.id}
							>
								<ClearIcon sx={{ fontSize: '16px' }} />
							</Button>
						</Grid>
						<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
							<Button
								color="success"
								size="small"
								className="w-unset btn-approve"
								onClick={() => handleStatusModal(record, 'Approved')}
								data-id={record.id}
							>
								<CheckIcon sx={{ fontSize: '16px' }} />
							</Button>
						</Grid>
					</Space>
				);
			}
		}
	];

	const assetList = AssetAudit?.auditResponses || [];
	// const filteredData = assetList.filter((row) => {
	//   return Object.values(row).some((value) => {
	//     if (value !== null && value !== undefined) {
	//       return value.toString().toLowerCase().includes(searchValue.toLowerCase());
	//     }
	//     return false;
	//   });
	// });
	// for datatable search end

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
		// getAssetClassData(pageNumber, pageSize);
		getAssetAuditData(pageNumber, pageSize);
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

	React.useEffect(() => {
		fetchGeoLocation();
		dispatch(getAllAssetCategoryDetails());
		getAssetAuditData(pageNo, pageSize, selectedCategory);
	}, [dispatch, selectedCategory]);

	return (
		<>
			{selectedAsset ? (
				<ViewAssetAudit onRowClick={handleRowClick} selectedData={selectedAsset} geoLocation={positionGeoRef} />
			) : (
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
											value={searchValue.current}
											onChange={handleSearchChange}
										/>
									</Grid>

									{/* 2nd col */}
									<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
										<Select
											defaultValue="Asset Class"
											style={{ width: '100%', height: '33px' }}
											showSearch
											onChange={handleCategoryChange}
											options={[
												{ value: 'Choose Asset Class', label: 'Asset Class' },
												...AssetCategoryDetails.map((option) => ({
													value: option.assetClass,
													label: option.assetClass
												}))
											]}
										/>
									</Grid>
									<Grid item lg={6} sm={4}></Grid>
								</Grid>
							)}

							{selectedRows.length > 0 && (
								<Tooltip title="Delete">
									<Space>
										<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
											<Button color="success" size="small" className="w-unset btn-approve">
												<CheckIcon sx={{ fontSize: '16px' }} />
											</Button>
										</Grid>
										<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
											<Button color="error" size="small" className="w-unset btn-reject">
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
						pagination={false}
						loading={loading}
						showSorterTooltip={false}
						// onRow={(record) => {
						//   return {
						//     onClick: () => handleRowClick(record)
						//   };
						// }}
					/>
					<div className="align-center-data">
						<Pagination
							defaultCurrent={pageNo}
							current={pageNo}
							total={AssetAuditcount}
							pageSize={pageSize}
							onChange={getpagerecord}
							hideOnSinglePage={true}
						/>
					</div>
					<AuditStatusModal
						AssetData={AuditRecord}
						StatusType={StatusType}
						Status={AuditStatus}
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
					/>
					<AuditObservationModal AssetData={AuditRecord} isModalOpen={isModalObOpen} setIsModalOpen={setIsModalObOpen} />
				</>
			)}
		</>
	);
};

export default AuditDisposedPending;
