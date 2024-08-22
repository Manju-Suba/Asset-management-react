/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Modal, Table } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import Divider from '@mui/material/Divider';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { Pagination } from 'antd';
// import { getAllAssetRejected } from 'components/redux/Assetlist/action';
import { getDamageReject } from 'components/redux/dashboard/action';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '../../../node_modules/@mui/material/index';

// eslint-disable-next-line react/prop-types
const RejectedCountModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(isModalOpen);
  const [pageNo, setPageNo] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const DamagedRejected = useSelector((state) => state.DashboardData && state.DashboardData.DamagedAndRejected);
  const DamagedRejectedCount = useSelector((state) => state.DashboardData && state.DashboardData.DamagedAndRejected.assetCounts);

  // const AllSoftware = useSelector((state) => state.AssetListData && state.AssetListData.AllAssetList);
  // const AssetListcount = useSelector(
  //   (state) => state.AssetListData && state.AssetListData.AllAssetList && state.AssetListData.AllAssetList.assetsCount
  // );
  const getAssetClassData = async (pagenumber, Size) => {
    setLoading(true);
    try {
      const paagereduce = pagenumber - 1;
      await dispatch(getDamageReject(paagereduce, Size));
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
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpen(false);
  };
  const assetList = DamagedRejected?.assetrecord || [];
  
  const filteredData = assetList.filter((row) => {
    return Object.values(row).some((value) => {
      if (value !== null && value !== undefined) {
        return value.toString().toLowerCase().includes(searchValue.toLowerCase());
      }
      return false;
    });
  });
  // for datatable search end

  const addSerialNumbers = (data) => {
    return data.map((item, index) => {
      let paagereduce;
      if (pageNo == 0) {
        paagereduce = pageNo;
      } else {
        if (pageNo == undefined) {
          paagereduce = 0;
        } else {
          paagereduce = pageNo - 1;
        }
      }

      const numberstart = paagereduce * pageSize;
      return {
        ...item,
        sno: numberstart + index + 1
      };
    });
  };

  const dataWithSerialNumbers = addSerialNumbers(filteredData);

  const getpagerecord = (pageNumber, pageSize) => {
    setPageNo(pageNumber);
    setPageSize(pageSize);
    getAssetClassData(pageNumber, pageSize);
  };

  const columns = [
    {
      title: <span className="table-hd-fs">SI.No</span>,
      dataIndex: 'sno',
      key: 'sno',
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
      title: <span className="table-hd-fs">Asset Id.</span>,
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
      title: <span className="table-hd-fs">SubClass</span>,

      dataIndex: 'childId',
      key: 'childId',
      sorter: {
        compare: (a, b) => a.childId.localeCompare(b.childId),
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
      title: <span className="table-hd-fs">Rejected Times</span>,
      dataIndex: 'rejectedCount',
      key: 'rejectedCount',
      sorter: {
        compare: (a, b) => a.rejectedCount.localeCompare(b.rejectedCount),
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
  ];

  useEffect(() => {
    setOpen(isModalOpen);
    getAssetClassData(pageNo, pageSize);
  }, [isModalOpen]);

  return (
    <>
      <Modal
        title={'Rejected Assets'}
        open={open}
        onCancel={handleCancel}
        width={800}
        footer={false}
        className="text-arul"
        sx={{ height: '100%', width: '100% ', fontWeight: '700', fontSize: '24px', color: '#161C24' }}
      >
        <Toolbar disableGutters sx={{ height: '0px' }} className="toolbar-reject-modal">
          <Grid item container spacing={2}>
            <Grid item xs={8} lg={8} md={8}></Grid>
            <Grid item xs={4} lg={4} md={4} sm={6}>
              {/* search box */}
              <TextField
                name="asset"
                type={'text'}
                className="reject-modal-count"
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
          </Grid>
        </Toolbar>
        <Divider />
        <Table
          className="table-hd"
          columns={columns}
          dataSource={dataWithSerialNumbers}
          pagination={false}
          loading={loading}
          showSorterTooltip={false}
        />
        <div className="align-center-data">
          <Pagination defaultCurrent={pageNo} total={DamagedRejectedCount} pageSize={pageSize} onChange={getpagerecord} hideOnSinglePage={true} />
        </div>
      </Modal>
    </>
  );
};
export default RejectedCountModal;
