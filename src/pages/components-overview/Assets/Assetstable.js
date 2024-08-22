import React from 'react';
import { Space, Table } from 'antd';
import { Grid } from '../../../../node_modules/@mui/material/index';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileMoveSharpIcon from '@mui/icons-material/DriveFileMoveSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { Select } from 'antd';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';

// image
import Computeriamge from 'assets/images/users/computer.png';
// import ViewAsset from './ViewAsset/ViewAsset';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import BulkUpload from './AssetModals/BulkUploadPopup';
import Addassets from './AssetModals/CreateAssetPopup';
import Editassets from './AssetModals/EditAssetPopup';
import { getAllAssetDetails } from 'components/redux/asset/action';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { getAssetTypeByCategory } from 'components/redux/master/AssetType/action';
import { useDispatch, useSelector } from 'react-redux';

const Assetstable = () => {
  const dispatch = useDispatch();
  // const [selectedAsset, setSelectedAsset] = useState(null);
  const AssetAllocated = useSelector((state) => state.AssetData && state.AssetData.AssetAllocated);
  const [editasset, setEditAsset] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const columns = [
    {
      title: <span className="table-hd-fs">Picture </span>,

      dataIndex: 'picture',
      key: 'picture',
      render: () => (
        <Space size="middle">
          <img src={Computeriamge} alt={Computeriamge} style={{ width: '30px' }} />
        </Space>
      )
    },
    {
      dataIndex: 'name',
      key: 'name',
      title: <span className="table-hd-fs">Asset Details</span>,
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 1
      },
      sortDirections: ['descend', 'ascend'],
      sortIcon: ({ sortOrder }) => {
        return sortOrder === 'descend' ? (
          <ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        ) : (
          <ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        );
      }
    },
    {
      title: <span className="table-hd-fs">Serial No</span>,

      dataIndex: 'serialNo',
      key: 'serialNo',
      sorter: {
        compare: (a, b) => a.serialNo.localeCompare(b.serialNo),
        multiple: 1
      },
      sortDirections: ['descend', 'ascend'],
      sortIcon: ({ sortOrder }) => {
        return sortOrder === 'descend' ? (
          <ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        ) : (
          <ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        );
      }
    },
    {
      title: <span className="table-hd-fs">Host Name</span>,

      key: 'hostName',
      dataIndex: 'hostName',
      sorter: {
        compare: (a, b) => a.hostName.localeCompare(b.hostName),
        multiple: 1
      },
      sortDirections: ['descend', 'ascend'],
      sortIcon: ({ sortOrder }) => {
        return sortOrder === 'descend' ? (
          <ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        ) : (
          <ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        );
      }
    },
    {
      title: <span className="table-hd-fs">Type</span>,

      dataIndex: 'type',
      key: 'type',
      sorter: {
        compare: (a, b) => a.type.localeCompare(b.type),
        multiple: 1
      },
      sortDirections: ['descend', 'ascend'],
      sortIcon: ({ sortOrder }) => {
        return sortOrder === 'descend' ? (
          <ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        ) : (
          <ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        );
      }
    },
    {
      title: <span className="table-hd-fs">Brand</span>,
      dataIndex: 'brand',
      key: 'brand',
      render: (_, record) => record.brand?.name || '',
      sorter: {
        compare: (a, b) => a.brand.localeCompare(b.brand),
        multiple: 1
      },
      sortDirections: ['descend', 'ascend'],
      sortIcon: ({ sortOrder }) => {
        return sortOrder === 'descend' ? (
          <ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        ) : (
          <ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        );
      }
    },
    {
      title: <span className="table-hd-fs">Employee</span>,

      dataIndex: 'employee',
      key: 'employee',
      render: (_, record) => record.spoc?.fullName || '',
      sorter: {
        compare: (a, b) => a.employee.localeCompare(b.employee),
        multiple: 1
      },
      sortDirections: ['descend', 'ascend'],
      sortIcon: ({ sortOrder }) => {
        return sortOrder === 'descend' ? (
          <ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        ) : (
          <ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        );
      }
    },
    {
      title: <span className="table-hd-fs">Location</span>,

      dataIndex: 'location',
      key: 'location',
      render: (_, record) => record.location?.name || '',
      sorter: {
        compare: (a, b) => a.location.localeCompare(b.location),
        multiple: 1
      },
      sortDirections: ['descend', 'ascend'],
      sortIcon: ({ sortOrder }) => {
        return sortOrder === 'descend' ? (
          <ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        ) : (
          <ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        );
      }
    },
    {
      title: <span className="table-hd-fs">QR</span>,
      dataIndex: 'qrcode',
      key: 'qrcode',
      sorter: {
        compare: (a, b) => a.qrcode.localeCompare(b.qrcode),
        multiple: 1
      },
      sortDirections: ['descend', 'ascend'],
      sortIcon: ({ sortOrder }) => {
        return sortOrder === 'descend' ? (
          <ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        ) : (
          <ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
        );
      }
    },
    {
      title: <span className="table-hd-fs">Action</span>,

      key: 'action',
      render: (_, record) => (
        <Space>
          <Grid item sx={{ color: '#A5A1A1', fontSize: '1px' }}>
            <CheckCircleRoundedIcon sx={{ fontSize: '16px' }} />
          </Grid>
          <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
            <EditSharpIcon sx={{ fontSize: '16px' }} onClick={(e) => handleEditModal(e, record)} />
          </Grid>

          <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
            <DeleteIcon sx={{ fontSize: '16px' }} />
          </Grid>
          <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
            <DriveFileMoveSharpIcon sx={{ fontSize: '16px' }} />
          </Grid>
        </Space>
      )
    }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('Choose Asset Category');
  const [selectedAssetType, setSelectedAssetType] = React.useState(null);

  // const AssetAllocated = useSelector((state) => state.AssetData && state.AssetData.AssetAllocated);
  const AssetCategoryDetails = useSelector((state) => state.AssetCateData && state.AssetCateData.AssetCategoryData);
  const AssetTypeDetails = useSelector((state) => state.AssetTypeData && state.AssetTypeData.AssetTypeByCate);

  const All = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'Yiminghe' },
    { value: 'disabled', label: 'Disabled', disabled: true }
  ];

  const handleCategoryChange = (value) => {
    setSelectedAssetType(null);
    setSelectedCategory(value);
    dispatch(getAssetTypeByCategory(value));

    dispatch(getAllAssetDetails(value, selectedAssetType));
    // setAssetTypes(AssetTypeDetails || []);
  };

  const handleAssetTypeChange = (value) => {
    setSelectedAssetType(value);
    dispatch(getAllAssetDetails(selectedCategory, value));
  };

  const handleEditModal = (e, Record) => {
    setEditAsset(Record);
    setIsModalOpen(true);
  };
  // const handleRowClick = (record) => {
  //   setSelectedAsset(record);
  //   onRowClick();
  // }

  React.useEffect(() => {
    dispatch(getAllAssetCategoryDetails());
    dispatch(getAllAssetDetails(selectedCategory, selectedAssetType));
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="xl" sx={{ height: '100%', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
        <Toolbar disableGutters sx={{ height: '50%' }}>
          <Grid item container spacing={2} columns={16}>
            {/* 1st col */}
            <Grid item lg={2} sm={4}>
              {/* search box */}
              <TextField
                name="asset"
                type={'text'}
                placeholder="search "
                sx={{ border: 'none' }}
                InputProps={{
                  style: { width: '100%', height: '33px', color: '#C7C7C7', bgcolor: '#FBFBFB' },
                  startAdornment: (
                    <IconButton aria-label="Toggle password visibility" edge="start">
                      <SearchSharpIcon sx={{ color: '#C7C7C7', fontSize: '18px', fontWeight: '700' }} />
                    </IconButton>
                  )
                }}
              />
            </Grid>

            {/* 2nd col */}
            <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
              <Select
                defaultValue="Asset Category"
                style={{ width: '100%', height: '33px' }}
                showSearch
                onChange={handleCategoryChange}
                options={AssetCategoryDetails.map((option) => ({
                  value: option.id,
                  label: option.name
                }))}
              />
            </Grid>
            {/* 3nd  col*/}
            <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
              <Select
                defaultValue="Asset type"
                style={{ width: '100%', height: '33px' }}
                showSearch
                onChange={handleAssetTypeChange}
                disabled={selectedCategory == 'Choose Asset Category'}
                options={AssetTypeDetails.map((option) => ({
                  value: option.id,
                  label: option.name
                }))}
              />
            </Grid>
            {/* 4th col */}
            <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
              <Select
                defaultValue="All"
                style={{ width: '100%', height: '33px' }}
                showSearch
                options={All.map((option) => ({
                  value: option.value,
                  label: option.label,
                  disabled: option.disabled
                }))}
              />
            </Grid>
            {/* 5th col */}

            <Grid item lg={6} sm={4}>
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Grid item>
                  <BulkUpload />
                </Grid>
                <Grid item>
                  <Addassets />
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>

      <Table className="table-hd" columns={columns} dataSource={AssetAllocated} showSorterTooltip={false} />
      <Editassets AssetData={editasset} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      {/* {selectedAsset ? <ViewAsset onRowClick={handleRowClick} /> : ""} */}
    </>
  );
};

export default Assetstable;
