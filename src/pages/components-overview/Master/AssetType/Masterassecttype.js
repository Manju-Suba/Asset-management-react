import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Pagination } from 'antd';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import { visuallyHidden } from '@mui/utils';
import { Grid, TextField } from '../../../../../node_modules/@mui/material/index';
// icons
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAssetTypeDetails } from 'components/redux/master/AssetType/action';
import { Table, Checkbox } from 'antd';

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            style={{ color: '#919EAB', fontSize: '16px' }}
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default function Masterassecttype() {
  const [searchValue, setSearchValue] = React.useState('');
  const [pageNo, setPageNo] = React.useState();
  const [pageSize, setPageSize] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const AssetTypeDetails = useSelector((state) => state.AssetTypeData && state.AssetTypeData.AssetType);
  const AssetClasscount = useSelector(
    (state) => state.AssetTypeData && state.AssetTypeData.AssetType && state.AssetTypeData.AssetType.subClassCounts
  );
  const getAssetClassData = async (pagenumber, Size) => {
    setLoading(true);
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const paagereduce = pagenumber - 1;
      await dispatch(getAllAssetTypeDetails(paagereduce, Size, signal));
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const assetClasses = AssetTypeDetails?.subClass || [];
  const filteredData = assetClasses.filter((row) => {
    return Object.values(row).some((value) => {
      if (value !== null && value !== undefined) {
        return value.toString().toLowerCase().includes(searchValue.toLowerCase());
      }
      return false;
    });
  });

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

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const getpagerecord = (pageNumber, pageSize) => {
    setPageNo(pageNumber);
    setPageSize(pageSize);
    getAssetClassData(pageNumber, pageSize);
  };

  React.useEffect(() => {
    getAssetClassData(pageNo, pageSize);
  }, []);

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
      title: 'Asset Id',
      dataIndex: 'assetId',
      key: 'assetId',
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
      title: 'Child Id',
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
        <Table columns={columns} loading={loading} dataSource={dataWithSerialNumbers} pagination={false} />
        <div className="align-center-data">
          <Pagination
            defaultCurrent={pageNo}
            total={AssetClasscount}
            pageSize={pageSize}
            onChange={getpagerecord}
            hideOnSinglePage={true}
          />
        </div>
      </Paper>
    </Box>
  );
}
