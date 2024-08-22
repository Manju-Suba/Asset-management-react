import React, { useState, useRef } from 'react';
import { Table, Checkbox, Popover } from 'antd';
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
import { getPendingAssetTicket, getAllAssetTicketNo } from 'components/redux/AssetCreation/action';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
//Select Dropdown
import CustomSelect from '../CustomSelect';
//import style css
import '../../../menu-items/style.css';

const AllassetTicketApproved = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [selectAll, setSelectAll] = React.useState(false);
	const [selectedRows, setSelectedRows] = React.useState([]);
	const search = useRef(false);
	const searchValue = useRef('');
	const ticketType = useRef('Approved');
	const [pageNo, setPageNo] = useState();
	const [pageSize, setPageSize] = useState(10);
	const queryParams = new URLSearchParams(location.search);
	const assetClass = queryParams.get('class');
	const AllSapTickets = useSelector((state) => state.AssetCreationData && state.AssetCreationData.StatusWiseAssetTicket);
	const AssetListcount = useSelector(
		(state) => state.AssetCreationData && state.AssetCreationData.AssetTicket && state.AssetCreationData.AssetTicket.assetTicketCount
	);
	const [selectedClass, setSelectedClass] = useState(assetClass || 'Choose Asset Class');
	const [selectedTicketNo, setSelectedTicketNo] = useState('Ticket No');
	const [loading, setLoading] = useState(false);
	const All = useSelector((state) => state.AssetCreationData && state.AssetCreationData.AssetTicketNo);
	const AssetClassDetails = useSelector((state) => state.AssetCreationData && state.AssetCreationData.AssetTicketNo);
	const assetList = AllSapTickets?.assetTicket || [];

	const getAssetClassData = async (pagenumber, Size) => {
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			const paagereduce = pagenumber - 1;
			await dispatch(
				getPendingAssetTicket(
					selectedClass,
					selectedTicketNo,
					paagereduce,
					Size,
					search.current,
					searchValue.current,
					signal,
					ticketType.current
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
		console.log(value);
		setSelectedClass(value);
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			setPageNo(1);
			await dispatch(
				getPendingAssetTicket(value, selectedTicketNo, 0, pageSize, search.current, searchValue.current, signal, ticketType.current)
			);
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
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
		setSelectAll(updatedSelectedRows.length === assetList.length);
	};
	const handleSelectAllChange = (e) => {
		const updatedSelectAll = e.target.checked;
		setSelectAll(updatedSelectAll);
		const updatedSelectedRows = updatedSelectAll ? [...assetList] : [];
		setSelectedRows(updatedSelectedRows);
	};
	const handleTicketNo = async (value) => {
		setSelectedTicketNo(value);
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			setPageNo(1);
			await dispatch(
				getPendingAssetTicket(selectedClass, value, 0, pageSize, search.current, searchValue.current, signal, ticketType.current)
			);
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	// for datatable search start
	const handleSearchChange = (event) => {
		searchValue.current = event.target.value;
		if (event.target.value != '') {
			search.current = true;
		} else {
			search.current = false;
		}
		setPageNo(1);
		getAssetClassData(1, pageSize);
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

	const dataWithSerialNumbers = addSerialNumbers(assetList);

	const getpagerecord = (pageNumber, pageSize) => {
		setPageNo(pageNumber);
		setPageSize(pageSize);
		getAssetClassData(pageNumber, pageSize);
	};

	const groupedOptions = Array.from(
		AssetClassDetails.reduce((map, option) => {
			if (!map.has(option.assetClass)) {
				map.set(option.assetClass, { value: option.assetClass, label: option.assetClass });
			}
			return map;
		}, new Map()).values()
	);
	const classOptions = [{ value: '', label: 'Asset Class' }, ...groupedOptions];

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
			dataIndex: 'ticketNo',
			key: 'ticketNo',
			title: <span className="table-hd-fs">Ticket No</span>,
			sorter: {
				compare: (a, b) => a.ticketNo.localeCompare(b.ticketNo),
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
			dataIndex: 'assetName',
			key: 'assetName',
			title: <span className="table-hd-fs">Asset Name.</span>,
			render: (_, record) => {
				return (
					<Popover content={record.assetName} title="Asset Name" trigger={record.assetName.length > 10 ? `hover` : ''}>
						{record.assetName.length > 10 ? `${record.assetName.slice(0, 10)}...` : record.assetName}
					</Popover>
				);
			},
			sorter: {
				compare: (a, b) => a.assetName.localeCompare(b.assetName),
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
			render: (_, record) => {
				return (
					<Popover content={record.description} title="Asset Description" trigger={record.description.length > 10 ? `hover` : ''}>
						{record.description.length > 10 ? `${record.description.slice(0, 10)}...` : record.description}
					</Popover>
				);
			}
		},
		{
			title: <span className="table-hd-fs">Asset Status</span>,
			dataIndex: 'assetStatus',
			key: 'assetStatus',
			render: (_, record) => {
				return <span className="table-value-badge-success">{record.sapStatus || 'Approved'}</span>;
			},
			sorter: {
				compare: (a, b) => a.sapStatus.localeCompare(b.sapStatus),
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
		dispatch(getAllAssetTicketNo('Approved'));
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
						<Grid item lg={2} sm={3} sx={{ ml: 1 }} className="select-ant-cus">
							<CustomSelect
								defaultValue={assetClass || 'Asset Class'} // Set an empty default value
								style={{ width: '100%', height: '33px' }}
								// mode="multiple"
								// allowClear
								showSearch
								onChange={handleClassChange}
								options={classOptions}
							/>
						</Grid>
						{/* 3nd  col*/}
						<Grid item lg={2} sm={3} sx={{ ml: 1 }} className="select-ant-cus">
							<CustomSelect
								defaultValue="Ticket No"
								value={selectedTicketNo}
								style={{ width: '100%', height: '33px' }}
								showSearch
								onChange={handleTicketNo}
								options={[
									{ value: '', label: 'Ticket No' },
									...All.map((option) => ({
										value: option.ticketNo,
										label: option.ticketNo
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
					total={AssetListcount}
					current={pageNo}
					pageSize={pageSize}
					onChange={getpagerecord}
					hideOnSinglePage={true}
				/>
			</div>
		</>
	);
};

export default AllassetTicketApproved;
