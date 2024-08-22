import React from 'react';
import { Table } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { getAssetActivity } from 'components/redux/AssetReport/action';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '../../../../node_modules/@mui/material/index';

const AssetActivityReport = () => {
	const dispatch = useDispatch();
	const AssetActivity = useSelector((state) => state.AssetReportData && state.AssetReportData.AssetActivityList);

	const columns = [
		{
			dataIndex: 'name',
			key: 'name',
			title: <span className="table-hd-fs">Asset </span>,
			sorter: {
				compare: (a, b) => a.name.localeCompare(b.name),
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
			title: <span className="table-hd-fs">Employee</span>,
			dataIndex: 'assetCategory',
			key: 'assetCategory',
			render: (_, record) => (
				<span>
					{record.employeeName}
					<br></br>
					{record.employeeId}
				</span>
			),
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
			title: <span className="table-hd-fs">Location</span>,

			dataIndex: 'location',
			key: 'location',
			sorter: {
				compare: (a, b) => a.location.localeCompare(b.location),
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
			title: <span className="table-hd-fs">Date</span>,

			dataIndex: 'date',
			key: 'date',
			render: (_, record) => {
				if (record.allocateDate) {
					return (
						<span>
							Allocated Date : {record.allocateDate}
							<br />
							{record.reason}
						</span>
					);
				}
				if (record.retrialDate) {
					return (
						<span>
							Retiral Date : {record.retrialDate}
							<br />
							{record.reason}
						</span>
					);
				}
				if (record.getBackDate) {
					return (
						<span>
							Get Back Date : {record.getBackDate}
							<br />
							{record.reason}
						</span>
					);
				}

				return null;
			}
		}
	];

	React.useEffect(() => {
		dispatch(getAssetActivity());
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
						<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus"></Grid>
						{/* 3nd  col*/}
						<Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus"></Grid>
						{/* 4th col */}
						{/* 5th col */}

						<Grid item lg={6} sm={4}></Grid>
					</Grid>
				</Toolbar>
			</Container>
			<Table className="table-hd" columns={columns} dataSource={AssetActivity} />
		</>
	);
};

export default AssetActivityReport;
