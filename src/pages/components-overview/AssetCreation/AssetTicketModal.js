/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { assetTicketCreate, getAllAssetTicket, getTicketNoCount } from 'components/redux/AssetCreation/action';
import { getAllAssetClass } from 'components/redux/master/AssetClass/action';
// eslint-disable-next-line react/prop-types
const AssetTicketModal = ({ isModalOpen, setIsModalOpen }) => {
	const dispatch = useDispatch();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();
	const AssetClassDetails = useSelector((state) => state.AssetClassData && state.AssetClassData.AssetClassData);
	const TicketNoCount = useSelector((state) => state.AssetCreationData && state.AssetCreationData.AssetTicketNoCount);
	const { Option } = Select;
	const handleOk = async () => {
		setConfirmLoading(true);
		form.validateFields()
			.then((values) => {
				console.log(values);
				const formData = new FormData();
				formData.append('assetName', values.assetName);
				formData.append('description', values.description);
				formData.append('assetClass', values.assetClass);
				formData.append('ticketNo', values.ticketNo);
				dispatch(assetTicketCreate(formData))
					.then((response) => {
						toast.success(response.data.message);
						const controller = new AbortController();
						const signal = controller.signal;
						dispatch(getAllAssetTicket(null, null, 0, 10, false, null, signal));
						dispatch(getTicketNoCount());
						form.resetFields();
						setIsModalOpen(false);
						setConfirmLoading(false);
						form.setFieldsValue({
							ticketNo: `AST-SW-${(TicketNoCount.count + 1).toString().padStart(5, '0')}`
						});
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
		setConfirmLoading(false);
	};

	useEffect(() => {
		console.log('isModalOpen', isModalOpen);
		dispatch(getAllAssetClass());
		dispatch(getTicketNoCount());
	}, [isModalOpen, dispatch]);
	useEffect(() => {
		if (!isModalOpen) {
			form.setFieldsValue({
				ticketNo: `AST-SW-${(TicketNoCount.count + 1).toString().padStart(5, '0')}`
			});
		}
	}, [isModalOpen, TicketNoCount, form]);

	return (
		<Modal
			title={'Asset Ticket Creation'}
			open={isModalOpen}
			okText="Submit"
			onOk={handleOk}
			confirmLoading={confirmLoading}
			onCancel={handleCancel}
			width={600}
			className="text-arul"
			sx={{ height: '100%', width: '100% ', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
		>
			<Divider />
			<Form form={form}>
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
export default AssetTicketModal;
