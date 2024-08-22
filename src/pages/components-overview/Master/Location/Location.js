import * as React from 'react';
import Box from '@mui/material/Box';
import { Table } from 'antd';
import TableContainer from '@mui/material/TableContainer';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Grid, TextField } from '../../../../../node_modules/@mui/material/index';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';

import { getAllLocationDetails } from 'components/redux/master/Location/action';

export default function Location() {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = React.useState();
  const [pageSize, setPageSize] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const LocationDetails = useSelector((state) => state.LocationData && state.LocationData.LocationList);
  const Locationcount = useSelector(
    (state) => state.LocationData && state.LocationData.LocationList && state.LocationData.LocationList.plantCounts
  );
  const getAssetClassData = async (pagenumber, Size) => {
    setLoading(true);
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const paagereduce = pagenumber - 1;
      await dispatch(getAllLocationDetails(paagereduce, Size, signal));
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

  const plantlist = LocationDetails?.plant || [];
  const filteredData = plantlist.filter((row) => {
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

  React.useEffect(() => {
    getAssetClassData(pageNo, pageSize);
  }, [dispatch, pageNo, pageSize]);

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
      title: 'Plant',
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
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} className="box-shadow-none">
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 }
          }}
        >
          <Grid container spacing={2}>
            <Grid item lg={3} md={4} sm={5} xs={6}>
              <TextField
                required
                fullWidth
                name="asset"
                type="text"
                placeholder="Search"
                className="search-input-bg"
                style={{ border: 'none', bgcolor: '#FBFBFB' }}
                InputProps={{
                  style: {
                    width: '90%',
                    height: '100%',
                    color: '#708090',
                    marginLeft: '20px',
                    marginTop: '5px'
                  },
                  startAdornment: (
                    <IconButton aria-label="Toggle password visibility" edge="start">
                      <SearchSharpIcon sx={{ color: '#708090', fontSize: '19px', fontWeight: '700' }} />
                    </IconButton>
                  )
                }}
                value={searchValue}
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid item lg={6} md={4} sm={2} xs={0} display={{ lg: 'inline', md: 'inline', sm: 'inline', xs: 'none' }}></Grid>
            <Grid item lg={3} md={4} sm={5} xs={6}></Grid>
            <Grid item lg={6} md={4} sm={2} xs={2} />
          </Grid>
        </Toolbar>
        <TableContainer>
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
              total={Locationcount}
              pageSize={pageSize}
              onChange={getpagerecord}
              hideOnSinglePage={true}
            />
          </div>
        </TableContainer>
      </Paper>
    </Box>
  );
}
