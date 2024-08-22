import React, { useState, useRef } from 'react';
import { Space, Table, Button, Checkbox, Tag, Popconfirm, Popover } from 'antd';
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
import { getAllAssetTicket, getAllAssetTicketNo, statusUpdate, deleteAssetTicket } from 'components/redux/AssetCreation/action';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box } from '@mui/material';
//Select Dropdown
import CustomSelect from '../CustomSelect';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import { PlusOutlined } from '@ant-design/icons';
//import style css
import '../../../menu-items/style.css';
import AssetTicketModal from '../AssetCreation/AssetTicketModal';
import AssetTicketEditModal from '../AssetCreation/AssetTicketEditModal';
import { toast } from 'react-toastify';

const AllassetTicket = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [selectAll, setSelectAll] = React.useState(false);
	const [selectedRows, setSelectedRows] = React.useState([]);
	const search = useRef(false);
	const searchValue = useRef('');
	const [pageNo, setPageNo] = useState();
	const [pageSize, setPageSize] = useState(10);
	const queryParams = new URLSearchParams(location.search);
	const assetClass = queryParams.get('class');
	const AllSoftware = useSelector((state) => state.AssetCreationData && state.AssetCreationData.AssetTicket);
	const AssetListcount = useSelector(
		(state) => state.AssetCreationData && state.AssetCreationData.AssetTicket && state.AssetCreationData.AssetTicket.assetTicketCount
	);
	const [selectedClass, setSelectedClass] = useState(assetClass || 'Choose Asset Class');
	const [selectedTicketNo, setSelectedTicketNo] = useState('Ticket No');
	const [loading, setLoading] = useState(false);
	const All = useSelector((state) => state.AssetCreationData && state.AssetCreationData.AssetTicketNo);
	const AssetClassDetails = useSelector((state) => state.AssetCreationData && state.AssetCreationData.AssetTicketNo);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
	const [assetTicketRecord, setAssetTicketRecord] = React.useState([]);
	const [statusType, setStatusType] = React.useState();
	const assetList = AllSoftware?.assetTicket || [];
	const getAssetClassData = async (pagenumber, Size) => {
		setLoading(true);
		try {
			const controller = new AbortController();
			const signal = controller.signal;
			const paagereduce = pagenumber - 1;
			await dispatch(
				getAllAssetTicket(selectedClass, selectedTicketNo, paagereduce, Size, search.current, searchValue.current, signal)
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
			await dispatch(getAllAssetTicket(value, selectedTicketNo, 0, pageSize, search.current, searchValue.current, signal));
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
			await dispatch(getAllAssetTicket(selectedClass, value, 0, pageSize, search.current, searchValue.current, signal));
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

	const handleStatusModal = () => {
		console.log('create');
		setIsModalOpen(true);
	};
	const handleEditModal = (record, status) => {
		console.log(status);
		setAssetTicketRecord(record);
		setStatusType(status);
		setIsEditModalOpen(true);
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
	const handleStatusChange = (record, checked, status) => {
		dispatch(statusUpdate(record.id, status))
			.then(() => {
				getAssetClassData(pageNo, pageSize);
			})
			.catch((error) => {
				// Handle error if needed
				toast.error(error.response.data.message);
			});
	};
	const handleConfirm = (record) => {
		dispatch(deleteAssetTicket(record.id))
			.then((response) => {
				toast.success(response.data.message);
				getAssetClassData(1, pageSize);
			})
			.catch((error) => {
				toast.error(error);
			});
	};
	const handleCancel = () => {
		getAssetClassData(1, pageSize);
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
			title: <span className="table-hd-fs">SAP Status</span>,
			dataIndex: 'sapStatus',
			key: 'sapStatus',
			render: (_, record) => {
				// Determine the class name based on the status
				const statusClass = record.sapStatus === 'Approved' ? 'table-value-badge-success' : 'table-value-badge-warning';
				return <span className={statusClass}>{record.sapStatus}</span>;
			},
			// render: (_, record) => {
			// 	return <span className="table-value-badge-warning">{record.status || 'Pending'}</span>;
			// },
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
				const isPending = record.status === 'Pending';
				const isCompleted = record.status === 'Completed';
				const isApproved = record.sapStatus === 'Approved';

				return (
					<>
						<Tag.CheckableTag
							style={{
								cursor: isCompleted ? 'not-allowed' : 'pointer',
								borderRadius: '4px',
								padding: '10px 16px',
								fontSize: 'medium',
								backgroundColor: isPending ? '#ffecb3' : '',
								color: isPending ? '#d4a60f' : '#bfc5ce'
							}}
							className="tag-pending"
							checked={isPending}
							onChange={(checked) => !isCompleted && handleStatusChange(record, checked, 'Pending')}
							disabled={isCompleted}
						>
							Pending
						</Tag.CheckableTag>
						<Tag.CheckableTag
							className="tag-completed"
							style={{
								borderRadius: '4px',
								padding: '10px 16px',
								fontSize: 'medium',
								backgroundColor: isCompleted ? '#d9f7be' : '',
								color: isCompleted ? '#52c41a' : '#bfc5ce',
								cursor: isApproved ? 'pointer' : 'not-allowed'
							}}
							checked={isCompleted}
							onChange={(checked) => isApproved && handleStatusChange(record, checked, 'Completed')}
							disabled={!isApproved}
						>
							Completed
						</Tag.CheckableTag>
					</>
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
				let isApproved = record.sapStatus === 'Approved';
				return (
					<Space>
						<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
							<div
								role="button"
								className="btn-scrap-transfer"
								style={{pointerEvents: isApproved ? 'none' : 'block'}}
								tabIndex="0"
								onClick={() => !isApproved && handleEditModal(record, 'Edit')}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										!isApproved && handleEditModal(record, 'Edit');
									}
								}}
							>
								<EditSharpIcon sx={{ fontSize: '16px' }} style={{color: isApproved ? '#a5a1a17d' : ''}} />
							</div>
						</Grid>
						<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
							<Popconfirm
								title="Delete the Ticket"
								description="Are you sure to delete this Ticket?"
								onConfirm={() => !isApproved && handleConfirm(record)}
								onCancel={handleCancel}
								okText="Yes"
								cancelText="No"
								disabled={isApproved}
							>
								<div role="button" className="btn-scrap-transfer" style={{pointerEvents: isApproved ? 'none' : 'block'}} tabIndex="0">
									<DeleteIcon sx={{ fontSize: '16px' }} style={{color: isApproved ? '#a5a1a17d' : ''}} />
								</div>
							</Popconfirm>
						</Grid>
					</Space>
				);
			}
		}
	];

	React.useEffect(() => {
		dispatch(getAllAssetTicketNo('All'));
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
						<Grid item lg={8} sm={3}>
							<Box display="flex" justifyContent="flex-end">
								<Button
									type="primary"
									icon={<PlusOutlined />}
									style={{ height: '33px' }}
									onClick={() => handleStatusModal()}
								>
									Create New Ticket
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Toolbar>
			</Container>
			<Table
				className="table-hd table-asset-creation"
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

			<AssetTicketModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

			<AssetTicketEditModal
				AssetTicket={assetTicketRecord}
				StatusType={statusType}
				isEditModalOpen={isEditModalOpen}
				setIsEditModalOpen={setIsEditModalOpen}
			/>
		</>
	);
};

export default AllassetTicket;
