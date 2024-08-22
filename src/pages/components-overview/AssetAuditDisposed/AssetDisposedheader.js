import * as React from 'react';
import Box from '@mui/material/Box';
import { Col, Row } from 'antd';
import { Button as Btn } from '../../../../node_modules/@mui/material/index';
import { Form, Input } from 'antd';
import AuditStatusModal from './AuditStatusModal';
import { useDispatch } from 'react-redux';
import { getAssetListByAssetId } from 'components/redux/asset/action';

export default function AssetDisposedheader() {
	const [AssetId, setAssetId] = React.useState();
	const [AuditRecord, setAuditRecord] = React.useState([]);
	const [StatusType, setStatusType] = React.useState();
	const [AuditStatus, setAuditStatus] = React.useState();
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const SetAssetRecord = (e) => {
		setAssetId(e.target.value);
	};
	const handleStatusModal = (status) => {
		if (!AssetId) {
			setErrorMessage('This field is required');
		} else {
			setErrorMessage('');
			form.setFieldsValue({ assetId: '' });
			dispatch(getAssetListByAssetId(AssetId))
				.then((res) => {
					setAuditRecord(res.data.data);
					if (status === 'Approved') {
						setStatusType('Approve');
					} else {
						setStatusType('Reject');
					}
					setAssetId(null);
					form.resetFields();
					setAuditStatus(status);
					setIsModalOpen(true);
				})
				.catch((error) => {
					setErrorMessage('Invalid asset id');
					setAuditRecord([]);
					console.log('error', error);
				});
		}
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box className="box-profile">
				<Form className="profile-form" encType="multipart/form-data" form={form}>
					<Row>
						<Col span={8}>
							<Form.Item
								label="Asset ID"
								name="assetId"
								labelAlign="top"
								labelCol={{ span: 24 }}
								onChange={SetAssetRecord}
								rules={[{ required: true, message: 'This field is required' }]}
							>
								<Input placeholder="Enter Asset ID" style={{ height: '40px' }} />
								{errorMessage && <span className="error-message">{errorMessage}</span>}
							</Form.Item>
						</Col>
						<Col span={8}></Col>
						<Col span={8} className="margin-auto mui-text-center">
							<div className="mui-justify-center">
								<Btn className="btn-profile-cancel text-reject" onClick={() => handleStatusModal('Rejected')}>
									Reject
								</Btn>
								<Btn className="btn-profile-submit text-approve" onClick={() => handleStatusModal('Approved')}>
									Approve
								</Btn>
							</div>
						</Col>
					</Row>
				</Form>
				<AuditStatusModal
					AssetData={AuditRecord}
					StatusType={StatusType}
					Status={AuditStatus}
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
				/>
			</Box>
		</Box>
	);
}
