/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, Image, Space } from 'antd';
// import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { assetActionRenew, getCloseToDisposeAsset } from 'components/redux/DisposalAsset/action';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid } from '../../../../node_modules/@mui/material/index';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import { DeleteOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
const RenewModal = ({ AssetData, Status, isModalRenewOpen, setIsModalRenewOpen }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(isModalRenewOpen);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();
	const [imageUrl, setImageUrl] = useState(null);
	const handleOk = async () => {
		setConfirmLoading(true);
		form.validateFields()
			.then((values) => {
				const formData = new FormData();
				formData.append('id', AssetData.id);
				formData.append('assetId', AssetData.id);
				formData.append('assetNo', values.assetId);
				formData.append('expiryDate', formatDate(values.expiryDate));
				formData.append('status', Status);
				// const fileInput = document.querySelector('input[type="file"]');
				// if (fileInput.files.length > 0) {
				// 	formData.append('file', fileInput.files[0]);
				// }
				if (values.assetImage != undefined) {
					// formData.append('file', fileInput.files[0]);
					formData.append('file', values.assetImage.originFileObj);
				}

				dispatch(assetActionRenew(formData))
					.then((response) => {
						toast.success(response.data.message);
						dispatch(getCloseToDisposeAsset(0, 10, '', false, ''));
						form.resetFields();
						setOpen(false);
						setConfirmLoading(false);
					})
					.catch((error) => {
						toast.error(error.response.data.message);
						setConfirmLoading(false);
					});
			})
			.catch((errorInfo) => {
				toast.error('Validation error', errorInfo);
				setConfirmLoading(false);
			});
	};
	const handleCurrentImage = () => {
		setImageUrl(null);
		form.setFieldsValue({ assetImage: null });
	};

	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD part
	}

	const handleCancel = () => {
		setImageUrl(null);
		form.resetFields();
		setIsModalRenewOpen(false);
		setOpen(false);
		setConfirmLoading(false);
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

	useEffect(() => {
		setOpen(isModalRenewOpen);
		if (AssetData) {
			form.resetFields();
			form.setFieldsValue({
				// eslint-disable-next-line react/prop-types
				assetId: AssetData.assetId,
				oldexpiryDate: AssetData.expiryDate
			});
		}
	}, [AssetData, dispatch, form, isModalRenewOpen]);

	return (
		<>
			<Modal
				title={'Renew Form'}
				open={open}
				okText="Save"
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				width={600}
				className="text-arul"
				sx={{ height: '100%', width: '100% ', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
			>
				<Form form={form} encType="multipart/form-data">
					<Form.Item
						label="  Asset ID"
						name="assetId"
						labelAlign="top"
						labelCol={{ span: 24 }}
						sx={{ width: '100%', height: '40px' }}
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Input style={{ height: '40px' }} disabled />
					</Form.Item>
					<Form.Item
						label="Expire Date"
						name="oldexpiryDate"
						labelAlign="top"
						labelCol={{ span: 24 }}
						sx={{ width: '100%', height: '40px' }}
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Input style={{ height: '40px' }} disabled />
					</Form.Item>
					<Form.Item
						label="Next Renewal Date"
						name="expiryDate"
						labelAlign="top"
						labelCol={{ span: 24 }}
						sx={{ width: '100%', height: '40px' }}
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<Grid sx={{ width: '100%' }} components={['DatePicker']}>
								<DatePicker
									label=" Enter Date"
									format="YYYY-MM-DD"
									onChange={(date) => form.setFieldsValue({ expiryDate: date })}
								/>
							</Grid>
						</LocalizationProvider>
					</Form.Item>
					<Form.Item
						label="Cost"
						name="cost"
						labelAlign="top"
						labelCol={{ span: 24 }}
						sx={{ width: '100%', height: '40px' }}
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Input placeholder="Enter Cost" style={{ height: '40px' }} />
					</Form.Item>

					{/* <Form.Item
						label=" Picture"
						name="file"
						labelAlign="top"
						labelCol={{ span: 24 }}
						item
						sx={{ width: 150, height: '50px' }}
					>
						<Input
							placeholder="Choose File"
							className="upload-file-design"
							type="file"
							style={{ verticalAlign: 'top', textAlign: 'left' }}
						/>
					</Form.Item> */}
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
				</Form>
			</Modal>
		</>
	);
};
export default RenewModal;
