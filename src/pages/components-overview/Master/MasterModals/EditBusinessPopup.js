import React, { useEffect, useState } from 'react';
import { Modal, Form, Input } from 'antd';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bussinessUpdate, getAllBusinessDetails } from 'components/redux/master/Business/action';

const EditBusiness = ({ BusinessData, isModalOpen, setIsModalOpen }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const handleCancel = () => {
        setOpen(false);
        setIsModalOpen(false);
    };

    useEffect(() => {
        setOpen(isModalOpen);
        if (BusinessData) {
            form.setFieldsValue({
                name: BusinessData.name,
                description: BusinessData.description
            });
        }
    }, [BusinessData]);

    const handleUpdate = () => {
        form.validateFields()
            .then((values) => {
                const updatedValues = { ...values, id: BusinessData.id };
                dispatch(bussinessUpdate(updatedValues))
                    .then((response) => {
                        toast.success(response.data.message);
                        dispatch(getAllBusinessDetails());
                        form.resetFields();
                        setOpen(false);
                    })
                    .catch((error) => {
                        toast.error('From submission Error', error);
                    });
            })
            .catch((errorInfo) => {
                toast.error('Validation error', errorInfo);
            });
    };

    return (
        <>
            <Modal
                title="Update Business"
                visible={open}
                onCancel={handleCancel}
                width={600}
                sx={{ height: '100%', width: '100% ', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
                okText="Update"
                onOk={handleUpdate}
            >
                <Divider />
                <Form form={form}>
                    <Form.Item
                        label="Business"
                        name="name"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        sx={{ width: '100%', height: '40px' }}
                        rules={[{ required: true, message: 'Please enter the Business Name' }]}
                    >
                        <Input placeholder="Enter Business" style={{ height: '40px' }} />
                    </Form.Item>
                    <Divider />
                    <Form.Item label="Description" name="description" labelAlign="top" labelCol={{ span: 24 }} sx={{ width: '100%' }}>
                        <Input placeholder="Enter Description" style={{ height: '100px', verticalAlign: 'top', textAlign: 'left' }} />
                    </Form.Item>
                    <Divider />
                </Form>
            </Modal>
        </>
    );
};
export default EditBusiness;
