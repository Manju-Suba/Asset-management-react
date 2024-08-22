import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bussinessCreate, getAllBusinessDetails } from 'components/redux/master/Business/action';
const Addbusiness = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [open, setOpen] = useState(false);

    const showModal = () => {
        form.resetFields();
        setOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                dispatch(bussinessCreate(values))
                    .then((response) => {
                        toast.success(response.data.message);
                        dispatch(getAllBusinessDetails());
                        form.resetFields();
                        setOpen(false);
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message);
                    });
            })
            .catch((errorInfo) => {
                toast.error('Validation error', errorInfo);
            });
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
                + Add Asset
            </Button>
            <Modal
                title="Add Business"
                open={open}
                onCancel={handleCancel}
                width={600}
                sx={{ height: '100%', width: '100% ', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
                okText="Save"
                onOk={handleCreate}
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
                    <Form.Item
                        label="Description"
                        name="description"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        sx={{ width: '100%' }}
                        rules={[{ required: true, message: 'Please enter the Business Name' }]}
                    >
                        <Input placeholder="Enter Description" style={{ height: '100px', verticalAlign: 'top', textAlign: 'left' }} />
                    </Form.Item>
                    <Divider />
                </Form>
            </Modal>
        </>
    );
};
export default Addbusiness;
