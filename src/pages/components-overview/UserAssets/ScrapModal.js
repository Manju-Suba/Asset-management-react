/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllAssetListByPage } from 'components/redux/Assetlist/action';
import { assetDisposeAction } from 'components/redux/DisposalAsset/action';

// eslint-disable-next-line react/prop-types
const ScrapModal = ({ AssetData, PageNo, PageSize, isModalOpen, setIsModalOpen }) => {
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
        formData.append('remark', values.remarks);
        formData.append('status', 'Disposed');
        formData.append('objectId', AssetData.id);

        dispatch(assetDisposeAction(formData))
          .then((response) => {
            toast.success(response.data.message);
            const controller = new AbortController();
            const signal = controller.signal;
            dispatch(getAllAssetListByPage('', '', '', PageNo, PageSize, false, '', signal));
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
        title={'Scrapping Asset Request'}
        open={open}
        okText="Save"
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
          <Form.Item
            label="  Remarks"
            name="remarks"
            labelAlign="top"
            labelCol={{ span: 24 }}
            sx={{ width: '100%' }}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="Enter Remarks" style={{ height: '100px', verticalAlign: 'top', textAlign: 'left' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ScrapModal;
