/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Upload, Image, Space } from 'antd';
// import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { assetActionReplace, getCloseToDisposeAsset } from 'components/redux/DisposalAsset/action';
import { getNotReplacedAsset } from 'components/redux/asset/action';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import { DeleteOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
const { Option } = Select;

const ReplaceModal = ({ AssetData, Status, isModalOpen, setIsModalOpen }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(isModalOpen);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();
	const [imageUrl, setImageUrl] = useState(null);
	// const AssetNoDetails = useSelector((state) => state.AssetData && state.AssetData.AssetNo);
	const NotReplacedAsset = useSelector((state) => state.AssetData && state.AssetData.NotReplacedAsset);
	const handleOk = async () => {
		setConfirmLoading(true);
		form.validateFields()
			.then((values) => {
				const formData = new FormData();
				formData.append('assetId', AssetData.id);
				formData.append('assetNo', values.assetId);
				formData.append('expiryDate', values.expiryDate);
				formData.append('replaceAssetId', values.replaceAssetId);
				formData.append('status', Status);
				if (values.assetImage != undefined) {
					// formData.append('file', fileInput.files[0]);
					formData.append('file', values.assetImage.originFileObj);
				}
				// const fileInput = document.querySelector('input[type="file"]');
				// if (fileInput.files.length > 0) {
				// 	formData.append('file', fileInput.files[0]);
				// }

				dispatch(assetActionReplace(formData))
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

	const handleCancel = () => {
		form.resetFields();
		setImageUrl(null);
		setIsModalOpen(false);
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
		setOpen(isModalOpen);
		if (AssetData) {
			form.resetFields();
			form.setFieldsValue({
				// eslint-disable-next-line react/prop-types
				assetId: AssetData.assetId,
				expiryDate: AssetData.expiryDate
			});
			dispatch(getNotReplacedAsset());
		}
	}, [AssetData, dispatch, form, isModalOpen]);

	return (
		<>
			<Modal
				title={'Replace Form'}
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
						name="expiryDate"
						labelAlign="top"
						labelCol={{ span: 24 }}
						sx={{ width: '100%', height: '40px' }}
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Input style={{ height: '40px' }} disabled />
					</Form.Item>
					<Form.Item
						label="Replaced Asset"
						name="replaceAssetId"
						labelAlign="top"
						labelCol={{ span: 24 }}
						sx={{ width: '100%', height: '40px' }}
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Select
							defaultValue="Choose Replace Asset"
							style={{ height: '40px' }}
							showSearch
							filterOption={(input, option) => option.props.children[0].indexOf(input) >= 0}
						>
							{NotReplacedAsset.map((option) => (
								<Option key={option.id} value={option.id}>
									{option.assetId}/{option.childId}
								</Option>
							))}
						</Select>
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
							type="file"
							className="upload-file-design"
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
export default ReplaceModal;
