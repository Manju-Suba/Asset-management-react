import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid } from '../../../../../node_modules/@mui/material/index';
import { Form, Input, Upload, Space, Typography, DatePicker, Select, Button as Btn, Image } from 'antd';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import {
	DownloadOutlined,
	DeleteOutlined,
	RotateLeftOutlined,
	RotateRightOutlined,
	SwapOutlined,
	ZoomInOutlined,
	ZoomOutOutlined,
	RetweetOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import QRCode from 'qrcode.react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assetEdit, getStockAndScrap } from 'components/redux/asset/action';
import { getChildIdToAudit } from 'components/redux/AssetAudit/action';
import { useDispatch, useSelector } from 'react-redux';
// import { QR_PORT } from '../../../../constants/constants';
import moment from 'moment';

const AssetDetail = ({ selectedAsset, geoLocation, editAble, handleViewAction, selectedCategory, selectedAssetType, tableRefresh }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const updatedAsset = useRef(selectedAsset);
	const { RangePicker } = DatePicker;
	const dateFormat = 'YYYY/MM/DD';
	const currentDateto = dayjs();
	const formattedDateto = selectedAsset.assetAgeingTo ? dayjs(selectedAsset.assetAgeingTo, dateFormat) : dayjs(currentDateto, dateFormat);
	const formattedDatefrom = selectedAsset.assetAgeingFrom ? dayjs(selectedAsset.assetAgeingFrom, dateFormat) : null;
	const [imageUrl, setImageUrl] = useState(selectedAsset.picture ? selectedAsset.pictureWithPath : null);
	const { protocol, host } = window.location;
	const baseUrl = `${protocol}//${host}`;
	// const qrCodeValue = `${baseUrl}/asset_management_react/#/asset-qr-details/${selectedAsset.id}/${selectedAsset.companyId}/${selectedAsset.plant}`;
	// for QA
	// const qrCodeValue =
	// 	`${baseUrl}/` + QR_PORT + `/#/asset-qr-details/${selectedAsset.assetId}/${selectedAsset.companyId}/${selectedAsset.plant}`;
	const qrCodeValue = `${baseUrl}` + `/#/asset-qr-details/${selectedAsset.assetId}/${selectedAsset.companyId}/${selectedAsset.plant}`;
	useEffect(() => {
		dispatch(getChildIdToAudit(selectedAsset.assetId, selectedAsset.plant, selectedAsset.companyId));
	}, [dispatch]);
	const ChildIdAudit = useSelector((state) => state.AssetAuditData && state.AssetAuditData.ChildIdAudit);
	const beforeUpload = (file) => {
		const isImage = file.type.startsWith('image/');
		if (!isImage) {
			toast.error(`${file.name} is not an image file`);
			return false;
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setImageUrl(reader.result);
		};

		return false;
	};

	const handleImageChange = (info) => {
		form.setFieldsValue({ assetImage: info.fileList[0] });
		if (info.file.status === 'removed') {
			setImageUrl(null);
		} else if (info.file.status === 'done') {
			setImageUrl(info.file.response.imageUrl);
		}
	};
	const onChangeDate = () => {
		const date = form.getFieldValue('assetAgeing');
		if (date != null) {
			const from = formatDate(date[0]);
			const to = formatDate(date[1]);
			const date1 = new Date(from);
			const date2 = new Date(to);
			const dates = [];
			let currentDate = moment(date1);
			while (currentDate <= date2) {
				dates.push(currentDate.format('YYYY-MM-DD'));
				currentDate = currentDate.clone().add(1, 'days');
			}
			const length = dates.length;
			form.setFieldsValue({ assetLifetime: length });
		}
	};

	const handleCancel = () => {
		setImageUrl(null);
		form.setFieldsValue({ assetImage: null });
	};

	const downloadQRCode = () => {
		const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
		if (canvas) {
			const url = canvas.toDataURL();
			const a = document.createElement('a');
			a.download = 'QRCode.png';
			a.href = url;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};

	// calculation
	const handleChange = (event) => {
		const { name, value } = event.target;
		const updatedSelectedAsset = { ...updatedAsset.current, [name]: value };

		if (name === 'beginningTotalAsset' || name === 'endingTotalAsset') {
			const calculation = (Number(updatedSelectedAsset.beginningTotalAsset) + Number(updatedSelectedAsset.endingTotalAsset)) / 2;
			updatedSelectedAsset['averageTotalAsset'] = calculation;
			form.setFieldsValue({ averageTotalAsset: calculation });
		}
		if (name === 'estimatedSalvageValue') {
			const calculation =
				(Number(updatedSelectedAsset.costOfAsset) - Number(updatedSelectedAsset.estimatedSalvageValue)) /
				Number(updatedSelectedAsset.usefulLife);
			updatedSelectedAsset['depreciation'] = calculation;
			form.setFieldsValue({ depreciation: calculation });
		}
		if (name === 'netProfitOrBenefit') {
			const calculation = (Number(updatedSelectedAsset.netProfitOrBenefit) / Number(updatedSelectedAsset.costOfInvestment)) * 100;
			updatedSelectedAsset['returnOfInvestment'] = calculation;
			form.setFieldsValue({ returnOfInvestment: calculation });
		}
		if (name === 'totalBenefit' || name === 'totalCost') {
			const calculation = Number(updatedSelectedAsset.totalBenefit) - Number(updatedSelectedAsset.totalCost);
			updatedSelectedAsset['netBenefit'] = calculation;
			form.setFieldsValue({ netBenefit: calculation });
		}
		if (name === 'revenueGenerated' || name === 'averageTotalAsset') {
			const calculation = (Number(updatedSelectedAsset.revenueGenerated) / Number(updatedSelectedAsset.averageTotalAsset)) * 100;
			updatedSelectedAsset['assetUtilization'] = calculation;
			form.setFieldsValue({ assetUtilization: calculation });
		}
		if (name === 'netIncome' || name === 'costOfInvestment') {
			const calculation = (Number(updatedSelectedAsset.netIncome) / Number(updatedSelectedAsset.costOfInvestment)) * 100;
			updatedSelectedAsset['returnOfAsset'] = calculation;
			form.setFieldsValue({ returnOfAsset: calculation });
		}
		updatedAsset.current = updatedSelectedAsset;
	};
	useEffect(() => {
		form.setFieldsValue({
			assetQrCode: updatedAsset.current?.assetId,
			latitudeAndLongitude: updatedAsset.current?.latitudeAndLongitude
				? updatedAsset.current?.latitudeAndLongitude
				: `${geoLocation?.latitude}/${geoLocation?.longitude}`,
			assetId: updatedAsset.current?.assetId,
			costClassWise: updatedAsset.current?.costClassWise,
			assetClass: updatedAsset.current?.assetClass,
			plant: updatedAsset.current?.plant,
			serialNumber: updatedAsset.current?.serialNumber,
			assetStatus: updatedAsset.current?.assetStatus,
			assetAgeing: selectedAsset.assetAgeingFrom ? [formattedDatefrom, formattedDateto] : null,
			assetLifetime: updatedAsset.current?.assetLifetime,
			requiresAttention: updatedAsset.current?.requiresAttention,
			upOrDowntime: updatedAsset.current?.upOrDowntime,
			warrantyStatus: updatedAsset.current?.warrantyStatus,
			noOfRoutinesExecuted: updatedAsset.current?.noOfRoutinesExecuted,
			// costBasedMajorAsset: updatedAsset.current?.costBasedMajorAsset,
			// costBasedMinorAsset: updatedAsset.current?.costBasedMinorAsset,
			costOfAsset: updatedAsset.current?.costOfAsset,
			estimatedSalvageValue: updatedAsset.current?.estimatedSalvageValue,
			usefulLife: updatedAsset.current?.usefulLife,
			netProfitOrBenefit: updatedAsset.current?.netProfitOrBenefit,
			costOfInvestment: updatedAsset.current?.costOfInvestment,
			totalBenefit: updatedAsset.current?.totalBenefit,
			totalCost: updatedAsset.current?.totalCost,
			revenueGenerated: updatedAsset.current?.revenueGenerated,
			beginningTotalAsset: updatedAsset.current?.beginningTotalAsset,
			endingTotalAsset: updatedAsset.current?.endingTotalAsset,
			netIncome: updatedAsset.current?.netIncome,
			depreciation:
				(Number(updatedAsset.current?.costOfAsset) - Number(updatedAsset.current?.estimatedSalvageValue)) /
				Number(updatedAsset.current?.usefulLife),
			returnOfInvestment: updatedAsset.current?.returnOfInvestment,
			netBenefit: updatedAsset.current?.netBenefit,
			assetUtilization: updatedAsset.current?.assetUtilization,
			averageTotalAsset: (Number(updatedAsset.current.beginningTotalAsset) + Number(updatedAsset.current.endingTotalAsset)) / 2,
			returnOfAsset: updatedAsset.current?.returnOfAsset,
			// standardDep: updatedAsset.current?.standardDep,
			expiryDate: updatedAsset.current?.expiryDate ? dayjs(updatedAsset.current?.expiryDate, dateFormat) : null,
			description: updatedAsset.current?.descriptions,
			costCenter: updatedAsset.current?.costCenter,
			capitalizationDate: updatedAsset.current?.capitalizationDate
				? dayjs(updatedAsset.current?.capitalizationDate, dateFormat)
				: null,
			assetRetirementDate: updatedAsset.current?.assetRetirementDate
				? dayjs(updatedAsset.current?.assetRetirementDate, dateFormat)
				: null
		});
		updatedAsset.current = form.getFieldsValue();
		onChangeDate();
	}, [updatedAsset, form]);

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
						} else if (key === 'assetRetirementDate' && value) {
							formData.append(key, value ? formatDate(value) : null);
						} else if (key === 'capitalizationDate' && value) {
							formData.append(key, value ? formatDate(value) : null);
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
				// const controller = new AbortController();
				// const signal = controller.signal;
				dispatch(assetEdit(formData))
					.then((response) => {
						toast.success(response.data.message);
						dispatch(getStockAndScrap(tableRefresh, selectedCategory, selectedAssetType, '', 0, 10, false, ''));
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
	const handleLatLong = () => {
		if (!('geolocation' in navigator)) {
			console.log('Geolocation is not available in your browser.');
			return;
		}
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				form.resetFields(['latitudeAndLongitude']);
				form.setFieldsValue({
					latitudeAndLongitude: `${latitude}/${longitude}`
				});
				updatedAsset.current.latitudeAndLongitude = `${latitude}/${longitude}`;
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
	return (
		<>
			<Box>
				<Form onFinish={onFinish} form={form} initialValues={form.getFieldsValue()}>
					<Grid item sx={{ ml: 3.6, mr: 3.6 }}>
						<Grid container spacing={2} columns={16}>
							<Grid item container>
								<h3>Asset Details</h3>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Asset Image</span>}
									name="assetImage"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px' }}
								></Form.Item>
								{imageUrl ? (
									<div>
										<Image
											src={imageUrl}
											alt="Asset"
											style={{ width: '100.17px', height: '100.17px', borderRadius: '8px' }}
											disabled={editAble}
											preview={
												editAble
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
									<Upload
										listType="picture-card"
										showUploadList={false}
										beforeUpload={beforeUpload}
										maxCount={1}
										onChange={handleImageChange}
										style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
										disabled={editAble}
										rules={imageUrl ? [{ required: true, message: 'This field is required' }] : ''}
									>
										<div>
											<CenterFocusWeakIcon fontSize="large" />
											<div style={{ marginTop: 8 }}>Change Picture</div>
										</div>
									</Upload>
								)}
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={6}>
								<Form.Item
									label={<span className="label-style">Asset QR Code</span>}
									name="assetQrCode"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px' }}
								></Form.Item>
								<Space id="myqrcode">
									<QRCode size={100} style={{ height: 'auto' }} value={qrCodeValue} viewBox="0 0 100 100" />
									<Button
										style={{ color: '#919EAB', cursor: 'pointer' }}
										onClick={downloadQRCode}
										disabled={editAble}
										startIcon={<DownloadOutlined style={{ fontSize: 24, color: '#919EAB' }} />}
									>
										<Typography.Text style={{ color: '#919EAB', marginLeft: 8 }}>Download QR Code</Typography.Text>
									</Button>
								</Space>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3} sx={{ color: '#919EAB' }}>
								<Form.Item
									label={<span className="label-style">Asset Longitude & Latitude</span>}
									name="latitudeAndLongitude"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px', color: '#919EAB' }}
								>
									<Space.Compact style={{ width: '100%' }}>
										<Input
											style={{ height: '40px' }}
											name="latitudeAndLongitude"
											defaultValue={
												updatedAsset.current?.latitudeAndLongitude
													? updatedAsset.current?.latitudeAndLongitude
													: `${geoLocation?.latitude}/${geoLocation?.longitude}`
											}
											readOnly={true}
											disabled={editAble}
										/>
										<Btn
											type="primary"
											style={{ height: '40px' }}
											icon={<RetweetOutlined />}
											disabled={editAble}
											onClick={handleLatLong}
										/>
									</Space.Compact>
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
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.assetId}
										disabled={editAble}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Cost Class wise</span>}
									name="costClassWise"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px' }}
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.costClassWise}
										disabled={editAble}
									/>
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
										defaultValue={updatedAsset.current?.assetClass}
										disabled={editAble}
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
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.plant}
										disabled={editAble}
										readOnly={true}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Serial No</span>}
									name="serialNumber"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px' }}
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.serialNumber}
										disabled={editAble}
									/>
								</Form.Item>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Form.Item
									label={<span className="label-style">Status</span>}
									name="assetStatus"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '40px' }}
									rules={[{ required: true, message: 'This field is required' }]}
								>
									{updatedAsset.current?.assetStatus == 'Scrapped' ? (
										<Select
											defaultValue={updatedAsset.current?.assetStatus}
											style={{ height: '40px' }}
											showSearch
											options={[{ value: 'Scrapped', label: 'Scrapped' }]}
											disabled={editAble}
										/>
									) : (
										<Select
											defaultValue={updatedAsset.current?.assetStatus}
											style={{ height: '40px' }}
											showSearch
											options={[
												{ value: 'Online', label: 'Online' },
												{ value: 'Offline', label: 'Offline' },
												// { value: 'Scrapped', label: 'Scrapped' },
												{ value: 'Maintenance', label: 'Maintenance' }
											]}
											disabled={editAble}
										/>
									)}
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
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<RangePicker
										style={{ height: '40px', width: '100%' }}
										format="DD-MM-YYYY"
										defaultValue={updatedAsset.current?.assetAgeingFrom ? [formattedDatefrom, formattedDateto] : null}
										disabled={editAble}
										onChange={onChangeDate}
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
										defaultValue={updatedAsset.current?.assetLifetime}
										disabled={editAble}
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
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.requiresAttention}
										disabled={editAble}
									/>
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
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.upOrDowntime}
										disabled={editAble}
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
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.warrantyStatus}
										disabled={editAble}
									/>
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
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.noOfRoutinesExecuted}
										disabled={editAble}
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
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.costBasedMajorAsset}
										disabled={editAble}
										type="number"
										className="no-spinner"
									/>
								</Form.Item>
							</Grid> */}
							{/* <Grid item xs={12} sm={6} md={4} lg={3}>
								{' '}
								<Form.Item
									label={<span className="label-style">Cost Based Minor Asset</span>}
									name="costBasedMinorAsset"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: 150, height: '50px' }}
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.costBasedMinorAsset}
										disabled={editAble}
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
										defaultValue={updatedAsset.current?.costOfAsset}
										type="number"
										name="costOfAsset"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										name="standardDep"
										defaultValue={updatedAsset.current?.standardDep}
										type="number"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.estimatedSalvageValue}
										type="number"
										name="estimatedSalvageValue"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
										defaultValue={updatedAsset.current?.usefulLife}
										disabled={editAble}
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
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.netProfitOrBenefit}
										name="netProfitOrBenefit"
										type="number"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
										defaultValue={updatedAsset.current?.costOfInvestment}
										name="costOfInvestment"
										type="number"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.totalBenefit}
										name="totalBenefit"
										type="number"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.totalCost}
										name="totalCost"
										type="number"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.revenueGenerated}
										name="revenueGenerated"
										type="number"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
                                        defaultValue={updatedAsset.current?.averageTotalAsset}
                                        name="averageTotalAsset"
                                        type="number"
                                        className="no-spinner"
                                        onChange={handleChange}
                                        
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
										defaultValue={updatedAsset.current?.beginningTotalAsset}
										name="beginningTotalAsset"
										type="number"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
										defaultValue={updatedAsset.current?.endingTotalAsset}
										name="endingTotalAsset"
										type="number"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<Input
										style={{ height: '40px' }}
										defaultValue={updatedAsset.current?.netIncome}
										name="netIncome"
										type="number"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
											(Number(updatedAsset.current?.costOfAsset) -
												Number(updatedAsset.current?.estimatedSalvageValue)) /
											Number(updatedAsset.current?.usefulLife)
										}
										type="number"
										name="depreciation"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
										defaultValue={updatedAsset.current?.returnOfInvestment}
										name="returnOfInvestment"
										type="number"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
										defaultValue={updatedAsset.current?.netBenefit}
										name="netBenefit"
										type="number"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
										defaultValue={updatedAsset.current?.assetUtilization}
										name="assetUtilization"
										type="number"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
										defaultValue={
											(Number(updatedAsset.current.beginningTotalAsset) +
												Number(updatedAsset.current.endingTotalAsset)) /
											2
										}
										name="averageTotalAsset"
										type="number"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
										defaultValue={updatedAsset.current?.returnOfAsset}
										name="returnOfAsset"
										type="number"
										className="no-spinner"
										onChange={handleChange}
										disabled={editAble}
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
									rules={[{ required: true, message: 'This field is required' }]}
								>
									<DatePicker
										style={{ height: '40px', width: '100%' }}
										format="DD-MM-YYYY"
										name="expiryDate"
										className="no-spinner"
										onChange={(date) => handleChange({ target: { name: 'expiryDate', value: formatDate(date) } })}
										disabled={editAble}
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
										defaultValue={updatedAsset.current?.description}
										name="description"
										onChange={handleChange}
										disabled={editAble}
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
										defaultValue={updatedAsset.current?.returnOfAsset}
										name="costCenter"
										onChange={handleChange}
										disabled={editAble}
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
										onChange={(date) => handleChange({ target: { name: 'expiryDate', value: formatDate(date) } })}
										disabled={editAble}
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
										onChange={(date) => handleChange({ target: { name: 'expiryDate', value: formatDate(date) } })}
										disabled={editAble}
										readOnly={true}
									/>
								</Form.Item>
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
						<Grid item xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'right', display: editAble ? 'none' : 'block' }}>
							{' '}
							<Btn htmlType="submit" type="primary">
								Submit
							</Btn>
						</Grid>
					</Grid>
				</Form>
			</Box>
		</>
	);
};
export default AssetDetail;
