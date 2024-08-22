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
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { getAssetAuditByStatus } from 'components/redux/AssetAudit/action';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '../../../../node_modules/@mui/material/index';
// import { API_BASE_URL } from '../../../constants/constants';
import { Pagination } from 'antd';
import dayjs from 'dayjs';

const AuditDisposedApproved = () => {
	const dispatch = useDispatch();
	const [selectAll, setSelectAll] = React.useState(false);
	const [selectedRows, setSelectedRows] = React.useState([]);
	const renderAfterCalled = useRef(false);
	const [pageNo, setPageNo] = useState();
	const [pageSize, setPageSize] = useState(10);
	const [loading, setLoading] = useState(false);
	const search = useRef(false);
	const searchValue = useRef('');
	const AssetAudit = useSelector((state) => state.AssetAuditData && state.AssetAuditData.AssetAuditByStatus);
	const AssetAuditcount = useSelector(
		(state) =>
			state.AssetAuditData && state.AssetAuditData.AssetAuditByStatus && state.AssetAuditData.AssetAuditByStatus.auditStatusCounts
	);
	const [selectedCategory, setSelectedCategory] = useState('Choose Asset Category');

	const AssetCategoryDetails = useSelector((state) => state.AssetCateData && state.AssetCateData.AssetCategoryData);
	const Approvestatus = 'Approved';
	const [expanded, setExpanded] = useState();

	const toggleExpanded = (e, id) => {
		if (!expanded) {
			setExpanded(id);
		} else {
			setExpanded();
		}
	};

	const renderRemarks = (remark, id) => {
		// Define the maximum length for remarks before truncating
		const maxLength = 10;

		if (!remark) {
			return null;
		}

		if (remark.length <= maxLength) {
			return remark;
		}

		// If remark is longer than maxLength, truncate it and show "Read more" option
		return (
			<>
				{expanded == id ? remark : `${remark.slice(0, maxLength)}... `}
				<span
					role="button"
					tabIndex="0"
					className="read-more-btn"
					onClick={(e) => toggleExpanded(e, id)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							toggleExpanded(id);
						}
					}}
				>
					{expanded == id ? ' Read less' : ' Read more'}
				</span>
			</>
		);
	};

	const getAssetAuditClassData = async (pagenumber, pSize) => {
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			const paagereduce = pagenumber - 1;
			await dispatch(
				getAssetAuditByStatus(paagereduce, pSize, search.current, searchValue.current, Approvestatus, selectedCategory, signal)
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
		setPageNo(1);
		getAssetAuditClassData(1, pageSize);
	};

	const handleCategoryChange = async (value) => {
		setSelectedCategory(value);
		setLoading(true);
		setPageNo(1);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			await dispatch(getAssetAuditByStatus(1, pageSize, search.current, searchValue.current, Approvestatus, value, signal));
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
			dataIndex: 'assetId',
			key: 'assetId',
			title: <span className="table-hd-fs">Asset No</span>,
			render: (_, record) => record.assetId || '',
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
			render: (_, record) => record.assetClass || '',
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
			render: (_, record) => record.plant || '',
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
			title: <span className="table-hd-fs">Previous Image </span>,

			dataIndex: 'name',
			key: 'name',
			render: (_, record) => (
				<Space size="middle">
					<img src={record?.previewImageWithPath || ''} alt={'Previous'} style={{ width: '30px' }} />
				</Space>
			)
		},
		{
			title: <span className="table-hd-fs">Current Image </span>,

			dataIndex: 'name',
			key: 'name',
			render: (_, record) => (
				<Space size="middle">
					<img src={record?.currentImageWithPath || ''} alt={'Current'} style={{ width: '30px' }} />
				</Space>
			)
		},
		{
			title: <span className="table-hd-fs">Audit Date</span>,
			dataIndex: 'date',
			key: 'date',
			condition: true, // Implement your condition logic if needed
			render: (_, record) => {
				const formattedDate = dayjs(record.date).format('DD MMM YYYY');
				return formattedDate;
			},
			sorter: {
				compare: (a, b) => (dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1),
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
				return (
					<Button className="btn-status-approved" color="success">
						{record?.status}
					</Button>
				);
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
		// {
		// 	title: <span className="table-hd-fs">With Condition</span>,
		// 	key: 'withCondition',
		// 	render: (_, record) => {
		// 		return record?.withCondition === true ? (
		// 			<Button className="btn-status-approved" color="success">
		// 				Yes
		// 			</Button>
		// 		) : (
		// 			<Button className="btn-status-rejected" color="error">
		// 				No
		// 			</Button>
		// 		);
		// 	}
		// },

		{
			title: <span className="table-hd-fs">Remarks</span>,

			key: 'action',
			render: (_, record) => {
				return renderRemarks(record?.remark, record.id);
			}
		}
	];

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
	const aList = AssetAudit?.auditsData || [];

	const dataWithSerialNumbers = addSerialNumbers(aList);

	const getpagerecord = (pageNumber, pageSize) => {
		setPageNo(pageNumber);
		setPageSize(pageSize);
		// getAssetAuditByStatus(pageNumber,pageSize,selectedCategory)
		getAssetAuditClassData(pageNumber, pageSize, search.current, searchValue.current, Approvestatus, selectedCategory);
	};
	React.useEffect(() => {
		if (!renderAfterCalled.current) {
			dispatch(getAllAssetCategoryDetails());
			getAssetAuditClassData(pageNo, pageSize, Approvestatus, selectedCategory);
		}
		return () => {
			renderAfterCalled.current = true;
		};
	}, [dispatch, Approvestatus, selectedCategory, pageNo, pageSize]);

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
									defaultValue="Asset Category"
									style={{ width: '100%', height: '33px' }}
									showSearch
									onChange={handleCategoryChange}
									options={[
										{ value: 'Choose Asset Category', label: 'Asset Class' },
										...AssetCategoryDetails.map((option) => ({
											value: option.assetClass,
											label: option.assetClass
										}))
									]}
								/>
							</Grid>
							{/* 3nd  col*/}
							<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus"></Grid>
							{/* 4th col */}
							{/* 5th col */}

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
		</>
	);
};

export default AuditDisposedApproved;
