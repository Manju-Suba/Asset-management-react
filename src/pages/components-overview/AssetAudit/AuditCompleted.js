import React, { useState, useRef } from 'react';
import { Space, Table, Checkbox, Select } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Tooltip from '@mui/material/Tooltip';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { getAssetAuditCompleted } from 'components/redux/AssetAudit/action';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '../../../../node_modules/@mui/material/index';
import ViewAudit from './ViewAudit';
import { Pagination } from 'antd';

const AuditCompleted = ({ onRowClick }) => {
	const search = useRef(false);
    const searchValue = useRef('');
	const selectedClass = useRef('Choose Asset Class');

	const [pageNo, setPageNo] = useState();
	const [pageSize, setPageSize] = useState(10);
	const [loading, setLoading] = useState(false);

	const renderAfterCalled = useRef(false);
	const dispatch = useDispatch();
	const [selectAll, setSelectAll] = React.useState(false);
	const [selectedRows, setSelectedRows] = React.useState([]);
	// const [searchValue, setSearchValue] = React.useState('');
	// const [selectedCategory, setSelectedCategory] = useState('Choose Asset Category');
	const [selectedAsset, setSelectedAsset] = useState(null);
	
	const AssetAudit = useSelector((state) => state.AssetAuditData && state.AssetAuditData.AssetAuditCompleted);
	const AssetAuditcount = useSelector(
		(state) =>
		  state.AssetAuditData && state.AssetAuditData.AssetAuditCompleted && state.AssetAuditData.AssetAuditCompleted.auditStatusCounts
	  );
	const AssetCategoryDetails = useSelector((state) => state.AssetCateData && state.AssetCateData.AssetCategoryData);

	const handleSearchChange = (event) => {
		// setSearchValue(event.target.value);
		searchValue.current = event.target.value;
		if (event.target.value != '') {
		  search.current = true;
		} else {
		  search.current = false;
		}
		setPageNo(1);
		getAssetAuditCompletedData(1, pageSize, search.current, searchValue.current, selectedClass.current);
	};

	const handleCategoryChange = (value) => {
		selectedClass.current = value;
		setPageNo(1);
		getAssetAuditCompletedData(1, pageSize, search.current, searchValue.current, selectedClass.current);
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
			title: <span className="table-hd-fs">Audit Status & Date</span>,

			dataIndex: 'status',
			key: 'status',
			render: (_, record) => {
				return (
					<Grid item container spacing={0} columns={18} sx={{ color: '#454F5B', fontSize: '14px', fontWeight: '600' }}>
						<Grid item xs={18} sm={18} md={18} lg={18}>
							<span className="complete-status">
								{record.statusCount} Audit Completed <br></br>
								<ErrorOutlineIcon sx={{ fontSize: 14, color: '#adb6c0' }} />
								<small className="text-next-audit"> Next Audit will be {record.auditDateFormat}</small>
							</span>
						</Grid>
					</Grid>
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
		{
			title: <span className="table-hd-fs">Action</span>,

			key: 'action',
			render: (_, record) => {
				return (
					<Button className="btn-audit-disabled" onClick={() => handleRowClick(record)}>
						Audit
					</Button>
				);
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
				sno: numberstart + index + 1 // Generating serial number starting from 1
			};
		});
	};

	const handleRowClick = (record) => {
		setSelectedAsset(record);
		onRowClick();
	};

	const aList = AssetAudit?.auditsData || [];
	const dataWithSerialNumbers = addSerialNumbers(aList);
	// const filteredData = dataWithSerialNumbers.filter((row) => {
	// 	return Object.values(row).some((value) => {
	// 		if (value !== null && value !== undefined) {
	// 			return value.toString().toLowerCase().includes(searchValue.toLowerCase());
	// 		}
	// 		return false;
	// 	});
	// });
	const getpagerecord = (pageNumber, pageSize) => {
		setPageNo(pageNumber);
		setPageSize(pageSize);
		getAssetAuditCompletedData(pageNumber, pageSize, search.current, searchValue.current, selectedClass.current);
	};

	const getAssetAuditCompletedData = async (pageNo, pSize) => {
		setLoading(true);
		try {
		  const paagereduce = pageNo - 1;
		  await dispatch(getAssetAuditCompleted(paagereduce, pSize, search.current, searchValue.current, selectedClass.current));
		} catch (error) {
		  setLoading(false);
		  console.error('Error fetching data:', error);
		} finally {
		  setLoading(false);
		}
	};

	React.useEffect(() => {
		if (!renderAfterCalled.current) {
			getAssetAuditCompletedData(pageNo, pageSize, search.current, searchValue.current);
			dispatch(getAllAssetCategoryDetails());
			// dispatch(getAssetAuditCompleted(pageNo, pageSize, search.current, searchValue.current));
		}
		return () => {
			renderAfterCalled.current = true;
		};
	}, [dispatch]);

	return (
		<>
			{selectedAsset ? (
				<ViewAudit onRowClick={handleRowClick} selectedData={selectedAsset} />
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
									<Grid item  lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
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
									{/* 3nd  col*/}
									<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
										{/* <Select
              defaultValue="Asset type"
              style={{ width: '100%', height: '33px' }}
              onChange={handleAssetTypeChange}
              disabled={selectedCategory == 'Choose Asset Category'}
              options={AssetTypeDetails.map((option) => ({
                value: option.id,
                label: option.name
              }))}
            /> */}
									</Grid>
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
					<Table className="table-hd audit-table" columns={columns} dataSource={dataWithSerialNumbers} pagination={false} loading={loading} showSorterTooltip={false} />
					<div className="align-center-data">
						<Pagination defaultCurrent={pageNo} current ={pageNo} total={AssetAuditcount} pageSize={pageSize} onChange={getpagerecord} hideOnSinglePage={true} />
					</div>
				</>
			)}
		</>
	);
};

export default AuditCompleted;
