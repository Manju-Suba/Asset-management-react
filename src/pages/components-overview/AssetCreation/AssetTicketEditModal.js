/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { assetTicketUpdate, getAllAssetTicket } from 'components/redux/AssetCreation/action';
import { getAllAssetClass } from 'components/redux/master/AssetClass/action';
// eslint-disable-next-line react/prop-types
const AssetTicketEditModal = ({ AssetTicket, StatusType, isEditModalOpen, setIsEditModalOpen }) => {
	const dispatch = useDispatch();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [formEdit] = Form.useForm();
	const AssetClassDetails = useSelector((state) => state.AssetClassData && state.AssetClassData.AssetClassData);
	const { Option } = Select;
	const handleOk = async () => {
		if (StatusType == 'Edit') {
			setConfirmLoading(true);
			formEdit
				.validateFields()
				.then((values) => {
					console.log(values);
					const formData = new FormData();
					formData.append('assetName', values.assetName);
					formData.append('description', values.description);
					formData.append('assetClass', values.assetClass);
					formData.append('ticketNo', values.ticketNo);
					dispatch(assetTicketUpdate(AssetTicket.id, formData))
						.then((response) => {
							toast.success(response.data.message);
							const controller = new AbortController();
							const signal = controller.signal;
							dispatch(getAllAssetTicket(null, null, 0, 10, false, null, signal));
							formEdit.resetFields();
							setIsEditModalOpen(false);
							setConfirmLoading(false);
							setIdCount((prevIdCount) => prevIdCount + 1);
						})
						.catch((error) => {
							toast.error(error);
							setConfirmLoading(false);
						});
				})
				.catch((errorInfo) => {
					console.log(errorInfo);
					setConfirmLoading(false);
					toast.error('Validation error', errorInfo);
				});
		}
	};
	const handleCancel = () => {
		formEdit.resetFields();
		setIsEditModalOpen(false);
		setConfirmLoading(false);
	};

	useEffect(() => {
		if (isEditModalOpen) {
			dispatch(getAllAssetClass());
			formEdit.setFieldsValue({
				ticketNo: AssetTicket.ticketNo,
				assetName: AssetTicket.assetName,
				assetClass: AssetTicket.assetClass,
				description: AssetTicket.description
			});
		}
	}, [isEditModalOpen, dispatch, formEdit, AssetTicket]);

	return (
		<Modal
			title={'Asset Ticket ' + StatusType}
			open={isEditModalOpen}
			okText="Update"
			onOk={handleOk}
			confirmLoading={confirmLoading}
			onCancel={handleCancel}
			width={600}
			className="text-arul"
			sx={{ height: '100%', width: '100% ', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
		>
			<Divider />
			<Form form={formEdit}>
				<Form.Item
					label="Ticket No."
					name="ticketNo"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Input placeholder="Enter Ticket No" style={{ height: '40px' }} readOnly />
				</Form.Item>
				<Form.Item
					label="Asset Name"
					name="assetName"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Input placeholder="Enter Asset Name" style={{ height: '40px' }} />
				</Form.Item>
				<Form.Item
					label="Asset Class"
					name="assetClass"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%', height: '40px' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Select defaultValue="Choose Asset Class" style={{ height: '40px' }} showSearch>
						{AssetClassDetails.map((option) => (
							<Option key={option.assetClass} value={option.assetClass}>
								{option.assetClass}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label="AssetDescription"
					name="description"
					labelAlign="top"
					labelCol={{ span: 24 }}
					sx={{ width: '100%' }}
					rules={[{ required: true, message: 'This field is required' }]}
				>
					<Input placeholder="Enter Description" style={{ height: '100px', verticalAlign: 'top', textAlign: 'left' }} />
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default AssetTicketEditModal;
