import React from 'react';
import { Space, Table, Checkbox } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import { Select } from 'antd';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { getAssetAuditByStatus } from 'components/redux/AssetAudit/action';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '../../../../node_modules/@mui/material/index';
import dayjs from 'dayjs';
import Computeriamge from 'assets/images/users/computer.png';
// import { API_BASE_URL } from '../../../constants/constants';

const AuditDisposedWaiting = () => {
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('Choose Asset Category');
  const AssetAudit = useSelector((state) => state.AssetAuditData && state.AssetAuditData.AssetAuditByStatus);

  const AssetCategoryDetails = useSelector((state) => state.AssetCateData && state.AssetCateData.AssetCategoryData);
  const Approvestatus = 'Waiting';

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSelectAllChange = (e) => {
    const updatedSelectAll = e.target.checked;
    setSelectAll(updatedSelectAll);
    const updatedSelectedRows = updatedSelectAll ? [...AssetAudit] : [];
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
    setSelectAll(updatedSelectedRows.length === AssetAudit.length);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    dispatch(getAssetAuditByStatus(Approvestatus, value));
  };

  const columns = [
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
      dataIndex: 'sno',
      key: 'sno',
      title: <span className="table-hd-fs">SI.No</span>
    },
    {
      dataIndex: 'assetId',
      key: 'assetId',
      title: <span className="table-hd-fs">Asset No</span>,
      render: (_, record) => record.assetId || ''
    },
    {
      title: <span className="table-hd-fs">Asset Class</span>,
      dataIndex: 'assetCategory',
      key: 'assetCategory',
      render: (_, record) => record.assetClass || ''
    },
    {
      title: <span className="table-hd-fs">Plant</span>,

      key: 'action',
      render: (_, record) => {
        return record.plant || '';
      }
    },
    {
      title: <span className="table-hd-fs">Date</span>,

      key: 'action',
      render: (_, record) => {
        const formattedDate = dayjs(record.audit?.auditDate).format('DD MMM YYYY');
        return formattedDate;
      }
    },
    {
      title: <span className="table-hd-fs">Previous Image </span>,
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        if (record.audit?.previewImageWithPath && record.audit?.previewImageWithPath != null) {
          return (
            <Space size="middle">
              <img src={ record.audit?.previewImageWithPath} alt={'Previous'} style={{ width: '30px' }} />
            </Space>
          );
        } else {
          return (
            <Space size="middle">
              <img src={Computeriamge} alt={'Previous'} style={{ width: '30px' }} />
            </Space>
          );
        }
      }
    },
    {
      title: <span className="table-hd-fs">Current Image </span>,
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space size="middle">
          <img src={ record.audit?.currentImageWithPath || ''} alt={'Current img'} style={{ width: '30px' }} />
        </Space>
      )
    },
    {
      title: <span className="table-hd-fs">Status</span>,

      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        return (
          <Button className="btn-status-pending" color="warning">
            {record.audit?.status} for admin
          </Button>
        );
      }
    }
  ];

  const addSerialNumbers = (data) => {
    return data.map((item, index) => {
      return {
        ...item,
        sno: index + 1 // Generating serial number starting from 1
      };
    });
  };
  const dataWithSerialNumbers = addSerialNumbers(AssetAudit);

  const filteredData = dataWithSerialNumbers.filter((row) => {
    return Object.values(row).some((value) => {
      if (value !== null && value !== undefined) {
        return value.toString().toLowerCase().includes(searchValue.toLowerCase());
      }
      return false;
    });
  });
  React.useEffect(() => {
    dispatch(getAllAssetCategoryDetails());
    dispatch(getAssetAuditByStatus(Approvestatus, selectedCategory));
  }, [dispatch, Approvestatus, selectedCategory]);

  return (
    <>
      <Container maxWidth="xl" sx={{ height: '100%', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
        <Toolbar
          disableGutters
          sx={{
            height: '50%',
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
            <Grid container spacing={2} columns={16}>
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
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </Grid>

              {/* 2nd col */}
              <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
                <Select
                  defaultValue="Asset Category"
                  style={{ width: '100%', height: '33px' }}
                  showSearch
                  onChange={handleCategoryChange}
                  options={[
                    { value: 'Choose Asset Category', label: 'Asset Class' },
                    ...AssetCategoryDetails.map((option) => ({
                      value: option.assetClass,
                      label: option.assetClass
                    }))
                  ]}
                />
              </Grid>
              {/* 3nd  col*/}
              <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
              <Select
                  defaultValue="Sub Class"
                  style={{ width: '100%', height: '33px' }}
                  // onChange={handleAssetTypeChange}
                  disabled={selectedCategory == 'Choose Sub Class'}
                  // options={AssetTypeDetails.map((option) => ({
                  //   value: option.id,
                  //   label: option.name
                  // }))}
                />
              </Grid>
              {/* 4th col */}
              {/* 5th col */}

              <Grid item lg={6} sm={4}></Grid>
            </Grid>
          )}

          {selectedRows.length > 0 && (
            <Tooltip title="Delete">
              <Space>
                <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
                  <Button color="success" size="small" className="w-unset btn-approve">
                    <CheckIcon sx={{ fontSize: '16px' }} />
                  </Button>
                </Grid>
                <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
                  <Button color="error" size="small" className="w-unset btn-reject">
                    <ClearIcon sx={{ fontSize: '16px' }} />
                  </Button>
                </Grid>
              </Space>
            </Tooltip>
          )}
        </Toolbar>
      </Container>
      <Table className="table-hd" columns={columns} dataSource={filteredData} showSorterTooltip={false} />
    </>
  );
};

export default AuditDisposedWaiting;
