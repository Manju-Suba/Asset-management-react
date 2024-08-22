import React, { useState } from 'react';
import { Space, Table } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
// import { Select } from 'antd';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Grid } from '../../../../node_modules/@mui/material/index';
import { Pagination } from 'antd';
// import EditSharpIcon from '@mui/icons-material/EditSharp';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DriveFileMoveSharpIcon from '@mui/icons-material/DriveFileMoveSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { Button } from '../../../../node_modules/@mui/material/index';
// import { API_BASE_URL } from '../../../constants/constants';
//Select Dropdown
import CustomSelect from '../CustomSelect';
// image
import Computeriamge from 'assets/images/users/computer.png';
import { getAssetTransferByStatus_Users } from 'components/redux/assetTransfer/action';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UserTransferApprovedTable = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = React.useState('Choose Asset Class');
  const [selectedAssetType, setSelectedAssetType] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [pageNo, setPageNo] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const Transferstatus = 'Approved';
  const AssetList = useSelector((state) => state.AssetTransferData && state.AssetTransferData.AssetTransferApprove);
  const AssetListcount = useSelector(
    (state) =>
      state.AssetTransferData &&
      state.AssetTransferData.AssetTransferApprove &&
      state.AssetTransferData.AssetTransferApprove.transferDetailsCount
  );
  const AssetClassDetails = useSelector((state) => state.AssetClassData && state.AssetClassData.AssetClassData);

  const handleCategoryChange = async (value) => {
    setSelectedAssetType(selectedAssetType);
    setSelectedCategory(value);
    setLoading(true);
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      await dispatch(getAssetTransferByStatus_Users(Transferstatus, value, null, selectedAssetType, pageNo, pageSize, signal));
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const getAssetAllocationData = async (pagenumber, Size) => {
    setLoading(true);
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const paagereduce = pagenumber - 1;
      await dispatch(getAssetTransferByStatus_Users(Transferstatus, selectedCategory, null, selectedAssetType, paagereduce, Size, signal));
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGeoLocation = () => {
    if (!('geolocation' in navigator)) {
      console.log('Geolocation is not available in your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPositionGeoRef({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          toast.error('Please give access for location.');
        } else {
          console.error('Error getting geolocation:', error.message);
        }
      }
    );
  };

  const columns = [
    {
      title: <span className="table-hd-fs">Picture </span>,

      dataIndex: 'picture',
      key: 'picture',
      render: (_, record) => {
        if (record.pictureWithPath) {
          return (
            <Space size="middle">
              <img src={ record.pictureWithPath} alt={'Previous'} style={{ width: '30px', height: '27px' }} />
            </Space>
          );
        } else {
          return (
            <Space size="middle">
              <img src={Computeriamge} alt={Computeriamge} style={{ width: '30px', height: '27px' }} />
            </Space>
          );
        }
      }
    },
    {
      dataIndex: 'assetId',
      key: 'assetId',
      title: <span className="table-hd-fs">Asset Id</span>,
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

      key: 'fromPlant',
      dataIndex: 'fromPlant',
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

      key: 'toPlant',
      dataIndex: 'toPlant',
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
      title: <span className="table-hd-fs">Asset Status</span>,

      dataIndex: 'assetStatus',
      key: 'assetStatus',
      render: () => {
        return (
          <Button className="btn-status-approved" color="success">
            Approved
          </Button>
        );
      },
      sorter: {
        compare: (a, b) => a.assetStatus.localeCompare(b.assetStatus),
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
    }
    // ,
    // {
    //   title: <span className="table-hd-fs">Action</span>,

    //   key: 'action',
    //   render: () => (
    //     <Space>
    //       {/* <Grid item sx={{ color: '#A5A1A1', fontSize: '1px' }}>
    //                     <CheckCircleRoundedIcon sx={{ fontSize: '16px' }} />
    //                 </Grid> */}
    //       <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
    //         <RemoveRedEyeIcon sx={{ fontSize: '16px' }} />
    //       </Grid>

    //       {/* <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
    //                     <DeleteIcon sx={{ fontSize: '16px' }} />
    //                 </Grid>
    //                 <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
    //                     <DriveFileMoveSharpIcon sx={{ fontSize: '16px' }} />
    //                 </Grid> */}
    //     </Space>
    //   )
    // }
  ];

  const handleRowClick = (record) => {
    setSelectedAsset(record);
    onRowClick();
  };

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getAllAssetCategoryDetails(signal));
    fetchGeoLocation();
    getAssetAllocationData(pageNo, pageSize);
  }, [dispatch]);

  const assetList = AssetList?.transferDetails || [];
  const filteredData =
    Array.isArray(assetList) && assetList.length > 0
      ? assetList.filter((row) => {
          return Object.values(row).some((value) => {
            if (value !== null && value !== undefined) {
              return value.toString().toLowerCase().includes(searchValue.toLowerCase());
            }
            return false;
          });
        })
      : [];
  const getpagerecord = (pageNumber, pageSize) => {
    setPageNo(pageNumber);
    setPageSize(pageSize);
    getAssetAllocationData(pageNumber, pageSize);
  };

  return (
    <>
      <>
        <Container maxWidth="xl" sx={{ height: '100%', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
          <Toolbar disableGutters sx={{ height: '50%' }}>
            <Grid item container spacing={2} columns={16}>
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
                  value={searchValue}
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
                    { value: '', label: 'Select' },
                    ...AssetClassDetails.map((option) => ({ value: option.assetClass, label: option.assetClass }))
                  ]}
                />
              </Grid>
              <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus"></Grid>
              <Grid item lg={6} sm={4}></Grid>
            </Grid>
          </Toolbar>
        </Container>
        <Table
          className="table-hd"
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          loading={loading}
          showSorterTooltip={false}
          onRow={(record) => {
            return {
              onClick: () => handleRowClick(record)
            };
          }}
        />
        <div className="align-center-data">
          <Pagination defaultCurrent={pageNo} total={AssetListcount} pageSize={pageSize} onChange={getpagerecord} hideOnSinglePage={true} />
        </div>
      </>
    </>
  );
};

export default UserTransferApprovedTable;
