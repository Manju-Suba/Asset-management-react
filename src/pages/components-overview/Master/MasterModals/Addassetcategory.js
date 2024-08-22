import React, { useState } from 'react';
import { Button, Modal, Form, Select, Input, Divider } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { assetCreate, getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';

const Addassetcategory = ({ bussiness }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        form.resetFields();
        setOpen(true);
    };

    const handleOk = () => {
        // setConfirmLoading(true);
        form.validateFields()
            .then((values) => {
                dispatch(assetCreate(values))
                    .then((response) => {
                        toast.success(response.data.message);
                        dispatch(getAllAssetCategoryDetails());
                        form.resetFields();
                        setOpen(false);
                        setConfirmLoading(false);
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message);
                    });
            })
            .catch((errorInfo) => {
                toast.error('Validation error', errorInfo);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    return (
        <>
            <Button
                onClick={showModal}
                style={{
                    height: '38px',
                    border: 'none',
                    backgroundColor: '#4380EB',
                    borderRadius: '5px',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '600',
                    marginTop: '2px'
                }}
            >
                + Add Asset
            </Button>
            <Modal
                title="Add Asset"
                visible={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={600}
                style={{ height: '100%', width: '100%', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
                okText="Save"
                onOk={handleOk}
            >
                <Divider />
                <Form form={form}>
                    <Form.Item
                        label="Business"
                        name="businessId"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Select
                            defaultValue="Choose Business"
                            style={{ width: '100%', height: '40px' }}
                            showSearch
                            options={
                                bussiness
                                    ? bussiness.map((option) => ({
                                          value: option.id,
                                          label: option.name
                                      }))
                                    : []
                            }
                        />
                    </Form.Item>
                    <Divider />
                    <Form.Item
                        label="Name"
                        name="name"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        style={{ width: '100%', height: '40px' }}
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input placeholder="Enter Name" style={{ height: '40px' }} />
                    </Form.Item>
                    <Divider />
                    <Form.Item
                        label="Description"
                        name="description"
                        className="mat-3"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        style={{ width: '100%' }}
                    >
                        <Input placeholder="Enter Description" style={{ height: '100px', verticalAlign: 'top', textAlign: 'left' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Addassetcategory;
