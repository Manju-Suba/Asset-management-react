import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Table, Space, Checkbox, Popconfirm } from 'antd';
import TableContainer from '@mui/material/TableContainer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField } from '../../../../../node_modules/@mui/material/index';
import { getAllBrandDetails, deleteBrand } from 'components/redux/master/Brand/action';

// icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import EditBrand from '../MasterModals/EditBrand';
import AddBrand from '../MasterModals/Addbrand';

export default function Brand() {
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [editasset, setEditAsset] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const BrandDetails = useSelector((state) => state.BrandData && state.BrandData.BrandList);

    React.useEffect(() => {
        dispatch(getAllBrandDetails());
    }, [dispatch]);

    const confirmDelete = (id) => {
        if (id) {
            dispatch(deleteBrand(id))
                .then((response) => {
                    toast.success(response.data.message);
                    dispatch(getAllBrandDetails());
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        }
    };
    const cancel = () => {
        toast.error('Cancelled');
    };

    const handleSelectAllChange = (e) => {
        const updatedSelectAll = e.target.checked;
        setSelectAll(updatedSelectAll);
        const updatedSelectedRows = updatedSelectAll ? [...BrandDetails] : [];
        setSelectedRows(updatedSelectedRows);
    };

    const handleCheckboxChange = (e, record) => {
        const updatedSelectedRows = [...selectedRows];

        if (e.target.checked) {
            updatedSelectedRows.push(record);
        } else {
            const index = updatedSelectedRows.findIndex((row) => row.id === record.id);
            if (index !== -1) {
                updatedSelectedRows.splice(index, 1);
            }
        }

        setSelectedRows(updatedSelectedRows);
        setSelectAll(updatedSelectedRows.length === BrandDetails.length);
    };

    const handleEditModal = (e, Record) => {
        setEditAsset(Record);
        setIsModalOpen(true);
    };

    let columns = [
        {
            title: <Checkbox onChange={handleSelectAllChange} checked={selectAll} />,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (_, record) => (
                <Checkbox
                    key={record.key}
                    onChange={(e) => handleCheckboxChange(e, record)}
                    checked={selectedRows.some((row) => row.id === record.id)}
                    //   checked={record.checked}
                />
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" style={{ color: '#A5A1A1' }}>
                    <EditIcon onClick={(e) => handleEditModal(e, record)} data-id={record.id} />
                    <Popconfirm
                        title="Delete the brand"
                        description="Are you sure to delete this?"
                        onConfirm={() => confirmDelete(record.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteIcon />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }} className="box-shadow-none">
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        ...(selectedRows.length > 0 && {
                            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                        })
                    }}
                >
                    {selectedRows.length > 0 ? (
                        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                            {selectedRows.length} selected
                        </Typography>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item lg={3} md={4} sm={5} xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="asset"
                                    type="text"
                                    placeholder="Search"
                                    style={{ border: 'none', bgcolor: '#FBFBFB' }}
                                    InputProps={{
                                        style: {
                                            width: '90%',
                                            height: '100%',
                                            color: '#708090',
                                            marginLeft: '20px',
                                            marginTop: '5px'
                                        },
                                        startAdornment: (
                                            <IconButton aria-label="Toggle password visibility" edge="start">
                                                <SearchSharpIcon sx={{ color: '#708090', fontSize: '19px', fontWeight: '700' }} />
                                            </IconButton>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={4}
                                sm={2}
                                xs={0}
                                display={{ lg: 'inline', md: 'inline', sm: 'inline', xs: 'none' }}
                            ></Grid>
                            <Grid item lg={3} md={4} sm={5} xs={6}>
                                <AddBrand />
                            </Grid>
                            <Grid item lg={6} md={4} sm={2} xs={2} />
                        </Grid>
                    )}

                    {selectedRows.length > 0 && (
                        <Tooltip title="Delete">
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Toolbar>
                <TableContainer>
                    <Table columns={columns} dataSource={BrandDetails} pagination={true} />
                </TableContainer>
                <EditBrand BrandData={editasset} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </Paper>
        </Box>
    );
}
