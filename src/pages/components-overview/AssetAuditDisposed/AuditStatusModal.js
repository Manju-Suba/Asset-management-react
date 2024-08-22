/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Input, Upload, Space, Modal, Image, Checkbox } from 'antd';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { assetAuditActionCreate, getAssetAuditPending } from 'components/redux/AssetAudit/action';
import { DeleteOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
// import { API_BASE_URL } from '../../../constants/constants';
import Grid from '@mui/material/Grid';
import Computeriamge from 'assets/images/users/computer.png';
// eslint-disable-next-line react/prop-types
const AuditStatusModal = ({ AssetData, StatusType, Status, isModalOpen, setIsModalOpen }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(isModalOpen);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState(null);
	const [form] = Form.useForm();
	const [radius, setRadius] = React.useState(null);
	const [isDisabled, setIsDisabled] = React.useState(false);
	const [isShown, setIsShown] = React.useState(false);
	const [checked, setChecked] = React.useState(false);

	const fetchGeoLocation = () => {
		return new Promise((resolve, reject) => {
			if (!('geolocation' in navigator)) {
				console.log('Geolocation is not available in your browser.');
				return;
			}

			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve(position.coords);
					// handleGeoLocationReceived();
				},
				(error) => {
					if (error.code === error.PERMISSION_DENIED) {
						reject('Please give access for location.');
					} else {
						reject('Error getting geolocation:', error.message);
					}
				}
			);
		});
	};
	const handleCurrentImage = () => {
		setImageUrl(null);
		form.setFieldsValue({ assetImage: null });
	};
	const handleOk = async () => {
		setConfirmLoading(true);
		form.validateFields()
			.then((values) => {
				const formData = new FormData();
				formData.append('assetId', values.assetId);
				formData.append('remark', values.remarks);
				formData.append('status', Status);
				formData.append('id', AssetData.assetId);
				formData.append('withCondition', checked);
				// const fileInput = document.querySelector('input[type="file"]');
				if (values.assetImage != undefined) {
					// formData.append('file', fileInput.files[0]);
					formData.append('file', values.assetImage.originFileObj);
				}

				dispatch(assetAuditActionCreate(formData))
					.then((response) => {
						toast.success(response.data.message);
						const controller = new AbortController();
						const signal = controller.signal;
						dispatch(getAssetAuditPending(0, 10, null, null, false, null, signal));
						form.resetFields();
						setImageUrl(null);
						setOpen(false);
						setConfirmLoading(false);
					})
					.catch((error) => {
						toast.error(error.response.data.message);
						setConfirmLoading(false);
					});
			})
			.catch((errorInfo) => {
				console.log(errorInfo);
				setConfirmLoading(false);
				toast.error('Validation error', errorInfo);
			});
	};
	const handleCancel = () => {
		form.resetFields();
		setIsModalOpen(false);
		setOpen(false);
		setConfirmLoading(false);
		setImageUrl(null);
	};

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

	async function calculateDistance(lat1, lon1, lat2, lon2) {
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

	const setFormValues = async (latitude, longitude, AssetData, form) => {
		let result = ['', ''];
		if (AssetData.latitudeAndLongitude != null) {
			const str = AssetData.latitudeAndLongitude;
			result = str.split('/');
		}
		form.resetFields();
		form.setFieldsValue({
			assetId: AssetData.assetId,
			previousLatLong: `${result[1]} | ${result[0]}`,
			currentLatLong: `${longitude} | ${latitude}`
		});
	};

	const fetchCoords = async () => {
		const coords = await fetchGeoLocation();
		const { latitude, longitude } = coords;
		return { latitude, longitude };
	};
	const handleCheckbox = (e) => {
		setChecked(e.target.checked);
		if (e.target.checked == true) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	};

	useEffect(() => {
		setOpen(isModalOpen);
		const fetchData = async () => {
			if (AssetData) {
				const { latitude, longitude } = await fetchCoords();
				const radiusDist = await calculateDistance(
					parseFloat(AssetData.latitudeAndLongitude.split('/')[0]),
					parseFloat(AssetData.latitudeAndLongitude.split('/')[1]),
					latitude,
					longitude
				);
				if (StatusType == 'Reject') {
					setIsDisabled(false);
					setIsShown(false);
				} else {
					if (radiusDist < 200) {
						setIsDisabled(false);
						setIsShown(false);
					} else {
						setIsDisabled(true);
						setIsShown(true);
					}
				}
				const radiusDis = parseFloat(radiusDist.toFixed(2));
				setRadius(radiusDis);
				setFormValues(latitude, longitude, AssetData, form);
			}
		};
		fetchData();
	}, [AssetData, isModalOpen]);

	return (
		<>
			<Modal
				title={'Do you want to ' + StatusType + '?'}
				open={open}
				okText="Save"
				okButtonProps={{ disabled: isDisabled }}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				width={600}
				className="text-arul"
				sx={{ height: '100%', width: '100% ', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
			>
				<Divider />
				<Form form={form} encType="multipart/form-data">
					<Form.Item
						label="  Asset Id"
						name="assetId"
						labelAlign="top"
						labelCol={{ span: 24 }}
						sx={{ width: '100%', height: '40px' }}
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Input placeholder="Enter Asset Id" style={{ height: '40px' }} readOnly />
					</Form.Item>
					<Grid container spacing={2} columns={16}>
						<Grid item lg={8} sm={8}>
							<Form.Item
								label={<span className="label-style">Previous Image</span>}
								name="previousassetImage"
								className="margin-bottom-0px"
								labelAlign="top"
								labelCol={{ span: 24 }}
								sx={{ width: 150, height: '40px' }}
							></Form.Item>
							{AssetData?.previewImageWithPath ? (
								<div>
									<Image
										src={AssetData.previewImageWithPath}
										alt="Asset"
										style={{ width: '100.17px', height: '100.17px', borderRadius: '8px' }}
										preview={{
											toolbarRender: (
												_,
												{
													transform: { scale },
													actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn }
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
										}}
									/>
								</div>
							) : (
								<div>
									<Image
										src={Computeriamge}
										alt="Asset"
										style={{ width: '100.17px', height: '100.17px', borderRadius: '8px' }}
										preview={{
											toolbarRender: (
												_,
												{
													transform: { scale },
													actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn }
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
										}}
									/>
								</div>
							)}
						</Grid>
						<Grid item lg={8} sm={8}>
							<Form.Item
								label={<span className="label-style">Current Image</span>}
								name="assetImage"
								className="margin-bottom-0px"
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
										preview={{
											toolbarRender: (
												_,
												{
													transform: { scale },
													actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn }
												}
											) => (
												<Space size={12} className="toolbar-wrapper">
													<SwapOutlined rotate={90} onClick={onFlipY} />
													<SwapOutlined onClick={onFlipX} />
													<RotateLeftOutlined onClick={onRotateLeft} />
													<RotateRightOutlined onClick={onRotateRight} />
													<ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
													<ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
													<DeleteOutlined onClick={handleCurrentImage} />
												</Space>
											)
										}}
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
									rules={imageUrl ? [{ required: true, message: 'This field is required' }] : ''}
								>
									<div>
										<CenterFocusWeakIcon fontSize="large" />
										<div style={{ marginTop: 8 }}>Change Picture</div>
									</div>
								</Upload>
							)}
						</Grid>
					</Grid>

					<Grid container spacing={2} columns={16}>
						<Grid item lg={8} sm={8}>
							<Form.Item
								label="Previous Longitude & Latitude"
								name="previousLatLong"
								labelAlign="top"
								labelCol={{ span: 24 }}
								sx={{ width: '100%' }}
							>
								<Input style={{ height: '50px', verticalAlign: 'top', textAlign: 'left' }} readOnly />
							</Form.Item>
						</Grid>
						<Grid item lg={8} sm={8}>
							<Form.Item
								label="Current Longitude & Latitude"
								name="currentLatLong"
								labelAlign="top"
								labelCol={{ span: 24 }}
								sx={{ width: '100%' }}
							>
								<Input style={{ height: '50px', verticalAlign: 'top', textAlign: 'left' }} readOnly />
							</Form.Item>
						</Grid>
					</Grid>
					<Grid container spacing={2} columns={16}>
						<Grid item lg={8} sm={8}>
							{radius < 200 ? (
								<Form.Item
									label={<span style={{ color: '#19CC24' }}>{radius} m</span>}
									name="note"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: '100%' }}
									style={{ color: '#19CC24' }}
								></Form.Item>
							) : (
								<Form.Item
									label={<span style={{ color: '#ED2E22' }}>*{radius} m</span>}
									name="note"
									labelAlign="top"
									labelCol={{ span: 24 }}
									sx={{ width: '100%' }}
									style={{ color: '#ED2E22' }}
								></Form.Item>
							)}
						</Grid>
					</Grid>
					<Form.Item
						label="Remarks"
						name="remarks"
						labelAlign="top"
						labelCol={{ span: 24 }}
						sx={{ width: '100%' }}
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Input placeholder="Enter Remarks" style={{ height: '100px', verticalAlign: 'top', textAlign: 'left' }} />
					</Form.Item>
					{isShown ? (
						<Form.Item name="withCondition" labelAlign="top" labelCol={{ span: 24 }} sx={{ width: '100%' }}>
							<Checkbox checked={checked} onChange={handleCheckbox}>
								{' '}
								With Condition{' '}
							</Checkbox>
						</Form.Item>
					) : (
						<></>
					)}

					{/* <Form.Item label=" Current Image" name="file" labelAlign="top" labelCol={{ span: 24 }} item sx={{ width: 150, height: '50px' }}>
            <Input placeholder="Choose File" type="file" style={{ verticalAlign: 'top', textAlign: 'left' }} />
          </Form.Item> */}
				</Form>
			</Modal>
		</>
	);
};
export default AuditStatusModal;
