import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { LocationCreate, getAllLocationDetails } from 'components/redux/master/Location/action';

const Addlocation = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        form.validateFields()
            .then((values) => {
                dispatch(LocationCreate(values))
                    .then((response) => {
                        toast.success(response.data.message);
                        dispatch(getAllLocationDetails());
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
        setOpen(false);
    };

    return (
        <>
            <Button
                onClick={showModal}
                sx={{
                    wight: '100%',
                    height: '38px',
                    border: 'none',
                    bgcolor: '#4380EB',
                    borderRadius: '5px',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '600',
                    marginLeft: '20px',
                    marginTop: '5px',
                    '&:hover': {
                        bgcolor: '#4380EB'
                    }
                }}
            >
                + Add Location
            </Button>
            <Modal
                title="Add Location"
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
                        label="Location"
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
                        label="Location Description"
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
        </>
    );
};
export default Addlocation;
