import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { Form, Input, Space, DatePicker, Select, Image } from 'antd';
import {
	//   DownloadOutlined,
	DeleteOutlined,
	RotateLeftOutlined,
	RotateRightOutlined,
	SwapOutlined,
	ZoomInOutlined,
	ZoomOutOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import QRCode from 'qrcode.react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assetEdit, getStockAndScrap } from 'components/redux/asset/action';
import { useDispatch, useSelector } from 'react-redux';
// import { API_BASE_URL } from '../../../constants/constants';
import { Grid } from '../../../../node_modules/@mui/material/index';
import Computeriamge from 'assets/images/users/computer.png';
import { TagsInput } from 'react-tag-input-component';
import { getCheckListByAssetClass, getChildIdToAudit } from 'components/redux/AssetAudit/action';
import { getAssetDetailsForAudit } from 'components/redux/asset/action';

const AssetDetails = ({ selectedAsset, geoLocation }) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const AssetData = useSelector((state) => state.AssetData && state.AssetData.AssetDetailsAudit);
	const CheckList = useSelector((state) => state.AssetAuditData && state.AssetAuditData.CheckListByAssetClass);
	const [radius, setRadius] = React.useState(null);
	useEffect(() => {
		dispatch(getAssetDetailsForAudit(selectedAsset.id, selectedAsset.companyId, selectedAsset.plant, selectedAsset.assetClass));
	}, [dispatch, selectedAsset.id, selectedAsset.companyId, selectedAsset.plant, selectedAsset.assetClass]);
	useEffect(() => {
		dispatch(getCheckListByAssetClass(selectedAsset.assetClass));
	}, [dispatch, selectedAsset.assetClass]);
	useEffect(() => {
		dispatch(getChildIdToAudit(selectedAsset.assetId, selectedAsset.plant, selectedAsset.companyId));
	}, [dispatch]);
	const ChildIdAudit = useSelector((state) => state.AssetAuditData && state.AssetAuditData.ChildIdAudit);
	const { RangePicker } = DatePicker;
	const dateFormat = 'YYYY/MM/DD';
	const editable = false;
	const currentDateto = dayjs();
	const formattedDateto = AssetData?.assetAgeingTo ? dayjs(AssetData?.assetAgeingTo, dateFormat) : dayjs(currentDateto, dateFormat);
	const formattedDatefrom = AssetData?.assetAgeingFrom ? dayjs(AssetData?.assetAgeingFrom, dateFormat) : null;
	// const [CurrentimageUrl, setCurrentImageUrl] = useState(
	// 	AssetData?.currentImageWithPath ? API_BASE_URL + AssetData?.currentImageWithPath : null
	// );
	// const [selected, setSelected] = React.useState([AssetData?.assetClass]);
	const { protocol, host } = window.location;
	const baseUrl = `${protocol}//${host}`;
	// const qrCodeValue = `${baseUrl}/asset_management_react/#/asset-audit-qr-details/${selectedAsset.id}/${selectedAsset.companyId}/${selectedAsset.plant}`;
	const qrCodeValue = `${baseUrl}/#/asset-audit-qr-details/${selectedAsset.id}/${selectedAsset.companyId}/${selectedAsset.plant}/${selectedAsset.assetClass}`;
	//   const downloadQRCode = () => {
	//     const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
	//     if (canvas) {
	//       const url = canvas.toDataURL();
	//       const a = document.createElement('a');
	//       a.download = 'QRCode.png';
	//       a.href = url;
	//       document.body.appendChild(a);
	//       a.click();
	//       document.body.removeChild(a);
	//     }
	//   };
	function calculateDistance(lat1, lon1, lat2, lon2) {
		const radius = 6371e3; // Earth radius in meters
		const x = toRadians(lat1); // Convert latitude 1 to radians
		const y = toRadians(lat2); // Convert latitude 2 to radians
		const xx = toRadians(lat2 - lat1); // Difference in latitudes in radians
		const yy = toRadians(lon2 - lon1); // Difference in longitudes in radians
		const a = Math.sin(xx / 2) * Math.sin(xx / 2) + Math.cos(x) * Math.cos(y) * Math.sin(yy / 2) * Math.sin(yy / 2);
		const calculation = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return radius * calculation;
	}

	function toRadians(degrees) {
		return degrees * (Math.PI / 180);
	}
	useEffect(() => {
		if (AssetData) {
			const {
				assetId,
				latitudeAndLongitude,
				costClassWise,
				assetClass,
				plant,
				serialNumber,
				assetStatus,
				assetAgeingFrom,
				assetLifetime,
				requiresAttention,
				upOrDowntime,
				warrantyStatus,
				noOfRoutinesExecuted,
				// costBasedMajorAsset,
				// costBasedMinorAsset,
				costOfAsset,
				estimatedSalvageValue,
				usefulLife,
				netProfitOrBenefit,
				costOfInvestment,
				totalBenefit,
				totalCost,
				revenueGenerated,
				beginningTotalAsset,
				endingTotalAsset,
				netIncome,
				returnOfInvestment,
				netBenefit,
				assetUtilization,
				// standardDep,
				returnOfAsset,
				expiryDate,
				description,
				costCenter,
				capitalizationDate,
				assetRetirementDate
			} = AssetData;

			form.setFieldsValue({
				assetQrCode: assetId,
				latitudeAndLongitude,
				assetId,
				costClassWise,
				assetClass,
				plant,
				serialNumber,
				assetStatus,
				assetAgeing: assetAgeingFrom ? [formattedDatefrom, formattedDateto] : null,
				assetLifetime,
				requiresAttention,
				upOrDowntime,
				warrantyStatus,
				noOfRoutinesExecuted,
				// costBasedMajorAsset,
				// costBasedMinorAsset,
				costOfAsset,
				estimatedSalvageValue,
				usefulLife,
				netProfitOrBenefit,
				costOfInvestment,
				totalBenefit,
				totalCost,
				revenueGenerated,
				beginningTotalAsset,
				endingTotalAsset,
				netIncome,
				depreciation: (Number(costOfAsset) - Number(estimatedSalvageValue)) / Number(usefulLife),
				returnOfInvestment,
				netBenefit,
				assetUtilization,
				averageTotalAsset: (Number(beginningTotalAsset) + Number(endingTotalAsset)) / 2,
				returnOfAsset,
				// standardDep,
				expiryDate: expiryDate ? dayjs(expiryDate, dateFormat) : null,
				description,
				costCenter,
				capitalizationDate: capitalizationDate ? dayjs(capitalizationDate, dateFormat) : null,
				assetRetirementDate: assetRetirementDate ? dayjs(assetRetirementDate, dateFormat) : null
			});
		}
		if (latitudeAndLongitude) {
			const radiusDist = calculateDistance(
				AssetData?.latitudeAndLongitude?.split('/')[0],
				AssetData?.latitudeAndLongitude?.split('/')[1],
				geoLocation?.latitude,
				geoLocation?.longitude
			);
			const radiusDis = parseFloat(radiusDist.toFixed(2));
			setRadius(radiusDis);
		}
	}, [AssetData, form]);

	const onFinish = () => {
		if (form.getFieldValue('latitudeAndLongitude') == 'null/null') {
			toast.error('Please give access for location.');
			return;
		}
		form.validateFields()
			.then((values) => {
				const formData = new FormData();
				for (const key in values) {
					if (Object.prototype.hasOwnProperty.call(values, key)) {
						const value = values[key];
						if (key === 'expiryDate' && value) {
							formData.append(key, formatDate(value));
						} else if (value) {
							formData.append(key, value);
						}
					}
				}
				formData.append('assetAgeingFrom', formatDate(values.assetAgeing[0]));
				formData.append('assetAgeingTo', formatDate(values.assetAgeing[1]));
				if (values.assetImage) {
					formData.append('imageUpload', values.assetImage.originFileObj);
				}
				formData.append('id', selectedAsset.id);
				handleViewAction();
				dispatch(assetEdit(formData))
					.then((response) => {
						toast.success(response.data.message);
						dispatch(getStockAndScrap(tableRefresh, selectedCategory, selectedAssetType));
					})
					.catch((error) => {
						toast.error(error.response.data.message);
					});
			})
			.catch((errorInfo) => {
				console.log('Validation failed:', errorInfo);
			});
	};
	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toISOString().split('T')[0];
	}

	return (
		<>
			<Box>
				<Form onFinish={onFinish} form={form} initialValues={form.getFieldsValue()}>
					<Grid item sx={{ ml: 3.6, mr: 3.6 }}>
						<Grid container spacing={2} columns={19}>
							<Grid item container>
								<h3>Asset Details</h3>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Asset Previous Image</span>}
									name="assetImage"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px' }}
								></Form.Item>
								{AssetData.pictureWithPath ? (
									<div>
										<Image
											src={AssetData.pictureWithPath}
											alt="Asset"
											style={{ width: '100.17px', height: '100.17px', borderRadius: '8px' }}
											disabled={true}
											preview={
												editable
													? false
													: {
															toolbarRender: (
																_,
																{
																	transform: { scale },
																	actions: {
																		onFlipY,
																		onFlipX,
																		onRotateLeft,
																		onRotateRight,
																		onZoomOut,
																		onZoomIn
																	}
																}
															) => (
																<Space size={12} className="toolbar-wrapper">
																	<SwapOutlined rotate={90} onClick={onFlipY} />
																	<SwapOutlined onClick={onFlipX} />
																	<RotateLeftOutlined onClick={onRotateLeft} />
																	<RotateRightOutlined onClick={onRotateRight} />
																	<ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
																	<ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
																</Space>
															)
													  }
											}
										/>
									</div>
								) : (
									<Image
										src={Computeriamge}
										alt="Asset"
										style={{ width: '100.17px', height: '100.17px', borderRadius: '8px' }}
										disabled={true}
										preview={
											editable
												? false
												: {
														toolbarRender: (
															_,
															{
																transform: { scale },
																actions: {
																	onFlipY,
																	onFlipX,
																	onRotateLeft,
																	onRotateRight,
																	onZoomOut,
																	onZoomIn
																}
															}
														) => (
															<Space size={12} className="toolbar-wrapper">
																<SwapOutlined rotate={90} onClick={onFlipY} />
																<SwapOutlined onClick={onFlipX} />
																<RotateLeftOutlined onClick={onRotateLeft} />
																<RotateRightOutlined onClick={onRotateRight} />
																<ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
																<ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
																<DeleteOutlined onClick={handleCancel} />
															</Space>
														)
												  }
										}
									/>
								)}
							</Grid>

							{/* <Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Asset Current Image</span>}
									name="assetImage"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px' }}
								></Form.Item>
								{CurrentimageUrl ? (
									<div>
										<Image
											src={CurrentimageUrl}
											alt="Asset"
											style={{ width: '100.17px', height: '100.17px', borderRadius: '8px' }}
											disabled={true}
											preview={
												editable
													? false
													: {
															toolbarRender: (
																_,
																{
																	transform: { scale },
																	actions: {
																		onFlipY,
																		onFlipX,
																		onRotateLeft,
																		onRotateRight,
																		onZoomOut,
																		onZoomIn
																	}
																}
															) => (
																<Space size={12} className="toolbar-wrapper">
																	<SwapOutlined rotate={90} onClick={onFlipY} />
																	<SwapOutlined onClick={onFlipX} />
																	<RotateLeftOutlined onClick={onRotateLeft} />
																	<RotateRightOutlined onClick={onRotateRight} />
																	<ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
																	<ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
																	<DeleteOutlined onClick={handleCancel} />
																</Space>
															)
													  }
											}
										/>
									</div>
								) : (
									<Image
										src={Computeriamge}
										alt="Asset"
										style={{ width: '100.17px', height: '100.17px', borderRadius: '8px' }}
										disabled={true}
										preview={
											editable
												? false
												: {
														toolbarRender: (
															_,
															{
																transform: { scale },
																actions: {
																	onFlipY,
																	onFlipX,
																	onRotateLeft,
																	onRotateRight,
																	onZoomOut,
																	onZoomIn
																}
															}
														) => (
															<Space size={12} className="toolbar-wrapper">
																<SwapOutlined rotate={90} onClick={onFlipY} />
																<SwapOutlined onClick={onFlipX} />
																<RotateLeftOutlined onClick={onRotateLeft} />
																<RotateRightOutlined onClick={onRotateRight} />
																<ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
																<ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
																<DeleteOutlined onClick={handleCancel} />
															</Space>
														)
												  }
										}
									/>
								)}
							</Grid> */}

							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Asset QR Code</span>}
									name="assetQrCode"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px' }}
								></Form.Item>
								<Space id="myqrcode">
									<QRCode size={100} style={{ height: 'auto' }} value={qrCodeValue} viewBox="0 0 100 100" />
									{/* <Button
                    style={{ color: '#919EAB', cursor: 'pointer' }}
                    onClick={downloadQRCode}
                    disabled={true}
                    startIcon={<DownloadOutlined style={{ fontSize: 24, color: '#919EAB' }} />}
                  >
                    <Typography.Text style={{ color: '#919EAB', marginLeft: 8 }}>Download QR Code</Typography.Text>
                  </Button> */}
								</Space>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3} sx={{ color: '#919EAB' }}>
								<Form.Item
									label={<span className="label-style">Previous Longitude & Latitude</span>}
									name="latitudeAndLongitude"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px', color: '#919EAB' }}
								>
									<Input
										style={{ height: '40px' }}
										name="latitudeAndLongitude"
										defaultValue={AssetData?.latitudeAndLongitude}
										disabled={true}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3} sx={{ color: '#919EAB' }}>
								<Form.Item
									label={<span className="label-style">Current Longitude & Latitude</span>}
									name="latitudeAndLongitudeCurrent"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px', color: '#919EAB' }}
								>
									<Input
										style={{ height: '40px' }}
										name="latitudeAndLongitudeCurrent"
										defaultValue={`${geoLocation?.latitude}/${geoLocation?.longitude}`}
										disabled={true}
									/>
								</Form.Item>
								{radius < 200 ? (
									<Form.Item
										label={<span style={{ color: '#19CC24' }}>Below 200m</span>}
										name="note"
										labelAlign="top"
										labelCol={{ span: 24 }}
										sx={{ width: 150, height: '40px' }}
										style={{ color: '#19CC24' }}
									></Form.Item>
								) : (
									<Form.Item
										label={<span style={{ color: '#ED2E22' }}>*Above 200m</span>}
										name="note"
										labelAlign="top"
										labelCol={{ span: 24 }}
										sx={{ width: 150, height: '40px' }}
										style={{ color: '#ED2E22' }}
									></Form.Item>
								)}
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3} sx={{ color: '#919EAB' }}>
								<Form.Item
									label={<span className="label-style">Comment</span>}
									name="comment"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px', color: '#919EAB' }}
								>
									<Input style={{ height: '40px' }} name="comment" />
								</Form.Item>
							</Grid>
						</Grid>
						{/* 1st row */}
						<Grid item container spacing={2} columns={19}>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Asset ID</span>}
									name="assetId"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px' }}
								>
									<Input style={{ height: '40px' }} defaultValue={AssetData?.assetId} disabled={true} readOnly={true} />
								</Form.Item>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Cost Class wise</span>}
									name="costClassWise"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px' }}
								>
									<Input style={{ height: '40px' }} defaultValue={AssetData?.costClassWise} disabled={true} />
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Asset class</span>}
									name="assetClass"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.assetClass}
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Plant</span>}
									name="plant"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px' }}
								>
									<Input style={{ height: '40px' }} defaultValue={AssetData?.plant} disabled={true} readOnly={true} />
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Serial No</span>}
									name="serialNumber"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px' }}
								>
									<Input style={{ height: '40px' }} defaultValue={AssetData?.serialNumber} disabled={true} />
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Status</span>}
									name="assetStatus"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px' }}
								>
									<Select
										defaultValue={AssetData?.assetStatus}
										style={{ height: '40px' }}
										showSearch
										options={[
											{ value: 'Online', label: 'Online' },
											{ value: 'Offline', label: 'Offline' },
											{ value: 'Scrapped', label: 'Scrapped' },
											{ value: 'Maintenance', label: 'Maintenance' }
										]}
										disabled={true}
									/>
								</Form.Item>
							</Grid>
						</Grid>
						{/* 2nd row */}
						<Grid item container spacing={2} columns={19}>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Asset Ageing</span>}
									name="assetAgeing"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<RangePicker
										style={{ height: '40px', width: '100%' }}
										format="DD-MM-YYYY"
										defaultValue={AssetData?.assetAgeingFrom ? [formattedDatefrom, formattedDateto] : null}
										disabled={true}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Asset Lifetime</span>}
									name="assetLifetime"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.assetLifetime}
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Requires Attention</span>}
									name="requiresAttention"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input style={{ height: '40px' }} defaultValue={AssetData?.requiresAttention} disabled={true} />
								</Form.Item>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">UP/Downtime</span>}
									name="upOrDowntime"
									labelAlign="top"
									labelCol={{ span: 24 }}
									item
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.upOrDowntime}
										disabled={true}
										type="number"
										className="no-spinner"
									/>
								</Form.Item>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Warranty Status</span>}
									name="warrantyStatus"
									labelAlign="top"
									labelCol={{ span: 24 }}
									item
									sx={{ width: 150, height: '50px' }}
								>
									<Input style={{ height: '40px' }} defaultValue={AssetData?.warrantyStatus} disabled={true} />
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">No of Routines Executed</span>}
									name="noOfRoutinesExecuted"
									labelAlign="top"
									labelCol={{ span: 24 }}
									item
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.noOfRoutinesExecuted}
										disabled={true}
										type="number"
										className="no-spinner"
									/>
								</Form.Item>
							</Grid>
						</Grid>
						{/* 3rd row */}
						<Grid item container spacing={2} columns={19}>
							{/* <Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Cost Based Major Asset</span>}
									name="costBasedMajorAsset"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.costBasedMajorAsset}
										disabled={true}
										type="number"
										className="no-spinner"
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Cost Based Minor Asset</span>}
									name="costBasedMinorAsset"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.costBasedMinorAsset}
										disabled={true}
										type="number"
										className="no-spinner"
									/>
								</Form.Item>
							</Grid> */}

							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Cost of Asset</span>}
									name="costOfAsset"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.costOfAsset}
										type="number"
										name="costOfAsset"
										className="no-spinner"
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>
							{/* <Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Standard Dep%</span>}
									name="standardDep"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										name="standardDep"
										defaultValue={AssetData?.standardDep}
										type="number"
										className="no-spinner"
										disabled={true}
									/>
								</Form.Item>
							</Grid> */}
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Estimated Salvage Value</span>}
									name="estimatedSalvageValue"
									labelAlign="top"
									labelCol={{ span: 24 }}
									item
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.estimatedSalvageValue}
										type="number"
										name="estimatedSalvageValue"
										className="no-spinner"
										disabled={true}
									/>
								</Form.Item>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Useful Life</span>}
									name="usefulLife"
									labelAlign="top"
									labelCol={{ span: 24 }}
									item
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.usefulLife}
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Net Profit or Benefit</span>}
									name="netProfitOrBenefit"
									labelAlign="top"
									labelCol={{ span: 24 }}
									item
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.netProfitOrBenefit}
										name="netProfitOrBenefit"
										type="number"
										className="no-spinner"
										disabled={true}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Cost of Inverstment</span>}
									name="costOfInvestment"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.costOfInvestment}
										name="costOfInvestment"
										type="number"
										className="no-spinner"
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>
						</Grid>
						{/* 4th row */}
						<Grid item container spacing={2} columns={19}>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Total Benefit</span>}
									name="totalBenefit"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.totalBenefit}
										name="totalBenefit"
										type="number"
										className="no-spinner"
										disabled={true}
									/>
								</Form.Item>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Total Cost</span>}
									name="totalCost"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.totalCost}
										name="totalCost"
										type="number"
										className="no-spinner"
										disabled={true}
									/>
								</Form.Item>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Revenue Generated</span>}
									name="revenueGenerated"
									labelAlign="top"
									labelCol={{ span: 24 }}
									item
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.revenueGenerated}
										name="revenueGenerated"
										type="number"
										className="no-spinner"
										disabled={true}
									/>
								</Form.Item>
							</Grid>

							{/* <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Form.Item
                                    label={<span className="label-style">Average Total Asset</span>}
                                    name="averageTotalAsset"
                                    labelAlign="top"
                                    labelCol={{ span: 24 }}
                                    item
                                    sx={{ width: 150, height: '50px' }}
                                >
                                    <Input
                                        style={{ height: '40px' }}
                                        defaultValue={AssetData?.averageTotalAsset}
                                        name="averageTotalAsset"
                                        type="number"
                                        className="no-spinner"
                                        
                                    />
                                </Form.Item>
                            </Grid> */}
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Begining Total Asset</span>}
									name="beginningTotalAsset"
									labelAlign="top"
									labelCol={{ span: 24 }}
									item
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.beginningTotalAsset}
										name="beginningTotalAsset"
										type="number"
										className="no-spinner"
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Ending Total Asset</span>}
									name="endingTotalAsset"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.endingTotalAsset}
										name="endingTotalAsset"
										type="number"
										className="no-spinner"
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Net Income</span>}
									name="netIncome"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.netIncome}
										name="netIncome"
										type="number"
										className="no-spinner"
										disabled={true}
									/>
								</Form.Item>
							</Grid>
						</Grid>
						{/* 5th row */}
						<Grid item container spacing={2} columns={19}>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Depreciation</span>}
									name="depreciation"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={
											(Number(AssetData?.costOfAsset) - Number(AssetData?.estimatedSalvageValue)) /
											Number(AssetData?.usefulLife)
										}
										type="number"
										name="depreciation"
										className="no-spinner"
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Return of Investment</span>}
									name="returnOfInvestment"
									labelAlign="top"
									labelCol={{ span: 24 }}
									item
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.returnOfInvestment}
										name="returnOfInvestment"
										type="number"
										className="no-spinner"
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Net Benefit</span>}
									name="netBenefit"
									labelAlign="top"
									labelCol={{ span: 24 }}
									item
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.netBenefit}
										name="netBenefit"
										type="number"
										className="no-spinner"
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Asset Utilization</span>}
									name="assetUtilization"
									labelAlign="top"
									labelCol={{ span: 24 }}
									item
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.assetUtilization}
										name="assetUtilization"
										type="number"
										className="no-spinner"
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Average Total Asset</span>}
									name="averageTotalAsset"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={(Number(AssetData.beginningTotalAsset) + Number(AssetData.endingTotalAsset)) / 2}
										name="averageTotalAsset"
										type="number"
										className="no-spinner"
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Return Of Asset</span>}
									name="returnOfAsset"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.returnOfAsset}
										name="returnOfAsset"
										type="number"
										className="no-spinner"
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>
						</Grid>
						{/* 6th row */}
						<Grid item container spacing={2} columns={19}>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Expired Date</span>}
									name="expiryDate"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<DatePicker
										style={{ height: '40px', width: '100%' }}
										format="DD-MM-YYYY"
										name="expiryDate"
										className="no-spinner"
										disabled={true}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Asset Description</span>}
									name="description"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.description}
										name="description"
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Cost Center</span>}
									name="costCenter"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={AssetData?.returnOfAsset}
										name="costCenter"
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Capitalization Date</span>}
									name="capitalizationDate"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<DatePicker
										style={{ height: '40px', width: '100%' }}
										format="DD-MM-YYYY"
										name="capitalizationDate"
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Asset Retirement Date</span>}
									name="assetRetirementDate"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
								>
									<DatePicker
										style={{ height: '40px', width: '100%' }}
										format="DD-MM-YYYY"
										name="assetRetirementDate"
										disabled={true}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>
						</Grid>
						<Grid item container spacing={2} columns={19}>
							<Grid item xs={16} sm={16} md={16} lg={16} classNames="mtb-10 class-checklist">
								{' '}
								<span className="label-style mb-10">Class Checklist</span>
								<TagsInput
									value={CheckList && CheckList.checkList ? Object.values(CheckList.checkList) : []}
									name="classChecklist"
									disabled={true}
								/>
							</Grid>
						</Grid>
						<Grid item container>
							<h3>Asset Child Details</h3>
						</Grid>
						<Grid item container spacing={2} columns={19}>
							{ChildIdAudit && ChildIdAudit.length > 0
								? ChildIdAudit.map((item, index) =>
										item.childId !== null ? (
											<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
												<Form.Item
													label={<span className="label-style">Child {index + 1}</span>}
													name={`child${index + 1}`} // Fixed syntax issue here
													labelAlign="top"
													labelCol={{ span: 24 }}
													sx={{ width: 150, height: '50px' }}
												>
													<Input
														style={{ height: '40px' }}
														defaultValue={item.childId}
														name={`child${index + 1}`} // Fixed syntax issue here
														type="number"
														className="no-spinner"
														disabled={true}
														readOnly={true}
													/>
												</Form.Item>
											</Grid>
										) : (
											''
										)
								  )
								: ''}
						</Grid>
					</Grid>
				</Form>
			</Box>
		</>
	);
};
export default AssetDetails;
