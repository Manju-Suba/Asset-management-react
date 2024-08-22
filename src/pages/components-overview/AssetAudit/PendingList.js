import React, { useState } from 'react';
import { Space, Table, Checkbox, Form } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { Select } from 'antd';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Tooltip from '@mui/material/Tooltip';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { getPendingAssetAudit, assetAuditDateCreate, getRequestAssetAuditPending } from 'components/redux/AssetAudit/action';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '../../../../node_modules/@mui/material/index';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const AuditPending = () => {
	const dispatch = useDispatch();
	const [editAuditDate, setEditAuditDate] = React.useState([]);
	const [selectAll, setSelectAll] = React.useState(false);
	const [AuditDate, setAuditDate] = React.useState([]);
	const [selectedRows, setSelectedRows] = React.useState([]);
	const AssetAudit = useSelector((state) => state.AssetAuditData && state.AssetAuditData.AssetPendingAudit);
	const [selectedCategory, setSelectedCategory] = useState('Choose Asset Category');

	const AssetCategoryDetails = useSelector((state) => state.AssetCateData && state.AssetCateData.AssetCategoryData);

	const handleCategoryChange = (value) => {
		setSelectedCategory(value);
		dispatch(getPendingAssetAudit(value));
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

	const editauditdate = (record) => {
		let statusedit = getEditAuditDateById(record.id);
		const updatedEditRecord = { ...record, editAuditstatus: !statusedit };

		setEditAuditDate((prevState) => {
			const index = prevState.findIndex((row) => row.id === record.id);
			if (editAuditDate) {
				return index !== -1
					? [...prevState.slice(0, index), updatedEditRecord, ...prevState.slice(index + 1)]
					: [...prevState, updatedEditRecord];
			} else {
				return index !== -1 ? prevState.filter((row) => row.id !== record.id) : prevState;
			}
		});
	};
	const updateAuditDateChange = (record, date) => {
		let editDateAudit = formatDate(date);
		updateAuditDate(record.id, editDateAudit);
		editauditdate(record);
	};
	const handleAuditDateChange = (record, date) => {
		const updatedRecord = { ...record, NewauditDate: formatDate(date) };

		setAuditDate((prevState) => {
			const index = prevState.findIndex((row) => row.id === record.id);
			if (date) {
				return index !== -1
					? [...prevState.slice(0, index), updatedRecord, ...prevState.slice(index + 1)]
					: [...prevState, updatedRecord];
			} else {
				return index !== -1 ? prevState.filter((row) => row.id !== record.id) : prevState;
			}
		});
	};

	const getNewAuditDateById = (id) => {
		const record = AuditDate.find((row) => row.id === id);
		return record ? record.NewauditDate : null;
	};
	const getEditAuditDateById = (id) => {
		const record = editAuditDate.find((row) => row.id === id);
		return record ? record.editAuditstatus : false;
	};
	function formatDate(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	const handleRemove = (id) => {
		setAuditDate((prevState) => prevState.filter((row) => row.id !== id));
	};

	const updatestatus = (assetId) => {
		const newAuditDate = getNewAuditDateById(assetId);
		updateAuditDate(assetId, newAuditDate);
	};

	const updateAuditDate = (assetId, newAuditDate) => {
		try {
			dispatch(assetAuditDateCreate(assetId, newAuditDate))
				.then((response) => {
					toast.success(response.data.message);
					dispatch(getPendingAssetAudit(selectedCategory));
				})
				.catch((error) => {
					toast.error(error.response.data.message);
				});
		} catch (error) {
			console.log(error);
			toast.error('Validation error', error);
		}
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
				if (record.auditDate) {
					return (
						<Grid item container spacing={0} columns={18} sx={{ color: '#454F5B', fontSize: '14px', fontWeight: '600' }}>
							{getEditAuditDateById(record.id) ? (
								<Grid item xs={16} sm={16} md={16} lg={11}>
									<Form.Item
										label={''}
										name="date"
										labelAlign="top"
										className="margin-bottom-0 field-set-border-0"
										labelCol={{ span: 24 }}
										sx={{ height: '50px' }}
										rules={[{ required: true, message: 'This field is required' }]}
									>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<Grid components={['DatePicker']}>
												<DatePicker
													label="Audit date not yet fixed"
													value={dayjs(record.auditDate)}
													format="YYYY-MM-DD"
													onChange={(e) => updateAuditDateChange(record, e)}
												/>
											</Grid>
										</LocalizationProvider>
									</Form.Item>
								</Grid>
							) : (
								<Grid item xs={10} sm={8} md={8} lg={10}>
									<span>
										Audit Yet to be Done <br></br>
										<ErrorOutlineIcon sx={{ fontSize: 14, color: '#adb6c0' }} />
										<small className="text-next-audit"> Next Audit will be {record.auditDateFormat}</small>
									</span>
								</Grid>
							)}
							<Grid item xs={2} sm={2} md={2} lg={2} className="display-flex-center">
								<ModeEditOutlineIcon
									className="cursor-pointer"
									onClick={() => editauditdate(record)}
									sx={{ fontSize: '16px' }}
								/>
							</Grid>
						</Grid>
					);
				} else {
					return (
						<Grid item container spacing={0} columns={18} sx={{ color: '#454F5B', fontSize: '14px', fontWeight: '600' }}>
							<Grid item xs={18} sm={18} md={18} lg={18}>
								{' '}
								<Form.Item
									label=""
									name="date"
									labelAlign="top"
									className="margin-bottom-0 field-set-border-0"
									labelCol={{ span: 24 }}
									sx={{ height: '50px' }}
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<Grid components={['DatePicker']}>
											<DatePicker
												label="Audit date not yet fixed"
												value={getNewAuditDateById(record.id)}
												format="YYYY-MM-DD"
												onChange={(e) => handleAuditDateChange(record, e)}
											/>
										</Grid>
									</LocalizationProvider>
								</Form.Item>
							</Grid>
						</Grid>
					);
				}
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
				if (record.auditDate) {
					return <Button className="btn-audit-disabled">Audit</Button>;
				} else {
					return (
						<Space>
							<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
								<Button
									color="success"
									size="small"
									className="w-unset btn-approve"
									onClick={() => updatestatus(record.id)}
									data-id={record.id}
								>
									<CheckIcon sx={{ fontSize: '16px' }} />
								</Button>
							</Grid>
							<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
								<Button
									color="error"
									size="small"
									className="w-unset btn-reject"
									onClick={() => handleRemove(record.id)}
									data-id={record.id}
								>
									<ClearIcon sx={{ fontSize: '16px' }} />
								</Button>
							</Grid>
							<Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
								<MoreVertIcon className="cursor-pointer" sx={{ fontSize: '16px' }} />
							</Grid>
						</Space>
					);
				}
			}
		}
	];

	const addSerialNumbers = (data) => {
		return data.map((item, index) => {
			return {
				...item,
				sno: index + 1 // Generating serial number starting from 1
			};
		});
	};
	const dataWithSerialNumbers = addSerialNumbers(AssetAudit);

	React.useEffect(() => {
		dispatch(getAllAssetCategoryDetails());
		dispatch(getPendingAssetAudit(selectedCategory));
		dispatch(getRequestAssetAuditPending());
	}, [dispatch, selectedCategory]);

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
								/>
							</Grid>

							{/* 2nd col */}
							<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
								<Select
									defaultValue="Asset Category"
									style={{ width: '100%', height: '33px' }}
									showSearch
									onChange={handleCategoryChange}
									options={AssetCategoryDetails.map((option) => ({
										value: option.assetClass,
										label: option.assetClass
									}))}
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
			<Table className="table-hd" columns={columns} dataSource={dataWithSerialNumbers} showSorterTooltip={false} />
		</>
	);
};

export default AuditPending;
