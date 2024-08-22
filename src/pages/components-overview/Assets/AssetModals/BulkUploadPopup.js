import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DownloadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import assetfile from '../../../../assets/asset_sample.xlsx';

const BulkUpload = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleUpload = () => {
        form.validateFields()
            .then((values) => {
                dispatch(BulkUpload(values))
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
            <Button
                sx={{ bgcolor: '#F5F8FF', color: '#919EAB', fontWeight: '600', height: '33px', borderRadius: '5Wpx', fontSize: '12px' }}
                type="primary"
                onClick={showModal}
            >
                <span style={{ marginRight: '5px', fontWeight: '700' }}>
                    {' '}
                    <DownloadOutlined />
                </span>{' '}
                Bulk Upload
            </Button>
            <Modal
                title={
                    <span>
                        Bulk Upload
                        <a
                            href={assetfile}
                            download="asset_sample.xlsx"
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: '#68B3C8', cursor: 'pointer', marginLeft: '5px' }}
                        >
                            <span>DOWNLOAD</span>
                        </a>
                    </span>
                }
                open={open}
                onCancel={handleCancel}
                width={500}
                sx={{ height: '100%', width: '100% ', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
                okText="Upload"
                onOk={handleUpload}
            >
                <Divider />
                <Form style={{ marginTop: '25px' }}>
                    <Form.Item name="file" labelAlign="top" labelCol={{ span: 24 }} sx={{ width: '100%', height: '40px' }}>
                        <Input type="file" style={{ padding: '10px' }} />
                    </Form.Item>
                    <Divider />
                </Form>
            </Modal>
        </>
    );
};
export default BulkUpload;
