import React, { useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import { Image, Layout, theme, List, Button, Space, Tag, Skeleton, Grid as AntGrid } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
// import { API_BASE_URL } from '../../../constants/constants';
import { getAssetDetailsForAudit } from 'components/redux/asset/action';
import { getCheckListToAudit, getChildIdToAudit } from 'components/redux/AssetAudit/action';
import { useDispatch, useSelector } from 'react-redux';
import VirtualList from 'rc-virtual-list';
import moment from 'moment';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = AntGrid;
const AssetQrDetails = ({ assetId, company, plant, assetClass }) => {
	const screens = useBreakpoint();
	const {
		token: { colorBgContainer, borderRadiusLG }
	} = theme.useToken();
	const editAble = true;
	const dispatch = useDispatch();
	useEffect(() => {
		handleLatLong();
		dispatch(getAssetDetailsForAudit(assetId, company, plant, assetClass));
		dispatch(getCheckListToAudit(assetClass, plant, company));
		dispatch(getChildIdToAudit(assetId, plant, company));
	}, [dispatch]);
	const AssetList = useSelector((state) => state.AssetData.AssetDetailsAudit);
	const AssetCheckList = useSelector((state) => state.AssetAuditData && state.AssetAuditData.CheckListAudit);
	const ChildIdAudit = useSelector((state) => state.AssetAuditData && state.AssetAuditData.ChildIdAudit);
	const detailsCheckList = AssetCheckList.checkList;
	const formattedDateto = AssetList.assetAgeingTo ? moment(AssetList.assetAgeingTo).format('DD-MM-YYYY') : '';
	const formattedDatefrom = AssetList.assetAgeingFrom ? moment(AssetList.assetAgeingFrom).format('DD-MM-YYYY') : '';
	const currentLatLong = useRef();
	const handleLatLong = () => {
		if (!('geolocation' in navigator)) {
			console.log('Geolocation is not available in your browser.');
			return;
		}
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				currentLatLong.current = `${latitude}/${longitude}`;
			},
			(error) => {
				if (error.code === error.PERMISSION_DENIED) {
					toast.error('Please give access for location.');
				} else {
					console.error('Error getting geolocation:', error);
				}
			}
		);
	};
	const data = [
		{
			title: 'Previous Longitude & Latitude',
			key: AssetList.latitudeAndLongitude ? AssetList.latitudeAndLongitude : null
		},
		{
			title: 'Current Longitude & Latitude',
			key: currentLatLong.current
		},
		{
			title: 'Asset ID',
			key: AssetList.assetId
		},
		{
			title: 'Cost Class wise',
			key: AssetList.costClassWise
		},
		{
			title: 'Asset class',
			key: AssetList.assetClass
		},
		{
			title: 'Plant',
			key: AssetList.plant
		},
		{
			title: 'Serial No',
			key: AssetList.serialNumber
		},
		{
			title: 'Status',
			key: AssetList.assetStatus
		},
		{
			title: 'Asset Ageing',
			key: AssetList.assetAgeingFrom ? formattedDatefrom + '-' + formattedDateto : null
		},
		{
			title: 'Asset Lifetime',
			key: AssetList.assetLifetime
		},
		{
			title: 'Requires Attention',
			key: AssetList.requiresAttention
		},
		{
			title: 'UP/Downtime',
			key: AssetList.upOrDowntime
		},
		{
			title: 'Warranty Status',
			key: AssetList.warrantyStatus
		},
		{
			title: 'No of Routines Executed',
			key: AssetList.noOfRoutinesExecuted
		},
		// {
		// 	title: 'Cost Based Major Asset',
		// 	key: AssetList.costBasedMajorAsset
		// },
		// {
		// 	title: 'Cost Based Minor Asset',
		// 	key: AssetList.costBasedMinorAsset
		// },
		{
			title: 'Cost of Asset',
			key: AssetList.costOfAsset
		},
		// {
		// 	title: 'Standard Dep%',
		// 	key: AssetList.standardDep
		// },
		{
			title: 'Estimated Salvage Value',
			key: AssetList.estimatedSalvageValue
		},
		{
			title: 'Useful Life',
			key: AssetList.usefulLife
		},
		{
			title: 'Net Profit or Benefit',
			key: AssetList.netProfitOrBenefit
		}
	];
	const dataRight = [
		{
			title: 'Cost of Inverstment',
			key: AssetList.costOfInvestment
		},
		{
			title: 'Total Benefit',
			key: AssetList.totalBenefit
		},
		{
			title: 'Total Cost',
			key: AssetList.totalCost
		},
		{
			title: 'Revenue Generated',
			key: AssetList.revenueGenerated
		},
		{
			title: 'Begining Total Asset',
			key: AssetList.beginningTotalAsset
		},
		{
			title: 'Ending Total Asset',
			key: AssetList.endingTotalAsset
		},
		{
			title: 'Net Income',
			key: AssetList.netIncome
		},
		{
			title: 'Depreciation',
			key: (Number(AssetList.costOfAsset) - Number(AssetList.estimatedSalvageValue)) / Number(AssetList.usefulLife)
		},
		{
			title: 'Return of Investment',
			key: AssetList.returnOfInvestment
		},
		{
			title: 'Net Benefit',
			key: AssetList.netBenefit
		},
		{
			title: 'Asset Utilization',
			key: AssetList.assetUtilization
		},
		{
			title: 'Average Total Asset',
			key: (Number(AssetList.beginningTotalAsset) + Number(AssetList.endingTotalAsset)) / 2
		},
		{
			title: 'Return Of Asset',
			key: AssetList.returnOfAsset
		},
		{
			title: 'Expired Date',
			key: AssetList.expiryDate ? moment(AssetList.expiryDate).format('DD-MM-YYYY') : ''
		},
		{
			title: 'Asset Description',
			key: AssetList.description
		},
		{
			title: 'Cost Center',
			key: AssetList.costCenter
		},
		{
			title: 'Capitalization Date',
			key: AssetList.capitalizationDate ? moment(AssetList.capitalizationDate).format('DD-MM-YYYY') : ''
		},
		{
			title: 'Asset Retirement Date',
			key: AssetList.assetRetirementDate ? moment(AssetList.assetRetirementDate).format('DD-MM-YYYY') : ''
		}
	];

	const Flex = styled.div`
		display: flex;
		flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
		gap: ${({ gap }) => gap || '0'};
	`;

	const Box = styled.div`
		background: ${(props) => props.theme.colorBgContainer || '#fff'};
		border-radius: ${(props) => props.theme.borderRadiusLG || '8px'};
	`;

	const HeaderContent = styled.div`
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	`;
	return (
		<>
			{AssetList ? (
				<Layout>
					<Header
						style={{
							color: 'rgba(0, 0, 0, 0.88)',
							background: '#ffffff',
							top: 0,
							zIndex: 1,
							width: '100%',
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<h3>Asset QR Code Scan Details</h3>
					</Header>
					{''}
					<Content style={{ padding: '0 48px', paddingTop: '48px' }}>
						<Box>
							<div
								style={{
									padding: 24,
									minHeight: 380,
									background: colorBgContainer,
									borderRadius: borderRadiusLG
								}}
							>
								<Grid container spacing={2} columns={16} style={{ marginBottom: '24px' }}>
									<Grid item xs={12} sm={6} md={4} lg={3} style={{ overFlow: 'hidden' }}>
										<Image
											src={AssetList.picture ? AssetList.pictureWithPath : null}
											alt="Asset"
											style={{ width: '204px', height: '205px', borderRadius: '8px' }}
											disabled={editAble}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid
										item
										xs={12}
										md={6}
										style={{
											borderRight: '1px solid #ddd',
											borderTop: '1px solid #ddd',
											borderBottom: '1px solid #ddd',
											paddingTop: '0px'
										}}
										className="list-border"
									>
										<List>
											<VirtualList data={data} itemHeight={47} itemKey="title">
												{(item) => (
													<List.Item style={{ paddingRight: '10px' }}>
														<List.Item.Meta style={{ color: '#919EAB !important' }} title={item.title} />
														<div>{item.key}</div>
													</List.Item>
												)}
											</VirtualList>
										</List>
									</Grid>
									<Grid
										item
										xs={12}
										md={6}
										style={{
											borderTop: '1px solid #ddd',
											borderBottom: '1px solid #ddd',
											paddingRight: '10px',
											paddingLeft: '0px',
											paddingTop: '0px'
										}}
										className="list-border"
									>
										<List>
											<VirtualList data={dataRight} itemHeight={47} itemKey="title">
												{(item) => (
													<List.Item style={{ paddingLeft: '10px' }}>
														<List.Item.Meta style={{ color: '#919EAB !important' }} title={item.title} />
														<div>{item.key}</div>
													</List.Item>
												)}
											</VirtualList>
										</List>
									</Grid>
								</Grid>
								<Space direction="vertical" style={{ width: '100%' }}>
									<div
										style={{
											color: 'rgba(0, 0, 0, 0.88)',
											background: '#ffffff',
											top: 0,
											zIndex: 1,
											width: '100%',
											display: 'flex',
											flexDirection: screens.xs ? 'column' : 'row',
											alignItems: 'center',
											paddingLeft: '0px',
											paddingRight: '0px'
										}}
									>
										<h3>Check List: </h3>
										<span>
											<Space wrap>
												{detailsCheckList && detailsCheckList.length > 0 ? (
													detailsCheckList.map((item, index) =>
														item !== null ? (
															<Button key={index} className="table-value-badge">
																{item}
															</Button>
														) : null
													)
												) : (
													<Tag>{detailsCheckList}</Tag>
												)}
											</Space>
										</span>
									</div>

									<div
										style={{
											color: 'rgba(0, 0, 0, 0.88)',
											background: '#ffffff',
											top: 0,
											zIndex: 1,
											width: '100%',
											display: 'flex',
											flexDirection: screens.xs ? 'column' : 'row',
											alignItems: 'center',
											paddingLeft: '0px',
											paddingRight: '0px'
										}}
									>
										<h3>ChildId List: </h3>
										<span>
											<Space wrap>
												{ChildIdAudit && ChildIdAudit.length > 0 ? (
													ChildIdAudit.map((item, index) =>
														item.childId !== null ? (
															<Button key={index} className="table-value-badge">
																{item.childId}
															</Button>
														) : null
													)
												) : (
													<Tag>{ChildIdAudit}</Tag>
												)}
											</Space>
										</span>
									</div>
								</Space>
							</div>
						</Box>
					</Content>
					<Footer
						style={{
							textAlign: 'center'
						}}
					>
						{' '}
					</Footer>
				</Layout>
			) : (
				<Layout>
					<Header
						style={{
							color: 'rgba(0, 0, 0, 0.88)',
							background: '#ffffff',
							top: 0,
							zIndex: 1,
							width: '100%',
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<h3>Asset QR Code Scan Details</h3>
					</Header>
					<Content style={{ padding: '0 48px', paddingTop: '48px' }}>
						<Box>
							<div
								style={{
									padding: 24,
									minHeight: 380,
									background: colorBgContainer,
									borderRadius: borderRadiusLG
								}}
							>
								<Grid container spacing={2} columns={16} style={{ marginBottom: '24px' }}>
									<Grid item xs={12} sm={6} md={4} lg={3} style={{ overflow: 'hidden' }}>
										<Skeleton.Image active={loading}>
											<Image
												src={AssetList.picture ? AssetList.pictureWithPath : null}
												alt="Asset"
												style={{ width: '204px', height: '205px', borderRadius: '8px' }}
												disabled={editAble}
											/>
										</Skeleton.Image>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid
										item
										xs={12}
										md={6}
										style={{
											borderRight: '1px solid #ddd',
											borderTop: '1px solid #ddd',
											borderBottom: '1px solid #ddd',
											paddingTop: '0px'
										}}
										className="list-border"
									>
										<Skeleton active loading={loading} paragraph={{ rows: 4 }}>
											<List>
												<VirtualList data={data} itemHeight={47} itemKey="title">
													{(item) => (
														<List.Item style={{ paddingRight: '10px' }}>
															<List.Item.Meta style={{ color: '#919EAB !important' }} title={item.title} />
															<div>{item.key}</div>
														</List.Item>
													)}
												</VirtualList>
											</List>
										</Skeleton>
									</Grid>
									<Grid
										item
										xs={12}
										md={6}
										style={{
											borderTop: '1px solid #ddd',
											borderBottom: '1px solid #ddd',
											paddingRight: '10px',
											paddingLeft: '0px',
											paddingTop: '0px'
										}}
										className="list-border"
									>
										<Skeleton active loading={loading} paragraph={{ rows: 4 }}>
											<List>
												<VirtualList data={dataRight} itemHeight={47} itemKey="title">
													{(item) => (
														<List.Item style={{ paddingLeft: '10px' }}>
															<List.Item.Meta style={{ color: '#919EAB !important' }} title={item.title} />
															<div>{item.key}</div>
														</List.Item>
													)}
												</VirtualList>
											</List>
										</Skeleton>
									</Grid>
								</Grid>
								<Space direction="vertical" style={{ width: '100%' }}>
									<Header
										style={{
											color: 'rgba(0, 0, 0, 0.88)',
											background: '#ffffff',
											top: 0,
											zIndex: 1,
											width: '100%',
											display: 'flex',
											alignItems: 'center',
											paddingLeft: '0px',
											paddingRight: '0px'
										}}
									>
										<HeaderContent>
											<h3>Check List:</h3>
											<span>
												<Flex gap="4px" wrap="wrap">
													<Skeleton active loading={loading} paragraph={{ rows: 1 }}>
														{detailsCheckList && detailsCheckList.length > 0 ? (
															detailsCheckList.map((item, index) =>
																item !== null ? (
																	<Button key={index} className="table-value-badge mr-3 ml-3">
																		{item}
																	</Button>
																) : null
															)
														) : (
															<Tag>No details available</Tag>
														)}
													</Skeleton>
												</Flex>
											</span>
										</HeaderContent>
									</Header>
									<Header
										style={{
											color: 'rgba(0, 0, 0, 0.88)',
											background: '#ffffff',
											top: 0,
											zIndex: 1,
											width: '100%',
											display: 'flex',
											alignItems: 'center',
											paddingLeft: '0px',
											paddingRight: '0px'
										}}
									>
										<HeaderContent>
											<h3>ChildId List:</h3>
											<span>
												<Flex gap="4px" wrap="wrap">
													<Skeleton active loading={loading} paragraph={{ rows: 1 }}>
														{ChildIdAudit && ChildIdAudit.length > 0 ? (
															ChildIdAudit.map((item, index) =>
																item.childId !== null ? (
																	<Button key={index} className="table-value-badge mr-3 ml-3">
																		{item.childId}
																	</Button>
																) : null
															)
														) : (
															<Tag>No ChildId available</Tag>
														)}
													</Skeleton>
												</Flex>
											</span>
										</HeaderContent>
									</Header>
								</Space>
							</div>
						</Box>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Footer content here</Footer>
				</Layout>
			)}
		</>
	);
};
export default AssetQrDetails;
