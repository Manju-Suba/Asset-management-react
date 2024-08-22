// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { Grid } from '../../../../node_modules/@mui/material/index';
import { Table } from 'antd';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import { getAllAssetClassMaster } from 'components/redux/master/AssetClass/action';

export default function Mastertable() {
  const [searchValue, setSearchValue] = useState('');
  const [pageNo, setPageNo] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const AssetClassDetails = useSelector((state) => state.AssetClassData && state.AssetClassData.AssetClassMaster);
  const AssetClasscount = useSelector(
    (state) => state.AssetClassData && state.AssetClassData.AssetClassMaster && state.AssetClassData.AssetClassMaster.assetClassCount
  );
  const getAssetClassData = async (pagenumber, Size) => {
    setLoading(true);
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const paagereduce = pagenumber - 1;
      await dispatch(getAllAssetClassMaster(paagereduce, Size, signal));
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(getAllAssetClassMaster(pageNo, pageSize));
  }, [dispatch]);

  // for datatable search start
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

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

  const getpagerecord = (pageNumber, pageSize) => {
    setPageNo(pageNumber);
    setPageSize(pageSize);
    getAssetClassData(pageNumber, pageSize);
  };

  let columns = [
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
    }
  ];
  const assetClasses = AssetClassDetails?.assetClasses || [];
  const filteredData = assetClasses.filter((row) => {
    return Object.values(row).some((value) => {
      if (value !== null && value !== undefined) {
        return value.toString().toLowerCase().includes(searchValue.toLowerCase());
      }
      return false;
    });
  });

  const dataWithSerialNumbers = addSerialNumbers(filteredData);

  return (
    <>
      <Container maxWidth="xl" sx={{ height: 'auto', width: '100%', bgcolor: '#fff', mt: 0.5, border: 'none', mr: 0 }}>
        <Toolbar disableGutters sx={{ height: '50%' }}>
          <Grid item container spacing={2} columns={16}>
            {/* 1st col */}
            <Grid item lg={4} sm={6}>
              {/* search box */}
              <TextField
                name="assetClass"
                type={'text'}
                placeholder="search "
                className="search-input-bg"
                sx={{ border: 'none', color: '#C7C7C7', bgcolor: '#FBFBFB' }}
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
      </Container>
      <Grid xs={12} lg={12}>
        <Table className="table-hd" columns={columns} loading={loading} dataSource={dataWithSerialNumbers} pagination={false} />
        <div className="align-center-data">
          <Pagination
            defaultCurrent={pageNo}
            total={AssetClasscount}
            pageSize={pageSize}
            onChange={getpagerecord}
            hideOnSinglePage={true}
          />
        </div>
      </Grid>
    </>
  );
}
