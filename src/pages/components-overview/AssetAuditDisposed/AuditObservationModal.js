/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { observationActionCreate, getAssetAuditPending } from 'components/redux/AssetAudit/action';

// eslint-disable-next-line react/prop-types
const AuditObservationModal = ({ AssetData, isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(isModalOpen);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append('assetId', values.assetId);
        formData.append('remarks', values.remarks);
        formData.append('observationDate',AssetData.nextAuditDate);
        formData.append('id', AssetData.id);

        dispatch(observationActionCreate(formData))
          .then((response) => {
            toast.success(response.data.message);
            dispatch(getAssetAuditPending(0,10));
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
  };

  useEffect(() => {
    setOpen(isModalOpen);

    if (AssetData) {
      form.resetFields();
      form.setFieldsValue({
        // eslint-disable-next-line react/prop-types
        assetId: AssetData.assetId
      });
    }
  }, [AssetData, dispatch, form, isModalOpen]);

  return (
    <>
      <Modal
        title={'Observation Remarks '}
        open={open}
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
            label="  Asset Id"
            name="assetId"
            labelAlign="top"
            labelCol={{ span: 24 }}
            sx={{ width: '100%', height: '40px' }}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="Enter Asset Id" style={{ height: '40px' }} readOnly />
          </Form.Item>
          <Form.Item label="  Remarks" name="remarks" labelAlign="top" labelCol={{ span: 24 }} sx={{ width: '100%' }}>
            <Input placeholder="Enter Remarks" style={{ height: '100px', verticalAlign: 'top', textAlign: 'left' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AuditObservationModal;
