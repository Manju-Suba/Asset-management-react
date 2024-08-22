import React, { useState, useRef } from 'react';
import { Space, Table, Checkbox } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
// import { Select } from 'antd';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Grid } from '../../../../node_modules/@mui/material/index';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { useDispatch, useSelector } from 'react-redux';
import { API_BASE_URL } from '../../../constants/constants';
import { getDisposedAsset } from 'components/redux/DisposalAsset/action';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { Pagination } from 'antd';
//Select Dropdown
import CustomSelect from '../CustomSelect';
//import style css
import '../../../menu-items/style.css';

const DisposedAsset = () => {
	const dispatch = useDispatch();
	const [selectAll, setSelectAll] = React.useState(false);
	// eslint-disable-next-line no-unused-vars
	const [selectedRows, setSelectedRows] = React.useState([]);
	const [expanded, setExpanded] = useState();
	const [pageNo, setPageNo] = useState();
	const [pageSize, setPageSize] = useState(10);
	const [loading, setLoading] = useState(false);
	const search = useRef(false);
	const searchValue = useRef('');
	const selectedClass = useRef('Choose Asset Class');

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

	const DisposedAssetData = useSelector((state) => state.DisposalAssetData && state.DisposalAssetData.DisposedAsset);
	const AssetListcount = useSelector(
		(state) => state.DisposalAssetData && state.DisposalAssetData.DisposedAsset && state.DisposalAssetData.DisposedAsset.disposedCount
	);
	const AssetCategoryDetails = useSelector((state) => state.AssetCateData && state.AssetCateData.AssetCategoryData);

	const handleSearchChange = (event) => {
		searchValue.current = event.target.value;
		if (event.target.value != '') {
			search.current = true;
		} else {
			search.current = false;
		}
		setPageNo(1);
		getAssetAllocationData(1, pageSize);
	};

	const getAssetAllocationData = async (pagenumber, Size) => {
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			const paagereduce = pagenumber - 1;
			await dispatch(getDisposedAsset(selectedClass.current, paagereduce, Size, search.current, searchValue.current, signal));
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

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

	const assetList = DisposedAssetData?.assetDisposed || [];
	const dataWithSerialNumbers = addSerialNumbers(assetList);

	const handleSelectAllChange = (e) => {
		const updatedSelectAll = e.target.checked;
		setSelectAll(updatedSelectAll);
		const updatedSelectedRows = updatedSelectAll ? [...DisposedAssetData] : [];
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
		setSelectAll(updatedSelectedRows.length === DisposedAssetData.length);
	};

	const handleCategoryChange = async (value) => {
		selectedClass.current = value;
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			setPageNo(1);
			await dispatch(getDisposedAsset(value, 1, pageSize, search.current, searchValue.current, signal));
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	const getpagerecord = (pageNumber, pageSize) => {
		setPageNo(pageNumber);
		setPageSize(pageSize);
		getAssetAllocationData(pageNumber, pageSize);
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
			render: (_, record) => (record.assetId ? record.assetId : ''),
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
			dataIndex: 'assetCategory',
			key: 'assetCategory',
			title: <span className="table-hd-fs">Asset Class</span>,
			render: (_, record) => (record.assetClass ? record.assetClass : ''),
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
			dataIndex: 'status',
			key: 'status',
			title: <span className="table-hd-fs">Status</span>,
			render() {
				return <span className="disposed-table-value-badge">Disposed</span>;
			}
		},
		{
			title: <span className="table-hd-fs">Picture </span>,

			dataIndex: 'picture',
			key: 'picture',
			render: (_, record) => (
				<Space size="middle">
					<img
						src={record.pictureWithPath || API_BASE_URL + '/uploads/computer.png'}
						alt={'Not Found'}
						style={{ width: '30px' }}
					/>
				</Space>
			)
		},
		{
			dataIndex: 'remark',
			key: 'remark',
			title: <span className="table-hd-fs">Remarks</span>,
			render: (_, record) => {
				return renderRemarks(record?.remarks, record.id);
			}
		}
	];

	React.useEffect(() => {
		dispatch(getAllAssetCategoryDetails());
		getAssetAllocationData(pageNo, pageSize);
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
									{ value: 'Choose Asset Class', label: 'Asset Class' },
									...AssetCategoryDetails.map((option) => ({
										value: option.assetClass,
										label: option.assetClass
									}))
								]}
							/>
						</Grid>
					</Grid>
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
					total={AssetListcount}
					pageSize={pageSize}
					onChange={getpagerecord}
					hideOnSinglePage={true}
				/>
			</div>
		</>
	);
};
export default DisposedAsset;
