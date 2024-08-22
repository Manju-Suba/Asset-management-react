import React, { useState } from 'react';
import { Modal, Form, Input, Checkbox, Select } from 'antd';
import { Grid } from '../../../../../node_modules/@mui/material/index';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBusinessDetails } from 'components/redux/master/Business/action';
import { getAllBrandDetails } from 'components/redux/master/Brand/action';
import { getAllLocationDetails } from 'components/redux/master/Location/action';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { getAssetTypeByCategory } from 'components/redux/master/AssetType/action';
import { getAllEmployeeDetails } from 'components/redux/master/Employee/action';
import { assetCreate, getAllAssetDetails } from 'components/redux/asset/action';

const { Option } = Select;

const Addassets = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Choose Asset Category');
    //   const [assetTypes, setAssetTypes] = useState([]);
    const [assetAllocation, setAssetAllocation] = useState('NO');
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const getAllBusinessList = useSelector((state) => state.BusinessAllData && state.BusinessAllData.getAllBusinessList);
    const BrandDetails = useSelector((state) => state.BrandData && state.BrandData.BrandList);
    const EmployeeDetails = useSelector((state) => state.EmployeeData && state.EmployeeData.EmployeeList);
    const LocationDetails = useSelector((state) => state.LocationData && state.LocationData.LocationList);
    const AssetCategoryDetails = useSelector((state) => state.AssetCateData && state.AssetCateData.AssetCategoryData);
    const AssetTypeDetails = useSelector((state) => state.AssetTypeData && state.AssetTypeData.AssetTypeByCate);

    const showModal = () => {
        form.resetFields();
        dispatch(getAllBusinessDetails());
        dispatch(getAllBrandDetails());
        dispatch(getAllEmployeeDetails());
        dispatch(getAllLocationDetails());
        dispatch(getAllAssetCategoryDetails());
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        form.validateFields()
            .then((values) => {
                values.date = formatDate(values.date);
                values.expiryDate = formatDate(values.expiryDate);
                values.temporary = settemporary(values.temporary);
                dispatch(assetCreate(values))
                    .then((response) => {
                        toast.success(response.data.message);
                        dispatch(getAllAssetDetails());
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
        setOpen(false);
        setConfirmLoading(false);
    };

    const handleCheckboxChange = (checked) => {
        form.setFieldsValue({ temporary: checked });
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD part
    }

    function settemporary(temp) {
        if (temp === true) {
            return 'Yes';
        } else {
            return 'No';
        }
    }

    const TypeOption = [
        { value: 'Choose Business', label: 'Choose Business' },
        { value: 'CKPL', label: 'CKPL' },
        { value: 'OWN', label: 'OWN' },
        { value: 'Rental', label: 'Rental' },
        { value: 'Office Property', label: 'Office Property' },
        { value: 'BYOD', label: 'BYOD' }
    ];

    const Assetallocate = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
    ];

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1
    });

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        dispatch(getAssetTypeByCategory(value));
        // setAssetTypes(AssetTypeDetails || []);
    };

    const laptopFields = [
        { label: 'CPU-Laptop Model', value: 'cpuLaptopModel' },
        { label: 'CPU-Laptop Configuration', value: 'cpuLaptopConfiguration' },
        { label: 'CPU-Laptop Si#', value: 'cpuLaptopSi' },
        { label: 'Host name', value: 'hostName' },
        { label: 'RAM', value: 'ram' },
        { label: 'HDD-SSD', value: 'hddSdd' },
        { label: 'MOUSE', value: 'mouse' },
        { label: 'OS', value: 'os' },
        { label: 'Keyboard', value: 'keyboard' }
    ];

    const desktopFields = [
        { label: 'CPU-Desktop Model', value: 'cpuLaptopModel' },
        { label: 'CPU-Desktop Configuration', value: 'cpuLaptopConfiguration' },
        { label: 'CPU-Desktop Si#', value: 'cpuLaptopSi' },
        { label: 'Host name', value: 'hostName' },
        { label: 'RAM', value: 'ram' },
        { label: 'HDD-SSD', value: 'hddSdd' },
        { label: 'MOUSE', value: 'mouse' },
        { label: 'OS', value: 'os' },
        { label: 'Monitor Size', value: 'monitorSize' },
        { label: 'Monitor Serial', value: 'monitorSerial' },
        { label: 'Keyboard', value: 'keyboard' }
    ];

    const [selectedAssetType, setSelectedAssetType] = useState('');

    const handleAssetTypeChange = (value) => {
        // setSelectedAssetType(value);
        const selectedAssetType = AssetTypeDetails.find((assetType) => assetType.id === value);
        setSelectedAssetType(selectedAssetType ? selectedAssetType.name : null);
        console.log(selectedAssetType ? selectedAssetType.name : null);
    };

    const handleAssetAllocationChange = (value) => {
        setAssetAllocation(value);
    };

    return (
        <>
            <Button
                onClick={showModal}
                sx={{
                    wight: '100%',
                    height: '33px',
                    border: 'none',
                    bgcolor: '#4380EB',
                    borderRadius: '5px',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginLeft: '20px',
                    marginTop: '2px',
                    '&:hover': {
                        bgcolor: '#4380EB'
                    }
                }}
            >
                + create New Asset
            </Button>
            <Modal
                title="Create New Asset"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={1000}
                okText="Save"
                sx={{ height: '100%', width: '100% ', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
            >
                <Form form={form}>
                    <Grid
                        item
                        container
                        spacing={2}
                        columns={16}
                        sx={{ mt: 3, ml: 1, color: '#454F5B', fontSize: '14px', fontWeight: '600' }}
                    >
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label="Business"
                                name="business"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Select defaultValue="Choose Business" style={{ width: 150, height: '40px' }}>
                                    {getAllBusinessList.map((option) => (
                                        <Option key={option.id} value={option.id}>
                                            {option.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label="Type"
                                name="type"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Select defaultValue="Choose Type" style={{ width: 150, height: '40px' }}>
                                    {TypeOption.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label="Asset Category"
                                name="assetCategory"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Select
                                    defaultValue="Choose Asset Category"
                                    style={{ width: 150, height: '40px' }}
                                    onChange={handleCategoryChange}
                                >
                                    {AssetCategoryDetails.map((option) => (
                                        <Option key={option.id} value={option.id}>
                                            {option.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label="  Asset Type"
                                name="assetType"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Select
                                    defaultValue="Choose Asset"
                                    style={{ width: 150, height: '40px' }}
                                    disabled={selectedCategory == 'Choose Asset Category'}
                                    onChange={handleAssetTypeChange}
                                >
                                    {AssetTypeDetails.map((assetType) => (
                                        <Option key={assetType.id} value={assetType.id}>
                                            {assetType.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Form.Item
                                label="  Name"
                                name="name"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ width: 150, height: '40px' }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input placeholder="Enter Name" style={{ height: '40px' }} />
                            </Form.Item>
                        </Grid>
                    </Grid>
                    {/* 2nd row */}
                    <Grid
                        item
                        container
                        spacing={2}
                        columns={16}
                        sx={{ mt: 3, ml: 1, color: '#454F5B', fontSize: '14px', fontWeight: '600' }}
                    >
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Form.Item
                                label="Port No."
                                name="portNo"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ width: 150, height: '50px' }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input placeholder="Enter Port No." style={{ height: '40px' }} />
                            </Form.Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label=" Asset ID"
                                name="AssetId"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ width: 150, height: '50px' }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input placeholder="Enter Asset ID" style={{ height: '40px' }} />
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label=" QR Code"
                                name="qrcode"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ width: 150, height: '50px' }}
                            >
                                <Input placeholder="Enter QR Code" style={{ height: '40px' }} />
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Form.Item
                                label=" Cost Center"
                                name="costCenter"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                item
                                sx={{ width: 150, height: '50px' }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input placeholder="Enter Cost Center" style={{ height: '40px' }} />
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Form.Item
                                label="  Location"
                                name="location"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Select
                                    defaultValue="Choose Location"
                                    style={{ width: 150, height: '40px' }}
                                    options={LocationDetails.map((option) => ({
                                        value: option.id,
                                        label: option.name
                                    }))}
                                />
                            </Form.Item>
                        </Grid>
                    </Grid>
                    {/* 3rd row */}
                    <Grid
                        item
                        container
                        spacing={2}
                        columns={16}
                        sx={{ mt: 3, ml: 1, color: '#454F5B', fontSize: '14px', fontWeight: '600' }}
                    >
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Form.Item
                                label="Brand"
                                name="brand"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Select
                                    defaultValue="Choose Brand"
                                    style={{ width: 150, height: '40px' }}
                                    options={BrandDetails.map((option) => ({
                                        value: option.id,
                                        label: option.name
                                    }))}
                                />
                            </Form.Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label=" Cost"
                                name="cost"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ width: 150, height: '50px' }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input placeholder="Enter Cost" style={{ height: '40px' }} />
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label="   Date"
                                name="date"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ height: '50px' }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Grid sx={{ width: 150 }} components={['DatePicker']}>
                                        <DatePicker
                                            label=" Enter Date"
                                            format="YYYY-MM-DD"
                                            onChange={(date) => form.setFieldsValue({ date })}
                                        />
                                    </Grid>
                                </LocalizationProvider>
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label="  Asset Domain"
                                name="assetDomain"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Grid item sx={{ width: 150, height: '50px' }}>
                                    <Input placeholder="Enter Asset Domain" style={{ height: '40px' }} />
                                </Grid>
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Form.Item
                                label=" SPOC"
                                name="spoc"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Select
                                    defaultValue="Choose SPOC"
                                    style={{ width: 150, height: '40px' }}
                                    options={EmployeeDetails.map((option) => ({
                                        value: option.id,
                                        label: `${option.fullName} / ${option.empId}`,
                                        disabled: option.disabled
                                    }))}
                                />
                            </Form.Item>
                        </Grid>
                    </Grid>
                    {/* 4th row */}
                    <Grid
                        item
                        container
                        spacing={2}
                        columns={16}
                        sx={{ mt: 3, ml: 1, color: '#454F5B', fontSize: '14px', fontWeight: '600' }}
                    >
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label="  Asset Allocate"
                                name="assetAllocate"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Select defaultValue="No" style={{ width: 150, height: '40px' }} onChange={handleAssetAllocationChange}>
                                    {Assetallocate.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Grid>

                        {assetAllocation === 'Yes' && (
                            <>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    {' '}
                                    <Form.Item
                                        label="Employee"
                                        name="employee"
                                        labelAlign="top"
                                        labelCol={{ span: 24 }}
                                        rules={[{ required: true, message: 'This field is required' }]}
                                    >
                                        <Select defaultValue="Choose Employee" style={{ width: 150, height: '40px' }}>
                                            {EmployeeDetails.map((option) => (
                                                <Option key={option.id} value={option.id}>
                                                    {option.fullName} / {option.empId}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12} sm={6} md={4} lg={6}>
                            {' '}
                            <Form.Item
                                label="  Description"
                                name="description"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ width: '90%', height: '50px' }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input placeholder="Enter Description" style={{ height: '40px' }} />
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label=" Version"
                                name="version"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ width: 150, height: '50px' }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input placeholder="Enter Version" style={{ height: '40px' }} />
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Form.Item
                                label="  Qty"
                                name="qty"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ width: 150, height: '50px' }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input placeholder="Enter Qty" style={{ height: '40px' }} />
                            </Form.Item>
                        </Grid>
                    </Grid>
                    {/* 5th row */}
                    <Grid
                        item
                        container
                        spacing={2}
                        columns={16}
                        sx={{ mt: 3, ml: 1, color: '#454F5B', fontSize: '14px', fontWeight: '600' }}
                    >
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Form.Item
                                label="  User List"
                                name="userList"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ width: 150, height: '50px' }}
                            >
                                <Input placeholder="Enter User List" style={{ height: '40px' }} />
                            </Form.Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label="   Vendor"
                                name="vendor"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ width: 150, height: '50px' }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input placeholder="Enter Vendor" style={{ height: '40px' }} />
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Form.Item
                                label="  License Key"
                                name="licenseKey"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ width: 150, height: '50px' }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input placeholder="Enter License Key" style={{ height: '40px' }} />
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label="  Expiry Date"
                                name="expiryDate"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ height: '50px' }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Grid item sx={{ width: 150 }} components={['DatePicker']}>
                                        <DatePicker
                                            label=" Enter Date"
                                            format="YYYY-MM-DD"
                                            onChange={(date) => form.setFieldsValue({ expiryDate: date })}
                                        />
                                    </Grid>
                                </LocalizationProvider>
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Form.Item
                                label=" Quantity"
                                name="Quantity"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ width: 150, height: '50px' }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input placeholder="Enter Quantity" style={{ height: '40px' }} />
                            </Form.Item>
                        </Grid>
                    </Grid>
                    {/* 6th row */}
                    <Grid
                        item
                        container
                        spacing={2}
                        columns={16}
                        sx={{ mt: 3, ml: 1, color: '#454F5B', fontSize: '14px', fontWeight: '600' }}
                    >
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Form.Item
                                label=" IP Address"
                                name="ipAddress"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                sx={{ width: 150, height: '50px' }}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input placeholder="Enter IP Address" style={{ height: '40px' }} />
                            </Form.Item>
                        </Grid>
                        {selectedAssetType && selectedAssetType === 'laptop' && (
                            <>
                                {laptopFields.map((field) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={field.label}>
                                        {' '}
                                        <Form.Item
                                            label={field.label}
                                            name={field.value}
                                            labelAlign="top"
                                            labelCol={{ span: 24 }}
                                            rules={[{ required: true, message: 'This field is required' }]}
                                        >
                                            <Input placeholder={`Enter ${field.label}`} style={{ height: '40px' }} />
                                        </Form.Item>
                                    </Grid>
                                ))}
                            </>
                        )}

                        {selectedAssetType && selectedAssetType === 'desktop' && (
                            <>
                                {desktopFields.map((field) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={field.label}>
                                        <Form.Item
                                            label={field.label}
                                            name={field.value}
                                            labelAlign="top"
                                            labelCol={{ span: 24 }}
                                            rules={[{ required: true, message: 'This field is required' }]}
                                        >
                                            <Input placeholder={`Enter ${field.label}`} style={{ height: '40px' }} />
                                        </Form.Item>
                                    </Grid>
                                ))}
                            </>
                        )}

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label=" picture"
                                name="imageUpload"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                item
                                sx={{ width: 150, height: '50px' }}
                            >
                                <Button
                                    component="label"
                                    variant="contained "
                                    sx={{
                                        width: 150,
                                        height: '43px',
                                        bgcolor: '',
                                        color: '#4096ff',
                                        border: '2px dotted #E9E9E9',
                                        borderRadius: '5px'
                                    }}
                                >
                                    Choose file
                                    <Grid>
                                        <VisuallyHiddenInput type="file" />
                                    </Grid>
                                </Button>
                            </Form.Item>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {' '}
                            <Form.Item
                                label=" Document Upload"
                                name="documentUpload"
                                labelAlign="top"
                                labelCol={{ span: 24 }}
                                item
                                sx={{ width: 150, height: '50px' }}
                            >
                                <Button
                                    component="label"
                                    variant="contained "
                                    sx={{
                                        width: 150,
                                        height: '43px',
                                        bgcolor: '',
                                        color: '#4096ff',
                                        border: '2px dotted #E9E9E9',
                                        borderRadius: '5px'
                                    }}
                                >
                                    Choose file
                                    <Grid>
                                        <VisuallyHiddenInput type="file" />
                                    </Grid>
                                </Button>
                            </Form.Item>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        spacing={2}
                        columns={16}
                        sx={{ mt: 3, ml: 1, color: '#454F5B', fontSize: '14px', fontWeight: '600' }}
                    >
                        {assetAllocation === 'Yes' && (
                            <>
                                {/* <Grid item xs={12} sm={6} md={4} lg={3}> */}{' '}
                                <Form.Item
                                    label="Temporary (if you need to allocate this in temporary?)"
                                    name="temporary"
                                    labelAlign="top"
                                    labelCol={{ span: 24 }}
                                    sx={{ width: '90%', height: '50px' }}
                                    valuePropName="checked"
                                >
                                    <Checkbox defaultChecked={false} onChange={(e) => handleCheckboxChange(e.target.checked)}>
                                        Yes
                                    </Checkbox>
                                </Form.Item>
                                {/* </Grid> */}
                            </>
                        )}
                    </Grid>
                </Form>
            </Modal>
        </>
    );
};
export default Addassets;
