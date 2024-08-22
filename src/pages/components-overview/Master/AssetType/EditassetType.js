import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Input, Divider } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { assetTypeUpdate, getAllAssetTypeDetails } from 'components/redux/master/AssetType/action';

const EditassetType = ({ categoryData, AssetTYpe, isModalOpen, setIsModalOpen }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [open, setOpen] = useState(isModalOpen);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = () => {
        // setConfirmLoading(true);
        form.validateFields()
            .then((values) => {
                dispatch(assetTypeUpdate(values))
                    .then((response) => {
                        toast.success(response.data.message);
                        dispatch(getAllAssetTypeDetails());
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
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
        setIsModalOpen(false);
    };

    useEffect(() => {
        setOpen(isModalOpen);
        if (AssetTYpe) {
            form.setFieldsValue({
                id: AssetTYpe.id,
                assetCategory: AssetTYpe.assetCategory ? AssetTYpe.assetCategory.id : '',
                name: AssetTYpe.name,
                description: AssetTYpe.description
            });
        }
    }, [AssetTYpe, isModalOpen]);
    return (
        <>
            <Modal
                title="Edit Asset Type"
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
                        label="Category"
                        name="assetCategory"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Select
                            defaultValue="Choose Category"
                            style={{ width: '100%', height: '40px' }}
                            showSearch
                            options={
                                categoryData
                                    ? categoryData.map((option) => ({
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
                    <Form.Item label="" name="id" type="hidden">
                        <Input type="hidden" placeholder="Enter id" />
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

export default EditassetType;
