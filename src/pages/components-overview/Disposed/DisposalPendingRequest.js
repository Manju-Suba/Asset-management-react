import React, { useState } from 'react';
import { Space, Table, Checkbox } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
// import { Select } from 'antd';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Pagination } from 'antd';
import { Button, Grid } from '../../../../node_modules/@mui/material/index';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { useDispatch, useSelector } from 'react-redux';
// import { API_BASE_URL } from '../../../constants/constants';
import { getDisposalPendingRequest, disposalAssetApprove } from 'components/redux/DisposalAsset/action';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { toast } from 'react-toastify';
//Select Dropdown
import CustomSelect from '../CustomSelect';

//import style css
import '../../../menu-items/style.css';

const DisposalPendingRequest = () => {
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = React.useState();
  const [pageSize, setPageSize] = React.useState(10);
  const search = React.useRef(false);
  const searchValue = React.useRef('');
  const StatusOption = 'Waiting';

  const DisposalAsset = useSelector((state) => state.DisposalAssetData && state.DisposalAssetData.DisposalPendingRequest);
  const AssetListcount = useSelector(
    (state) =>
      state.DisposalAssetData &&
      state.DisposalAssetData.DisposalPendingRequest &&
      state.DisposalAssetData.DisposalPendingRequest.pendingRequestCounts
  );

  const [selectedCategory, setSelectedCategory] = useState('Choose Asset Class');
  const AssetCategoryDetails = useSelector((state) => state.AssetCateData && state.AssetCateData.AssetCategoryData);

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
  
  const assetList = DisposalAsset?.waitingAssets || [];
  const dataWithSerialNumbers = addSerialNumbers(assetList);

  const getpagerecord = (pageNumber, pageSize) => {
    setPageNo(pageNumber);
    setPageSize(pageSize);
    getAssetAllocationData(pageNumber, pageSize);
  };

  const handleSearchChange = (event) => {
    searchValue.current = event.target.value;
    if (event.target.value != '') {
      search.current = true;
    } else {
      search.current = false;
    }
    getAssetAllocationData(pageNo, pageSize);
  };

  const getAssetAllocationData = async (pagenumber, Size) => {
    setLoading(true);
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const paagereduce = pagenumber - 1;
      await dispatch(
        getDisposalPendingRequest(
          StatusOption,
          selectedCategory,
          null,
          null,
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

  const handleSelectAllChange = (e) => {
    const updatedSelectAll = e.target.checked;
    setSelectAll(updatedSelectAll);
    const updatedSelectedRows = updatedSelectAll ? [...DisposalAsset] : [];
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
    setSelectAll(updatedSelectedRows.length === DisposalAsset.length);
  };

  const handleCategoryChange = async (value) => {
    setSelectedCategory(value);
    dispatch(getAllAssetSubClass(value));
    setLoading(true);
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      await dispatch(
        getDisposalPendingRequest(StatusOption, value, null, null, pageNo, pageSize, search.current, searchValue.current, signal)
      );
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusModal = (Record, status) => {
    try {
      const id = Record;
      dispatch(disposalAssetApprove(id, status))
        .then((response) => {
          toast.success(response.data.message);
          getAssetAllocationData(pageNo, pageSize);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
      toast.error('Validation error', error);
    }
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
      dataIndex: 'assetClass',
      key: 'assetClass',
      title: <span className="table-hd-fs">Asset Class</span>,
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
      dataIndex: 'status',
      key: 'status',
      title: <span className="table-hd-fs">Status</span>,
      render() {
        return <Button className="btn-status-pending-primary">{'Request from User'}</Button>;
      }
    },
    {
      dataIndex: 'plant',
      key: 'plant',
      title: <span className="table-hd-fs">Plant</span>,
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
      render: (_, record) => (
        <Space size="middle">
          <img src={record.pictureWithPath} alt={'Current pic'} style={{ width: '30px' }} />
        </Space>
      )
    },
    {
      title: <span className="table-hd-fs">Action</span>,
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
              <Button
                color="error"
                size="small"
                className="w-unset btn-reject"
                onClick={() => handleStatusModal(record.id, 'Rejected')}
                data-id={record.id}
              >
                <ClearIcon sx={{ fontSize: '16px' }} />
              </Button>
            </Grid>
            <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
              <Button
                color="success"
                size="small"
                className="w-unset btn-approve"
                onClick={() => handleStatusModal(record.id, 'Approved')}
                data-id={record.id}
              >
                <CheckIcon sx={{ fontSize: '16px' }} />
              </Button>
            </Grid>
          </Space>
        );
      }
    }
  ];

  React.useEffect(() => {
    dispatch(getAllAssetCategoryDetails());
    getAssetAllocationData(pageNo, pageSize);
  }, [dispatch, selectedCategory]);

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
      <Table
        className="table-hd"
        columns={columns}
        dataSource={dataWithSerialNumbers}
        pagination={false}
        loading={loading}
        showSorterTooltip={false}
      />
      <div className="align-center-data">
        <Pagination defaultCurrent={pageNo} total={AssetListcount} pageSize={pageSize} onChange={getpagerecord} hideOnSinglePage={true} />
      </div>
    </>
  );
};
export default DisposalPendingRequest;
