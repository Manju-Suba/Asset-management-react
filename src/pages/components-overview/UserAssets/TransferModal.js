import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { assetTransferCreate } from 'components/redux/assetTransfer/action';
import { getAllPlant } from 'components/redux/master/Location/action';
import { getAllAssetStockListByPage } from 'components/redux/Assetlist/action';

const { Option } = Select;

const TransferModal = ({ AssetData, PageNo, PageSize, isModalOpen, setIsModalOpen }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(isModalOpen);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();

	const LocationDetails = useSelector((state) => state.LocationData && state.LocationData.LocationList);

	const handleOk = () => {
		setConfirmLoading(true);
		form.validateFields()
			.then((values) => {
				const formData = new FormData();
				formData.append('assetReferenceId', AssetData.id);
				formData.append('assetId', AssetData.assetId);
				formData.append('childId', AssetData.childId);
				formData.append('fromPlant', AssetData?.plant);
				formData.append('toPlant', values.transfer_to);
				formData.append('remarks', values.remarks);

				dispatch(assetTransferCreate(formData))
					.then((response) => {
						toast.success(response.data.message);
						const controller = new AbortController();
						const signal = controller.signal;
						dispatch(getAllAssetStockListByPage('', '', '', PageNo, PageSize, signal));
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

	const handleCancel = () => {
		form.resetFields();
		setIsModalOpen(false);
		setOpen(false);
		setConfirmLoading(false);
	};

	const plantlist = LocationDetails?.plant || [];

	useEffect(() => {
		setOpen(isModalOpen);
		if (AssetData && isModalOpen) {
			form.resetFields();
			form.setFieldsValue({
				// eslint-disable-next-line react/prop-types
				assetId: AssetData?.assetId,
				transfer_from: AssetData?.plant
			});
			const controller = new AbortController();
			const signal = controller.signal;
			dispatch(getAllPlant(signal));
		}
	}, [AssetData, dispatch, form, isModalOpen]);

	return (
		<>
			<Modal
				title={'Transferring Asset Request'}
				open={open}
				okText="Save"
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				width={600}
				className="text-arul"
				sx={{ height: '100%', width: '100% ', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
			>
				<Form form={form}>
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
						label="Transfer From"
						name="transfer_from"
						labelAlign="top"
						labelCol={{ span: 24 }}
						sx={{ width: '100%', height: '40px' }}
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Select defaultValue="Choose Location" style={{ height: '40px' }} disabled showSearch>
							{plantlist.map((option) => (
								<Option key={option.plant} value={option.plant}>
									{option.plant}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						label="Transfer To"
						name="transfer_to"
						labelAlign="top"
						labelCol={{ span: 24 }}
						sx={{ width: '100%', height: '40px', cursor: 'pointer' }}
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Select defaultValue="Choose Location" style={{ height: '40px', cursor: 'pointer' }} showSearch>
							{plantlist.map((option) => (
								<Option key={option.plant} value={option.plant} disabled={AssetData?.plant === option.plant}>
									{option.plant}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item label="  Remarks" name="remarks" labelAlign="top" labelCol={{ span: 24 }} sx={{ width: '100%' }}>
						<Input placeholder="Enter Remarks" style={{ height: '100px', verticalAlign: 'top', textAlign: 'left' }} />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default TransferModal;
