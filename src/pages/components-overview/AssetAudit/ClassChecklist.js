import React, { useState,useRef } from 'react';
import { Space, Table, Popconfirm } from 'antd';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import { useLocation } from 'react-router-dom';
import { Pagination } from 'antd';
// image
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllAssetClass } from 'components/redux/master/AssetClass/action';
import { fetchCheckList, DeleteCheckList } from 'components/redux/master/CheckList/action';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '../../../../node_modules/@mui/material/index';
import { toast } from 'react-toastify';
//Select Dropdown
import CustomSelect from '../CustomSelect';

//import style css
import '../../../menu-items/style.css';
import ViewClassChecklist from './ViewClassChecklist';

const ClassChecklist = ({ onRowClick }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [pageNo, setPageNo] = useState();
  const [pageSize, setPageSize] = useState(10);
  const queryParams = new URLSearchParams(location.search);
  const assetClass = queryParams.get('class');
  const searchValue = useRef('');
  const search = useRef(false);
  const selectedClass = useRef('Choose Asset Class');
  const [ShowOption, setShowOption] = useState('Asset Status');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAll] = useState(false);
  const maxItemsToShow = 5;

  const AssetClassDetails = useSelector((state) => state.AssetClassData && state.AssetClassData.AssetClassData);
  const AllCheckList = useSelector((state) => state.CheckListData && state.CheckListData.CheckList);
  const CheckListcount = useSelector(
    (state) => state.CheckListData && state.CheckListData.CheckList && state.CheckListData.CheckList.checkListCount
  );

  const confirm = (id) =>
    new Promise((resolve) => {
      try {
        // const controller = new AbortController();
        // const signal = controller.signal;
        dispatch(DeleteCheckList(id))
          .then((response) => {
            dispatch(fetchCheckList(0,10,false,''));
            setTimeout(() => resolve(null), 1000);
            toast.success(response.data.message);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      } catch (error) {
        console.error('Error fetching data:', error);
        setTimeout(() => resolve(null), 3000);
      } finally {
        setTimeout(() => resolve(null), 3000);
      }
    });

  const handleClassChange = async (value) => {
    selectedClass.current=value;
    setPageNo(1);
    getCheckList(1, pageSize);
  };

  // for datatable search start
  const handleSearchChange = (event) => {
    searchValue.current = event.target.value;
		if (event.target.value != '') {
			search.current = true;
		} else {
			search.current = false;
		}
    setPageNo(1);
    getCheckList(1, pageSize);
  };

  const getCheckList = async (pagenumber, Size) => {
    setLoading(true);
    try {
      const paagereduce = pagenumber - 1;
      await dispatch(fetchCheckList(paagereduce, Size,search.current, searchValue.current,selectedClass.current));
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const assetList = AllCheckList ?.checkListResponse || [];

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

  const dataWithSerialNumbers = addSerialNumbers(assetList);

  const getpagerecord = (pageNumber, pageSize) => {
    setPageNo(pageNumber);
    setPageSize(pageSize);
    getCheckList(pageNumber, pageSize);
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
      title: <span className="table-hd-fs">Class Checklist</span>,
      dataIndex: 'checkList',
      key: 'checkList',
      render: (_, record) => {
        return (
          <div>
            <>
              {record.checkList.slice(0, showAll ? record.checkList.length : maxItemsToShow).map((item) => (
                <Button key={item} className={'table-value-badge mr-3'} onClick={() => handleRowClick(record, 'View')}>
                  {item}
                </Button>
              ))}
              {!showAll && record.checkList.length > maxItemsToShow && (
                <Button className={'table-value-badge'} onClick={() => handleRowClick(record, 'View')}>
                  + {record.checkList.length - maxItemsToShow} More
                </Button>
              )}
            </>
          </div>
        );
      },
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
      title: <span className="table-hd-fs">Action</span>,

      key: 'action',
      render: (_, record) => (
        <Space>
          <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
            <EditIcon sx={{ fontSize: '16px', cursor: 'pointer' }} onClick={() => handleRowClick(record, 'Edit')} />
          </Grid>

          <Grid item sx={{ color: '#A5A1A1', fontSize: '10px' }}>
            <Popconfirm
              title="Delete the checklist"
              description="Are you sure to delete this checklist?"
              onConfirm={() => confirm(record.id)}
              onOpenChange={() => console.log('open change')}
            >
              <DeleteIcon sx={{ fontSize: '16px', cursor: 'pointer' }} />
            </Popconfirm>
          </Grid>
        </Space>
      )
    }
  ];

  const handleRowClick = (record, show) => {
    setSelectedAsset(record);
    setShowOption(show);
    onRowClick();
  };

  React.useEffect(() => {
    dispatch(getAllAssetClass());
    getCheckList(pageNo, pageSize);
  }, [dispatch]);

  return (
    <>
      {selectedAsset ? (
        <ViewClassChecklist onRowClick={handleRowClick} ShowOption={ShowOption} selectedData={selectedAsset} />
      ) : (
        <>
          <Container maxWidth="xl" sx={{ height: 'auto', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
            <Toolbar disableGutters sx={{ height: '50%' }}>
              <Grid item container spacing={2} columns={16}>
                <Grid item lg={3} sm={5}>
                  {/* search box */}
                  <TextField
                    name="asset"
                    type={'text'}
                    placeholder="search "
                    className="search-input-bg"
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
                    defaultValue={assetClass || 'Asset Class'} // Set an empty default value
                    style={{ width: '100%', height: '33px' }}
                    // mode="multiple"
                    // allowClear
                    showSearch
                    onChange={handleClassChange}
                    options={[
                      { value: 'Choose Asset Class', label: 'Asset Class' }, // Empty option
                      ...AssetClassDetails.map((option) => ({ value: option.assetClass, label: option.assetClass }))
                    ]}
                  />
                </Grid>
                <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
                  {/* <CustomSelect
                    defaultValue={selectedSubClass || 'Choose SubClass'}
                    style={{ width: '100%', height: '33px' }}
                    showSearch
                    onChange={handleSubClassChange}
                    options={[
                      { value: '', label: 'Choose SubClass' },
                      ...AssetSubClassDetails.map((option) => ({
                        value: option.subClass,
                        label: option.subClass
                      }))
                    ]}
                  /> */}
                </Grid>
                {/* 3nd  col*/}
                <Grid item lg={2} sm={4} sx={{ ml: 1 }} className="select-ant-cus">
                  {/* <CustomSelect
                    defaultValue="Asset Status"
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
                  /> */}
                </Grid>
                <Grid item lg={6} sm={6} sx={{ ml: 1 }} className="select-ant-cus mui-text-center">
                  <Button variant="contained" onClick={() => handleRowClick('Add', 'Add')}>
                    <AddIcon /> Create New Checklist{' '}
                  </Button>
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
            <Pagination
              defaultCurrent={pageNo}
              current ={pageNo}
              total={CheckListcount}
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

export default ClassChecklist;
