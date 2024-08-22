import React, { useState, useRef } from 'react';
import { Space, Table, Checkbox, Form } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { Select } from 'antd';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Tooltip from '@mui/material/Tooltip';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { getPendingAssetAudit, assetAuditDateCreate } from 'components/redux/AssetAudit/action';
import { getAllAssetCategoryDetails } from 'components/redux/master/AssetCatogory/action';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '../../../../node_modules/@mui/material/index';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { Pagination } from 'antd';

const AuditPending = () => {
  const renderAfterCalled = useRef(false);
  const search = useRef(false);
  const searchValue = useRef('');
  const selectedClass = useRef('Choose Asset Class');

  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [editAuditDate, setEditAuditDate] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(false);
  const [AuditDate, setAuditDate] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const AssetAudit = useSelector((state) => state.AssetAuditData && state.AssetAuditData.AssetPendingAudit);
  const AssetAuditcount = useSelector(
    (state) =>
      state.AssetAuditData && state.AssetAuditData.AssetPendingAudit && state.AssetAuditData.AssetPendingAudit.pendingAuditAssetCounts
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
    getAssetAuditClassData(1, pageSize, search.current, searchValue.current, selectedClass.current);
  };

  // Assuming you have AllSoftware data and columns defined somewhere

  const handleCategoryChange = (value) => {
    selectedClass.current = value;
    // dispatch(getPendingAssetAudit(value));
    setPageNo(1);
    getAssetAuditClassData(1, pageSize, search.current, searchValue.current, selectedClass.current);
  };

  const handleSelectAllChange = (e) => {
    const updatedSelectAll = e.target.checked;
    setSelectAll(updatedSelectAll);
    const updatedSelectedRows = updatedSelectAll ? [...aList] : [];
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
    setSelectAll(updatedSelectedRows.length === aList.length);
  };

  const editauditdate = (record) => {
    let statusedit = getEditAuditDateById(record.id);
    const updatedEditRecord = { ...record, editAuditstatus: !statusedit };

    setEditAuditDate((prevState) => {
      const index = prevState.findIndex((row) => row.id === record.id);
      if (editAuditDate) {
        return index !== -1
          ? [...prevState.slice(0, index), updatedEditRecord, ...prevState.slice(index + 1)]
          : [...prevState, updatedEditRecord];
      } else {
        return index !== -1 ? prevState.filter((row) => row.id !== record.id) : prevState;
      }
    });
  };
  const updateAuditDateChange = (record, date) => {
    let editDateAudit = formatDate(date);
    updateAuditDate(record.id, editDateAudit);
    editauditdate(record);
  };
  const handleAuditDateChange = (record, date) => {
    const updatedRecord = { ...record, NewauditDate: formatDate(date) };
    setErrorMessage('');
    setAuditDate((prevState) => {
      const index = prevState.findIndex((row) => row.id === record.id);
      if (date) {
        return index !== -1 ? [...prevState.slice(0, index), updatedRecord, ...prevState.slice(index + 1)] : [...prevState, updatedRecord];
      } else {
        return index !== -1 ? prevState.filter((row) => row.id !== record.id) : prevState;
      }
    });
  };

  const getNewAuditDateById = (id) => {
    const record = AuditDate.find((row) => row.id === id);
    return record ? record.NewauditDate : null;
  };
  const getEditAuditDateById = (id) => {
    const record = editAuditDate.find((row) => row.id === id);
    return record ? record.editAuditstatus : false;
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleRemove = (id) => {
    setErrorMessage('');
    setAuditDate((prevState) => prevState.filter((row) => row.id !== id));
  };

  const updatestatus = (assetId) => {
    const newAuditDate = getNewAuditDateById(assetId);

    if (newAuditDate) {
      setErrorMessage('');
      updateAuditDate(assetId, newAuditDate);
    } else {
      setErrorMessage(assetId);
    }
  };

  const updateAuditDate = (assetId, newAuditDate) => {
    try {
      dispatch(assetAuditDateCreate(assetId, newAuditDate))
        .then((response) => {
          toast.success(response.data.message);
          getAssetAuditClassData(pageNo, pageSize, search.current, searchValue.current, selectedClass.current);
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
    // {
    //   title: <span className="table-hd-fs">Child Id</span>,
    //   dataIndex: 'childId',
    //   key: 'childId',
    //   sorter: {
    //     compare: (a, b) => a.childId.localeCompare(b.childId),
    //     multiple: 1
    //   },
    //   sortDirections: ['descend', 'ascend'],
    //   sortIcon: ({ sortOrder }) => {
    //     return sortOrder === 'descend' ? (
    //       <ArrowDownwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
    //     ) : (
    //       <ArrowUpwardSharpIcon sx={{ fontSize: '12px', fontWeight: '600', color: '#919eab' }} />
    //     );
    //   }
    // },
    {
      title: <span className="table-hd-fs">Plant</span>,
      key: 'plant',
      dataIndex: 'plant',
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
      title: <span className="table-hd-fs">Audit Status & Date</span>,

      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        if (record.auditDate) {
          return (
            <Grid item container spacing={0} columns={18} sx={{ color: '#454F5B', fontSize: '14px', fontWeight: '600' }}>
              {getEditAuditDateById(record.id) ? (
                <Grid item xs={16} sm={16} md={16} lg={11}>
                  <Form.Item
                    label={''}
                    name="date"
                    labelAlign="top"
                    className="margin-bottom-0 field-set-border-0"
                    labelCol={{ span: 24 }}
                    sx={{ height: '50px' }}
                    rules={[{ required: true, message: 'This field is required' }]}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Grid components={['DatePicker']}>
                        <DatePicker
                          label="Audit date not yet fixed"
                          value={dayjs(record.auditDate)}
                          format="YYYY-MM-DD"
                          onChange={(e) => updateAuditDateChange(record, e)}
                        />
                      </Grid>
                    </LocalizationProvider>
                  </Form.Item>
                </Grid>
              ) : (
                <Grid item xs={10} sm={8} md={8} lg={10}>
                  <span>
                    Audit Yet to be Done <br></br>
                    <ErrorOutlineIcon sx={{ fontSize: 14, color: '#adb6c0' }} />
                    <small className="text-next-audit"> Next Audit will be {record.auditDateFormat}</small>
                  </span>
                </Grid>
              )}
              <Grid item xs={2} sm={2} md={2} lg={2} className="display-flex-center">
                <ModeEditOutlineIcon className="cursor-pointer" onClick={() => editauditdate(record)} sx={{ fontSize: '16px' }} />
              </Grid>
            </Grid>
          );
        } else {
          return (
            <Grid item container spacing={0} columns={18} sx={{ color: '#454F5B', fontSize: '14px', fontWeight: '600' }}>
              <Grid item xs={18} sm={18} md={18} lg={18}>
                {' '}
                <Form.Item
                  label=""
                  name="date"
                  labelAlign="top"
                  className="margin-bottom-0 field-set-border-0"
                  labelCol={{ span: 24 }}
                  sx={{ height: '50px' }}
                  rules={[{ required: true, message: 'This field is required' }]}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid components={['DatePicker']}>
                      <DatePicker
                        label="Audit date not yet fixed"
                        value={getNewAuditDateById(record.id)}
                        format="YYYY-MM-DD"
                        onChange={(e) => handleAuditDateChange(record, e)}
                      />
                    </Grid>
                  </LocalizationProvider>
                </Form.Item>
                {errorMessage == record.id && <small className="error-message">Audit date is required</small>}
              </Grid>
            </Grid>
          );
        }
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
      title: <span className="table-hd-fs">Action</span>,

      key: 'action',
      render: (_, record) => {
        if (record.auditDate) {
          return <Button className="btn-audit-disabled">Audit</Button>;
        } else {
          return (
            <Space>
              <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
                <Button
                  color="error"
                  size="small"
                  className="w-unset btn-reject"
                  onClick={() => handleRemove(record.id)}
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
                  onClick={() => updatestatus(record.id)}
                  data-id={record.id}
                >
                  <CheckIcon sx={{ fontSize: '16px' }} />
                </Button>
              </Grid>
            </Space>
          );
        }
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
  const aList = AssetAudit?.auditResponses || [];
  // const filteredData = aList.filter((row) => {
  //   return Object.values(row).some((value) => {
  //     if (value !== null && value !== undefined) {
  //       return value.toString().toLowerCase().includes(searchValue.toLowerCase());
  //     }
  //     return false;
  //   });
  // });

  const dataWithSerialNumbers = addSerialNumbers(aList);

  const getpagerecord = (pageNumber, pageSize) => {
    setPageNo(pageNumber);
    setPageSize(pageSize);
    getAssetAuditClassData(pageNumber, pageSize, search.current, searchValue.current, selectedClass.current);
  };

  const getAssetAuditClassData = async (pagenumber, pSize) => {
    setLoading(true);
    try {
      const paagereduce = pagenumber - 1;
      await dispatch(getPendingAssetAudit(paagereduce, pSize, search.current, searchValue.current, selectedClass.current));
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!renderAfterCalled.current) {
      getAssetAuditClassData(pageNo, pageSize, search.current, searchValue.current);
      dispatch(getAllAssetCategoryDetails());
      // dispatch(getRequestAssetAuditPending());
    }
    return () => {
      renderAfterCalled.current = true;
    };
  }, [dispatch, pageNo, pageSize, selectedClass.current]);

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
                  value={searchValue.current}
                  onChange={handleSearchChange}
                />
              </Grid>

              {/* 2nd col */}
              <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
                <Select
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
              {/* 3nd  col*/}
              <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus"></Grid>
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
      <Table
        className="table-hd audit-table"
        columns={columns}
        dataSource={dataWithSerialNumbers}
        pagination={false}
        loading={loading}
        showSorterTooltip={false}
      />
      <div className="align-center-data">
     
        <Pagination defaultCurrent={pageNo} current ={pageNo} total={AssetAuditcount} pageSize={pageSize} onChange={getpagerecord} hideOnSinglePage={true} />
      </div>
    </>
  );
};

export default AuditPending;
