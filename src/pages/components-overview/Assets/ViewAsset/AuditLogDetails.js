/* eslint-disable react/prop-types */
import React from 'react';
import Box from '@mui/material/Box';
import { Chip, Grid } from '../../../../../node_modules/@mui/material/index';
import { Form, Timeline, Col, Row, Space, Flex } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAuditByAssetId } from 'components/redux/AssetAudit/action';
// import { API_BASE_URL } from '../../../../constants/constants';
import dayjs from 'dayjs';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ReactComponent as Location } from 'assets/images/icons/location.svg';
import Computeriamge from 'assets/images/users/computer.png';
// import QRCode from 'react-qr-code';
// import { DownloadOutlined } from '@ant-design/icons';

const AuditLogDetails = ({ selectedAsset, AssetId }) => {
	const dispatch = useDispatch();
	const AssetAudit = useSelector((state) => state.AssetAuditData && state.AssetAuditData.AuditByAssetId);
	React.useEffect(() => {
		if (AssetId) {
			dispatch(getAuditByAssetId(AssetId));
		}
	}, [dispatch, selectedAsset]);
	const baseStyle = {
		width: '40px',
		height: 54
	};
	const baselocationStyle = {
		width: '30px',
		height: 54
	};
	return (
		<>
			<Box>
				<Form>
					<Grid item sx={{ ml: 3.6, mr: 3.6 }}>
						<Grid container spacing={2} columns={16}>
							<Grid item container>
								<pre style={{ display: 'inline' }}>
									<h4 style={{ display: 'inline', marginRight: '5px' }}>Audit details for </h4>
									<p style={{ display: 'inline', color: 'blue' }}>{AssetId}</p>
								</pre>
							</Grid>
						</Grid>

						{/* 5th row */}
						<Grid>
							<Timeline>
								{AssetAudit
									? AssetAudit.map((option, index) => (
											<Timeline.Item key={option.id}>
												Audit {index + 1} | {dayjs(option.auditDate).format('DD MMM YYYY')}
												<div className="box-timeline-list">
													<Row>
														<Col
															span={5}
															xs={{
																span: 5
															}}
															sm={{
																span: 8
															}}
															md={{
																span: 5
															}}
															lg={{
																span: 5
															}}
														>
															{option.previewImageWithPath ? (
																<Space size="middle">
																	<img
																		src={option.previewImageWithPath}
																		alt="Previous"
																		style={{ width: '30px', height: '30px', borderRadius: '3px'}}
																	/>
																</Space>
															) : (
																<Space size="middle">
																	<img src={Computeriamge} alt="Previous Img" style={{ width: '30px' }} />
																</Space>
															)}
															<br></br>
															<small className="text-grey-label">Previous Image</small>
														</Col>
														<Col
															span={5}
															xs={{
																span: 5
															}}
															sm={{
																span: 8
															}}
															md={{
																span: 5
															}}
															lg={{
																span: 5
															}}
														>
															<Space size="middle">
																<img
																	src={option.currentImageWithPath}
																	alt={'Current img'}
																	style={{ width: '30px', height: '30px' ,borderRadius: '3px' }}
																/>
															</Space>
															<br></br>
															<small className="text-grey-label">Current Image</small>
														</Col>
														<Col
															span={5}
															xs={{
																span: 5
															}}
															sm={{
																span: 8
															}}
															md={{
																span: 5
															}}
															lg={{
																span: 5
															}}
														>
															<Flex gap="small">
																<Flex>
																	<div
																		style={{
																			...baseStyle
																		}}
																	>
																		<Chip className="mpl-0" icon={<PersonIcon />} label={false} />
																	</div>
																	<div className="margin-left-5px">
																		<b>{option.auditBy?.fullName || ''}</b>
																		<br></br>
																		<small className="text-grey-label">
																			{option.auditBy?.role || ''} | {option.auditBy?.domain || ''}
																		</small>
																	</div>
																</Flex>
															</Flex>
														</Col>
														<Col
															span={5}
															xs={{
																span: 5
															}}
															sm={{
																span: 8
															}}
															md={{
																span: 5
															}}
															lg={{
																span: 5
															}}
														>
															<Flex gap="small">
																<Flex>
																	<div
																		style={{
																			...baselocationStyle
																		}}
																	>
																		<Chip className="mpl-0" icon={<Location />} label={false} />
																	</div>
																	<div className="margin-left-5px">
																		<b>{option.plant || ''}</b>
																		<br></br>
																		<small className="text-grey-label">
																			{option.auditBy?.city || ''}
																		</small>
																	</div>
																</Flex>
															</Flex>
														</Col>
														{option.withCondition ? (
															<Col
																span={4}
																xs={{ span: 4 }}
																sm={{ span: 8 }}
																md={{ span: 4 }}
																lg={{ span: 4 }}
															>
																<Flex gap="small">
																	<Flex>
																		<div style={{ ...baselocationStyle }}>
																			<Chip
																				className="mpl-0"
																				icon={<CheckCircleOutlineIcon />}
																				label={false}
																			/>
																		</div>
																		<div className="margin-left-5px">
																			<b>With Condition</b>
																			<br />
																			<small className="text-grey-label">Yes</small>
																		</div>
																	</Flex>
																</Flex>
															</Col>
														) : null}
													</Row>
												</div>
											</Timeline.Item>
									  ))
									: null}
							</Timeline>
						</Grid>
					</Grid>
				</Form>
			</Box>
		</>
	);
};
export default AuditLogDetails;
