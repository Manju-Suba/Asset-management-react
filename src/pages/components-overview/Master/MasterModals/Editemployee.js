import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EmployeeUpdate, getAllEmployeeDetails } from 'components/redux/master/Employee/action';
import Divider from '@mui/material/Divider';
import { getAllBusinessDetails } from 'components/redux/master/Business/action';
import { getAllDepartmentDetails } from 'components/redux/master/Department/action';

const Editemployee = ({ EmployeeData, isModalOpen, setIsModalOpen }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const getAllBusinessList = useSelector((state) => state.BusinessAllData && state.BusinessAllData.getAllBusinessList);
    const DepartmentDetails = useSelector((state) => state.DepartmentData && state.DepartmentData.DepartmentList);
    const EmployeeDetails = useSelector((state) => state.EmployeeData && state.EmployeeData.EmployeeList);

    const handleOk = () => {
        setConfirmLoading(true);
        form.validateFields()
            .then((values) => {
                const updatedValues = {
                    ...values,
                    companyId: EmployeeData.companyId,
                    id: EmployeeData.id
                };
                dispatch(EmployeeUpdate(updatedValues))
                    .then((response) => {
                        toast.success(response.data.message);
                        dispatch(getAllEmployeeDetails());
                        form.resetFields();
                        setConfirmLoading(false);
                        setOpen(false);
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message);
                        setConfirmLoading(false);
                    });
            })
            .catch((errorInfo) => {
                toast.error('Validation error', errorInfo);
                setConfirmLoading(false);
            });
    };
    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setOpen(false);
    };
    useEffect(() => {
        setOpen(isModalOpen);

        if (EmployeeData) {
            form.setFieldsValue({
                empId: EmployeeData.empId || '',
                businessId: EmployeeData.businessId ? EmployeeData.businessId : '',
                department: EmployeeData.department ? EmployeeData.department.id : '',
                fullName: EmployeeData.fullName || '',
                email: EmployeeData.email || '',
                jobRole: EmployeeData.jobRole || '',
                costCenter: EmployeeData.costCenter,
                specialRole: EmployeeData.specialRole || '',
                supervisor: EmployeeData.supervisor || ''
            });
        }
    }, [isModalOpen, EmployeeData]);
    useEffect(() => {
        if (!getAllBusinessList || getAllBusinessList.length === 0) {
            dispatch(getAllBusinessDetails());
        }

        if (!DepartmentDetails || DepartmentDetails.length === 0) {
            dispatch(getAllDepartmentDetails());
        }

        if (!EmployeeDetails || EmployeeDetails.length === 0) {
            dispatch(getAllEmployeeDetails());
        }
    }, [dispatch, getAllBusinessList, DepartmentDetails, EmployeeDetails]);

    const options = [
        { value: 'No', label: 'No' },
        { value: 'Supervisor', label: 'Supervisor' }
    ];

    return (
        <>
            <Modal
                title="Edit Employee"
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
                        label="  Employee ID"
                        name="empId"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        sx={{ width: '100%', height: '40px' }}
                        rules={[{ required: true, message: 'This field is required.' }]}
                    >
                        <Input placeholder="Enter Emp Id" style={{ height: '40px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        sx={{ width: '100%', height: '40px' }}
                        rules={[{ required: true, message: 'This field is required.' }]}
                    >
                        <Input placeholder="Enter Name" style={{ height: '40px' }} />
                    </Form.Item>
                    <Divider />
                    <Form.Item
                        label="Email"
                        name="email"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        sx={{ width: '100%' }}
                        rules={[
                            { required: true, message: 'This field is required.' },
                            { type: 'email', message: 'Please enter a valid email address.' }
                        ]}
                    >
                        <Input type="email" placeholder="Enter Email" style={{ height: '40px', verticalAlign: 'top', textAlign: 'left' }} />
                    </Form.Item>
                    <Form.Item
                        label="Job "
                        name="jobRole"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        sx={{ width: '100%', height: '40px' }}
                        rules={[{ required: true, message: 'This field is required.' }]}
                    >
                        <Input placeholder="Enter Name" style={{ height: '40px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Business"
                        name="businessId"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'This field is required.' }]}
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
                    <Form.Item
                        label="Department"
                        name="department"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'This field is required.' }]}
                    >
                        <Select
                            defaultValue="Choose Department"
                            style={{ width: '100%', height: '40px' }}
                            options={
                                DepartmentDetails
                                    ? DepartmentDetails.map((option) => ({
                                          value: option.id,
                                          label: option.name
                                      }))
                                    : []
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="COST Center Code "
                        name="costCenter"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        sx={{ width: '100%', height: '40px' }}
                        rules={[{ required: true, message: 'This field is required.' }]}
                    >
                        <Input placeholder="Enter COST Center Code" style={{ height: '40px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Special Role"
                        name="specialRole"
                        labelAlign="top"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'This field is required.' }]}
                    >
                        <Select defaultValue="Choose Special Role" style={{ width: '100%', height: '40px' }} options={options} />
                    </Form.Item>
                    <Form.Item label="Supervisor List" name="supervisor" labelAlign="top" labelCol={{ span: 24 }}>
                        <Select
                            defaultValue="Choose Supervisor List"
                            style={{ width: '100%', height: '40px' }}
                            options={
                                EmployeeDetails
                                    ? EmployeeDetails.map((option) => ({
                                          value: option.id,
                                          label: option.fullName
                                      }))
                                    : []
                            }
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default Editemployee;
