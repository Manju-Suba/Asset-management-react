import React, { useState, useRef } from 'react';
import { Space, Table } from 'antd';
import Toolbar from '@mui/material/Toolbar';
// import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import { Pagination } from 'antd';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ViewAsset from './ViewTransferDetails';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
// image
import Computeriamge from 'assets/images/users/computer.png';
import { getAllAssetClass } from 'components/redux/master/AssetClass/action';
import { getAssetTransferByStatus } from 'components/redux/assetTransfer/action';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button } from '../../../../node_modules/@mui/material/index';
//Select Dropdown
import CustomSelect from '../CustomSelect';
// import { API_BASE_URL } from '../../../constants/constants';

const TransferRejectedTable = ({ onRowClick }) => {
  const dispatch = useDispatch();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedClass, setSelectedClass] = useState('Choose Asset Class');
  const [selectedAssetType, setSelectedAssetType] = useState('Asset Status');
  const search = useRef(false);
  const searchValue = useRef('');
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState();
  const [loading, setLoading] = useState(false);

  const AssetTransfer = useSelector((state) => state.AssetTransferData && state.AssetTransferData.AssetTransferReject);
  const transferTotalCount = useSelector(
    (state) =>
      state.AssetTransferData &&
      state.AssetTransferData.AssetTransferReject &&
      state.AssetTransferData.AssetTransferReject.transferDetailsCount
  );
  const AssetClassDetails = useSelector((state) => state.AssetClassData && state.AssetClassData.AssetClassData);

  const status = 'Rejected';
  const All = [
    { value: 'Online', label: 'Online' },
    { value: 'Offline', label: 'Offline' },
    { value: 'Scrapped', label: 'Scrapped' },
    { value: 'Maintenance', label: 'Maintenance' }
  ];

  // for datatable search start
  const handleSearchChange = (event) => {
    searchValue.current = event.target.value;
    if (event.target.value != '') {
      search.current = true;
    } else {
      search.current = false;
    }
    getTransferPendingData(pageNo, pageSize, status, selectedClass, selectedAssetType, '');
  };

  const getTransferApprovedData = async (pagenumber, Size, AssetStatus, AssetClass, assetType, subclass) => {
    setLoading(true);
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const paagereduce = pagenumber - 1;
      await dispatch(
        getAssetTransferByStatus(
          AssetStatus,
          AssetClass,
          assetType,
          subclass,
          paagereduce,
          Size,
          search.current,
          searchValue.current,
          signal
        )
      );
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedAssetType('Asset Status');
    setSelectedClass(value);
    getTransferApprovedData(pageNo, pageSize, status, value, 'Asset Status', '');
  };

  const handleAssetTypeChange = (value) => {
    setSelectedAssetType(value);
    getTransferApprovedData(pageNo, pageSize, status, selectedClass, value, '');
  };

  const handleRowClick = (record) => {
    setSelectedAsset(record);
    onRowClick();
  };

  const addSerialNumbers = (data) => {
    return data.map((item, index) => {
      return {
        ...item,
        sno: index + 1 // Generating serial number starting from 1
      };
    });
  };
  const assetList = AssetTransfer?.transferDetails || [];
  const dataWithSerialNumbers = addSerialNumbers(assetList);

  const columns = [
    {
      dataIndex: 'sno',
      key: 'sno',
      title: <span className="table-hd-fs">SI.No </span>,
      render: (_, __, index) => index + 1,
      sorter: {
        compare: (a, b) => a.sno - b.sno,
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
      dataIndex: 'assetId',
      key: 'assetId',
      title: <span className="table-hd-fs">Asset Id </span>,
      sorter: {
        compare: (a, b) => a.assetId.localeCompare(b.assetId),
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
      title: <span className="table-hd-fs">Asset Class</span>,
      dataIndex: 'assetClass',
      key: 'assetClass',
      sorter: {
        compare: (a, b) => a.assetClass.localeCompare(b.assetClass),
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
      title: <span className="table-hd-fs">Plant</span>,
      dataIndex: 'fromPlant',
      key: 'fromPlant',
      sorter: {
        compare: (a, b) => a.fromPlant.localeCompare(b.fromPlant),
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
      title: <span className="table-hd-fs">To Plant</span>,

      dataIndex: 'toPlant',
      key: 'toPlant',
      sorter: {
        compare: (a, b) => a.toPlant.localeCompare(b.toPlant),
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
      title: <span className="table-hd-fs">Status</span>,

      dataIndex: 'status',
      key: 'status',
      render: () => {
        return (
          <Button className="btn-status-rejected" color="error">
            Rejected
          </Button>
        );
      },
      sorter: {
        compare: (a, b) => a.status.localeCompare(b.status),
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
      title: <span className="table-hd-fs">Picture </span>,

      dataIndex: 'picture',
      key: 'picture',
      render: (_, record) => {
        if (record.pictureWithPath) {
          return (
            <Space size="middle">
              <img src={ record.pictureWithPath} alt={'Previous'} style={{ width: '30px' }} />
            </Space>
          );
        } else {
          return (
            <Space size="middle">
              <img src={Computeriamge} alt={Computeriamge} style={{ width: '30px' }} />
            </Space>
          );
        }
      }
    }
  ];

  React.useEffect(() => {
    dispatch(getAllAssetClass());
    getTransferApprovedData(pageNo, pageSize, status, selectedClass, selectedAssetType, '');
  }, [dispatch, pageNo, pageSize]);

  const getpagerecord = (pageNumber, pageSize) => {
    setPageNo(pageNumber);
    setPageSize(pageSize);
    getTransferApprovedData(pageNumber, pageSize);
  };

  return (
    <>
      {selectedAsset ? (
        <ViewAsset onRowClick={handleRowClick} selectedData={selectedAsset} />
      ) : (
        <>
          <Container maxWidth="xl" sx={{ height: '100%', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
            <Toolbar
              disableGutters
              sx={{
                height: '50%',
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 }
              }}
            >
              <Grid container spacing={2} columns={16}>
                {/* 1st col */}
                <Grid item lg={3} sm={5}>
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
                    value={searchValue.current}
                    onChange={handleSearchChange}
                  />
                </Grid>

                {/* 2nd col */}
                <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
                  <CustomSelect
                    defaultValue="Asset Class"
                    style={{ width: '100%', height: '33px' }}
                    showSearch
                    onChange={handleCategoryChange}
                    options={[
                      { value: '', label: 'Asset Class' },
                      ...AssetClassDetails.map((option) => ({
                        value: option.assetClass,
                        label: option.assetClass
                      }))
                    ]}
                  />
                </Grid>
                {/* 3nd  col*/}
                <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
                  <CustomSelect
                    value={selectedAssetType}
                    style={{ width: '100%', height: '33px' }}
                    showSearch
                    onChange={handleAssetTypeChange}
                    options={[
                      { value: '', label: 'Asset Status' },
                      ...All.map((option) => ({
                        value: option.value,
                        label: option.label
                      }))
                    ]}
                  />
                </Grid>
                <Grid item lg={6} sm={4}></Grid>
              </Grid>
            </Toolbar>
          </Container>

          <Table
            className="table-hd"
            columns={columns}
            dataSource={dataWithSerialNumbers}
            showSorterTooltip={false}
            onRow={(record) => {
              return {
                onClick: () => handleRowClick(record)
              };
            }}
            pagination={false}
            loading={loading}
          />
          <div className="align-center-data">
            <Pagination
              defaultCurrent={pageNo}
              total={transferTotalCount}
              pageSize={pageSize}
              onChange={getpagerecord}
              hideOnSinglePage={true}
            />
          </div>
        </>
      )}
    </>
  );
};

export default TransferRejectedTable;
