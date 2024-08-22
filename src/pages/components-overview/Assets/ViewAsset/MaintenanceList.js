import React, { useState } from 'react';
import { Table, Checkbox, DatePicker } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { getMaintenanceList } from 'components/redux/asset/action';
import moment from 'moment';
const MaintenanceList = (selectedAsset) => {
	const dispatch = useDispatch();
	const { RangePicker } = DatePicker;
	const [selectAll, setSelectAll] = React.useState(false);
	const [selectedRows, setSelectedRows] = React.useState([]);
	const [pageNo, setPageNo] = useState();
	const [pageSize, setPageSize] = useState(10);
	const MaintenanceData = useSelector((state) => state.AssetData && state.AssetData.AssetMaintenance);
	const MaintenanceListcount = useSelector(
		(state) => state.AssetCreationData && state.AssetData.AssetMaintenance && state.AssetData.AssetMaintenance.maintenanceAssetCount
	);
	const [fromDate, setFromDate] = useState(null);
	const [toDate, setToDate] = useState(null);
	const [loading, setLoading] = useState(false);
	const assetMaintenanceList = MaintenanceData?.maintenanceList || [];
	const getAssetClassData = async (pagenumber, Size) => {
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			const paagereduce = pagenumber - 1;
			await dispatch(getMaintenanceList(selectedAsset.selectedAsset.assetId, fromDate, toDate, paagereduce, Size, signal));
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleClassChange = async (value) => {
		if (value != null) {
			const from = formatDate(value[0]);
			const to = formatDate(value[1]);
			setFromDate(from);
			setToDate(to);
			setLoading(true);
			try {
				const controller = new AbortController();
				const signal = controller.signal;
				const paagereduce = 0;
				const Size = 10;
				setPageNo(1);
				await dispatch(getMaintenanceList(selectedAsset.selectedAsset.assetId, from, to, paagereduce, Size, signal));
			} catch (error) {
				setLoading(false);
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		} else {
			const controller = new AbortController();
			const signal = controller.signal;
			const paagereduce = 0;
			const Size = 10;
			await dispatch(getMaintenanceList(selectedAsset.selectedAsset.assetId, null, null, paagereduce, Size, signal));
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
		setSelectAll(updatedSelectedRows.length === assetMaintenanceList.length);
	};
	const handleSelectAllChange = (e) => {
		const updatedSelectAll = e.target.checked;
		setSelectAll(updatedSelectAll);
		const updatedSelectedRows = updatedSelectAll ? [...assetMaintenanceList] : [];
		setSelectedRows(updatedSelectedRows);
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

	const dataWithSerialNumbers = addSerialNumbers(assetMaintenanceList);
	const formatDate = (date) => {
		const d = new Date(date);
		const isoString = d.toISOString();
		return isoString.split('.')[0]; // Remove milliseconds and 'Z'
	};
	const getpagerecord = (pageNumber, pageSize) => {
		setPageNo(pageNumber);
		setPageSize(pageSize);
		getAssetClassData(pageNumber, pageSize);
	};
	const calculateTotal = (data) => {
		const totalMilliseconds = data.reduce((sum, record) => {
			if (record.malfunctionStartDate != null && record.malfunctionEndDate != null) {
				const start = new Date(record.malfunctionStartDate);
				const end = new Date(record.malfunctionEndDate);
				const duration = end - start; // Duration in milliseconds
				if (duration > 0) {
					return sum + duration;
				}
				return sum;
			}
		}, 0);
		// Convert milliseconds to hours and minutes
		const totalHours = totalMilliseconds / (1000 * 60 * 60);
		const hours = Math.floor(totalHours);
		const minutes = Math.floor((totalHours - hours) * 60);

		return `${hours} hours, ${minutes} minutes`;
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
			dataIndex: 'assetId',
			key: 'assetId',
			title: <span className="table-hd-fs">Asset ID</span>,
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
			title: <span className="table-hd-fs">Plant</span>,

			dataIndex: 'plant',
			key: 'plant',
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
			dataIndex: 'breakDownDateTime',
			key: 'breakDownDateTime',
			title: <span className="table-hd-fs">BreakDown Date & Time</span>,
			sorter: {
				compare: (a, b) => a.breakDownDateTime.localeCompare(b.breakDownDateTime),
				multiple: 1
			},
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) => {
				return sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				);
			},
			render: (_, record) => {
				return moment(record.breakDownDateTime).format('DD-MM-YYYY HH:mm');
			}
		},
		{
			title: <span className="table-hd-fs">BreakDown Duration</span>,

			dataIndex: 'breakDownDuration',
			key: 'breakDownDuration'
		},
		{
			title: <span className="table-hd-fs">Problem</span>,

			dataIndex: 'problem',
			key: 'problem'
			// render: (_, record) => {
			// 	return (
			// 		<Popover content={record.breakDownDuration} title="Asset breakDownDuration'," trigger={record.breakDownDuration.length > 50 ? `hover` : ''}>
			// 			{record.breakDownDuration.length > 50 ? `${record.breakDownDuration.slice(0, 50)}...` : record.breakDownDuration}
			// 		</Popover>
			// 	);
			// }
		},
		{
			title: <span className="table-hd-fs">MalFunction StartDate</span>,
			dataIndex: 'malfunctionStartDate',
			key: 'malfunctionStartDate',
			sorter: {
				compare: (a, b) => a.malfunctionStartDate.localeCompare(b.malfunctionStartDate),
				multiple: 1
			},
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) => {
				return sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				);
			},
			render: (_, record) => {
				return moment(record.malfunctionStartDate).format('DD-MM-YYYY HH:mm');
			}
		},
		{
			title: <span className="table-hd-fs">MalFunction EndDate</span>,
			dataIndex: 'malfunctionEndDate',
			key: 'malfunctionEndDate',
			sorter: {
				compare: (a, b) => a.malfunctionEndDate.localeCompare(b.malfunctionEndDate),
				multiple: 1
			},
			sortDirections: ['descend', 'ascend'],
			sortIcon: ({ sortOrder }) => {
				return sortOrder === 'descend' ? (
					<ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				) : (
					<ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
				);
			},
			render: (_, record) => {
				return moment(record.malfunctionEndDate).format('DD-MM-YYYY HH:mm');
			}
		}
	];

	React.useEffect(() => {
		getAssetClassData(pageNo, pageSize);
	}, [dispatch, pageNo, pageSize]);

	return (
		<>
			<Container maxWidth="xl" sx={{ height: 'auto', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
				<Toolbar disableGutters sx={{ height: '50%' }}>
					<Grid item container spacing={2} columns={16}>
						<Grid item lg={3} sm={5}>
							<RangePicker style={{ height: '40px', width: '100%' }} format="DD-MM-YYYY" onChange={handleClassChange} />
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
				footer={() => <span className="table-hd-fs">Total BreakDown Duration: {calculateTotal(dataWithSerialNumbers)}</span>}
			/>
			<div className="align-center-data">
				<Pagination
					defaultCurrent={pageNo}
					total={MaintenanceListcount}
					current={pageNo}
					pageSize={pageSize}
					onChange={getpagerecord}
					hideOnSinglePage={true}
				/>
			</div>
		</>
	);
};

export default MaintenanceList;
