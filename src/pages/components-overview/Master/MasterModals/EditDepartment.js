import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Divider from '@mui/material/Divider';
import { DepartmentUpdate, getAllDepartmentDetails } from 'components/redux/master/Department/action';
import { getAllBusinessDetails } from 'components/redux/master/Business/action';

const EditDepartment = ({ DepartmentData, isModalOpen, setIsModalOpen }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();

    const handleOk = () => {
        setConfirmLoading(true);
        form.validateFields()
            .then((values) => {
                dispatch(DepartmentUpdate(values))
                    .then((response) => {
                        toast.success(response.data.message);
                        dispatch(getAllDepartmentDetails());
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
        setConfirmLoading(false);
        setOpen(false);
        form.resetFields();
        setIsModalOpen(false);
    };

    const getAllBusinessList = useSelector((state) => state.BusinessAllData && state.BusinessAllData.getAllBusinessList);
    useEffect(() => {
        dispatch(getAllBusinessDetails());
        setOpen(isModalOpen);
        if (DepartmentData) {
            form.setFieldsValue({
                id: DepartmentData.id,
                businessId: DepartmentData.businessId,
                name: DepartmentData.name,
                description: DepartmentData.description
            });
        }
    }, [dispatch, DepartmentData]);

    return (
        <>
            <Modal
                title="Add Department"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={600}
                sx={{ height: '100%', width: '100% ', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
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
                            options={
                                getAllBusinessList
                                    ? getAllBusinessList.map((option) => ({
                                          value: option.id,
                                          label: option.name
                                      }))
                                    : []
                            }
                        />
                    </Form.Item>
                    <Divider />
                    <Form.Item
                        label="  Name"
                        name="name"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        sx={{ width: '100%', height: '40px' }}
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input placeholder="Enter Name" style={{ height: '40px' }} />
                    </Form.Item>
                    <Divider />
                    <Form.Item
                        label="  Description"
                        name="description"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        sx={{ width: '100%' }}
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input placeholder="Enter Description" style={{ height: '100px', verticalAlign: 'top', textAlign: 'left' }} />
                    </Form.Item>
                    <Form.Item label="" name="id" type="hidden">
                        <Input type="hidden" placeholder="Enter id" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default EditDepartment;
