import React, { useState,useRef } from 'react';
import { Space, Table, Checkbox } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
// import { Select } from 'antd';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { getCloseToDisposeAsset } from 'components/redux/DisposalAsset/action';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '../../../../node_modules/@mui/material/index';
import ReplaceModal from './ReplaceModal';
import Computeriamge from 'assets/images/users/computer.png';
import Replace from 'assets/images/icons/replace.png';
import Renew from 'assets/images/icons/renew.png';
import RenewModal from './RenewModal';
// import { API_BASE_URL } from '../../../constants/constants';
import { Pagination } from 'antd';
//Select Dropdown
import CustomSelect from '../CustomSelect';

const CloseToDispose = () => {
  const dispatch = useDispatch();
  const search = useRef(false);
	const searchValue = useRef('');
	const selectedClass = useRef('Choose Asset Class');
  const [selectAll, setSelectAll] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [AuditRecord, setAuditRecord] = React.useState([]);
  const [StatusType, setStatusType] = React.useState();
  const [AuditStatus, setAuditStatus] = React.useState();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalRenewOpen, setIsModalRenewOpen] = React.useState(false);
  const [pageNo, setPageNo] = useState();
  const [pageSize, setPageSize] = useState(10);
  const CloseToDisposeAsset = useSelector((state) => state.DisposalAssetData && state.DisposalAssetData.CloseToDisposeAsset);
  const AssetDisposedcount = useSelector(
    (state) =>
      state.DisposalAssetData &&
      state.DisposalAssetData.CloseToDisposeAsset &&
      state.DisposalAssetData.CloseToDisposeAsset.closedToDisposedCounts
  );

  const AssetCategoryDetails = useSelector((state) => state.AssetCateData && state.AssetCateData.AssetCategoryData);

  const handleSearchChange = (event) => {
    searchValue.current = event.target.value;
		if (event.target.value != '') {
			search.current = true;
		} else {
			search.current = false;
		}
    setPageNo(1);
    getAssetDisposedData(1, pageSize);
  };

  const handleCategoryChange = (value) => {
    selectedClass.current=value;
    setPageNo(1);
    getAssetDisposedData(1, pageSize);
  };

  const handleSelectAllChange = (e) => {
    const updatedSelectAll = e.target.checked;
    setSelectAll(updatedSelectAll);
    const updatedSelectedRows = updatedSelectAll ? [...CloseToDisposeAsset] : [];
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
    setSelectAll(updatedSelectedRows.length === CloseToDisposeAsset.length);
  };

  const handleStatusModal = (Record, status) => {
    setAuditRecord(Record);
    setAuditStatus(status);
    setStatusType(status);
    setIsModalOpen(true);
  };

  const handleRenewStatusModal = (Record, status) => {
    setAuditRecord(Record);
    setAuditStatus(status);

    setStatusType(status);
    setIsModalRenewOpen(true);
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
      title: <span className="table-hd-fs">SI.No</span>,
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
      title: <span className="table-hd-fs">Asset No</span>,
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
      render: (_, record) => record.assetClass || '',
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
      title: <span className="table-hd-fs">Status</span>,

      dataIndex: 'status',
      key: 'status',
      render: () => {
        return (
          <Button className="btn-status-dispose" color="warning">
            Close To Dispose
          </Button>
        );
      }
    },
    {
      title: <span className="table-hd-fs">Plant</span>,
      dataIndex: 'plant',
      key: 'plant',
      sorter: {
        compare: (a, b) => a.plant.localeCompare(b.plant),
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
    },
    {
      title: <span className="table-hd-fs">Action</span>,

      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
              <div
                role="button"
                tabIndex="0"
                onClick={() => handleStatusModal(record, 'Replaced')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleStatusModal(record, 'Replaced');
                  }
                }}
              >
                <img src={Replace} alt="replace" />
              </div>
            </Grid>
            <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
              <div
                role="button"
                tabIndex="0"
                onClick={() => handleRenewStatusModal(record, 'Renewed')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRenewStatusModal(record, 'Renewed');
                  }
                }}
              >
                <img src={Renew} alt="renew" />
              </div>
            </Grid>
          </Space>
        );
      }
    }
  ];

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

  const getAssetDisposedData = (pagenumber, Size) => {
    const paagereduce = pagenumber - 1;
    dispatch(getCloseToDisposeAsset(paagereduce, Size,selectedClass.current,search.current, searchValue.current));
  };

  function containsSearchValue(value, searchValue) {
    if (typeof value === 'object' && value !== null) {
      for (const prop in value) {
        if (containsSearchValue(value[prop], searchValue)) {
          return true;
        }
      }
      return false;
    } else if (typeof value === 'string') {
      return value.toLowerCase().includes(searchValue.current.toLowerCase());
    } else {
      return false;
    }
  }

  const assetDisposed = CloseToDisposeAsset?.assets || [];
  const filteredData = assetDisposed.filter((row) => {
    return Object.values(row).some((value) => {
      return containsSearchValue(value, searchValue);
    });
  });

  const dataWithSerialNumbers = addSerialNumbers(filteredData);

  React.useEffect(() => {
    dispatch(getAllAssetCategoryDetails());
    getAssetDisposedData(pageNo, pageSize);
  }, [dispatch]);

  const getpagerecord = (pageNumber, pageSize) => {
    setPageNo(pageNumber);
    setPageSize(pageSize);
    getAssetDisposedData(pageNumber, pageSize);
    // You can perform any action you want with the clicked page number
  };

  return (
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
                  { value: 'Choose Asset Class', label: 'Asset Class' },
                  ...AssetCategoryDetails.map((option) => ({
                    value: option.assetClass,
                    label: option.assetClass
                  }))
                ]}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
      <Table className="table-hd" columns={columns} dataSource={dataWithSerialNumbers} pagination={false} showSorterTooltip={false} />
      <div className="align-center-data">
        <Pagination
          defaultCurrent={pageNo}
          current ={pageNo}
          total={AssetDisposedcount}
          pageSize={pageSize}
          onChange={getpagerecord}
          hideOnSinglePage={true}
        />
      </div>
      <ReplaceModal
        AssetData={AuditRecord}
        StatusType={StatusType}
        Status={AuditStatus}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <RenewModal
        AssetData={AuditRecord}
        StatusType={StatusType}
        Status={AuditStatus}
        isModalRenewOpen={isModalRenewOpen}
        setIsModalRenewOpen={setIsModalRenewOpen}
      /> 
    </>
  );
};

export default CloseToDispose;
