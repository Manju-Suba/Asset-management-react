import React, { useState, useRef } from 'react';
// material-ui
import {
  Box,
  Grid,
  Stack,
  // TextField,
  Typography
  // IconButton,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Input, Select ,Table,Pagination } from 'antd';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import AssetCountChart from './AssetCountChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import AnalyticEcommerce2 from 'components/cards/statistics/AnalyticEcommerce2';
import SoftwareSvg from 'assets/images/dashboard/SoftwareSvg';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import {
  getAssetCount,
  getAssetCategoryCount,
  getAssetDamagedRate,
  getAssetDamagedRejectd,
  getAssetpurchased,
  getOverAllAssetStatus,
  getStatusAssetCount,
  getMajorMinorAssetClass
} from 'components/redux/dashboard/action';
import { useDispatch, useSelector } from 'react-redux';

// ArrowRightOutlined SaveOutlined
import { SearchOutlined } from '@ant-design/icons';
import MonthlyBarChart from './MonthlyBarChart';
import RejectedCountModal from './RejectedCountModal';

export default function DashboardDefault() {
  const dispatch = useDispatch();
  const [seletedYear, setYear] = useState(null);
  const [count, setCount] = useState(0);
  const [disableBack, setDisableBack] = useState(0);
  const [compareSize, setCompareSize] = useState(0);
  const [assetClassCount, setAssetClassCount] = useState(0);
  const [assetClassDisableBack, setAssetClassDisableBack] = useState(0);
  const [assetClassCompareSize, setAssetClassCompareSize] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [statusAssetData, setStatusAssetData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [pageNo, setPageNo] = useState();
  const [pageSize, setPageSize] = useState(6);

  const userefValue = useRef(0);
  const AssetClassCount = useSelector((state) => state.DashboardData && state.DashboardData.AssetCategoryCount);
  const AssetCount = useSelector((state) => state.DashboardData && state.DashboardData.AssetCount);
  const AssetdamageRate = useSelector((state) => state.DashboardData && state.DashboardData.AssetDamageRate);
  const AssetDamageRejected = useSelector((state) => state.DashboardData && state.DashboardData.AssetDamagedRejected);
  // const Assetpurchase = useSelector((state) => state.DashboardData && state.DashboardData.AssetPurchased);
  const AssetOverall = useSelector((state) => state.DashboardData && state.DashboardData.AssetByStatus);
  const StatusAssetCount = useSelector((state) => state.DashboardData && state.DashboardData.StatusAssetCount);
  const MajorMinorAssetClass = useSelector((state) => state.DashboardData && state.DashboardData.MajorMinorAssetClass);
  const MajorMinorAssetClassCount = useSelector((state) => state.DashboardData && state.DashboardData.MajorMinorAssetClass.majorMinorAssetsCounts);

  const size = 4;

  const handleYear = (value) => {
    setYear(value);
    dispatch(getAssetDamagedRate(value));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter data based on search query
    const filteredSeries = AssetCount.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
    const statusAssetFilteredSeries = StatusAssetCount.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredData(filteredSeries);
    setStatusAssetData(statusAssetFilteredSeries);
  };

  const values = [
    { value: '2028', label: '2028' },
    { value: '2027', label: '2027' },
    { value: '2026', label: '2026' },
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' }
  ];

  React.useEffect(() => {
    const year = new Date().getFullYear();
    setYear(year);
    dispatch(getAssetCount(count, size));
    dispatch(getAssetCategoryCount());
    dispatch(getAssetDamagedRate(year));
    dispatch(getAssetDamagedRejectd());
    dispatch(getAssetpurchased());
    dispatch(getOverAllAssetStatus());
    dispatch(getStatusAssetCount(assetClassCount,size));
    dispatch(getMajorMinorAssetClass());
    
  }, [dispatch]);

  userefValue.current = AssetCount.length;

  const getMajorMinor = async (pagenumber, Size) => {
    // setLoading(true);
    try {
      const paagereduce = pagenumber - 1;
      await dispatch(getMajorMinorAssetClass(paagereduce,Size));
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  const getpagerecord = (pageNumber, pageSize) => {
    setPageNo(pageNumber);
    setPageSize(pageSize);
    getMajorMinor(pageNumber, pageSize);
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
  
  const assetClassList = MajorMinorAssetClass?.majorMinorList || [];
  const dataWithSerialNumbers = addSerialNumbers(assetClassList);

  React.useEffect(() => {
    setFilteredData(AssetCount);
    dispatch(getAssetCount(count, size));
    if (count == 0) {
      setDisableBack(0);
    }
    if (assetClassCount == 0) {
      setAssetClassDisableBack(0);
    }
    setCompareSize(userefValue.current + AssetCount.length);
    setAssetClassCompareSize(userefValue.current + AssetCount.length);
  }, [dispatch, count, size]);

  React.useEffect(() => {
    setStatusAssetData(StatusAssetCount);
    dispatch(getStatusAssetCount(assetClassCount,size));
    if (assetClassCount == 0) {
      setAssetClassDisableBack(0);
    }
    setAssetClassCompareSize(userefValue.current + AssetCount.length);
  }, [dispatch, size,assetClassCount]);

  React.useEffect(() => {
    setFilteredData(AssetCount);
    setStatusAssetData(StatusAssetCount);
  }, [AssetCount,StatusAssetCount]);

  const moveBackward = () => {
    setCount(count - 1);
  };

  const moveForward = () => {
    setDisableBack(1);
    if (AssetCount.length != 0 ) {
      setCount(count + 1);
    }
  };

  const moveAssetClassForward = () =>{
    setAssetClassDisableBack(1);
    if (StatusAssetCount.length != 0 ) {
      setAssetClassCount(assetClassCount + 1);
    }
  }

  const moveAssetClassBackward = () =>{
    setAssetClassCount(assetClassCount - 1);
  }

  const handleStatusModal = () => {
    setIsModalOpen(true);
  };

  const columns = [
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
      dataIndex: 'assetClass',
      key: 'assetClass',
      title: <span className="table-hd-fs">Asset Class</span>,
      render: (_, record) => record.assetClass ? record.assetClass : '',
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
      dataIndex: 'majorCost',
      key: 'majorCost',
      title: <span className="table-hd-fs">Cost Based Major Asset</span>,
      render: (_, record) => record.costBasedMajorAsset ? record.costBasedMajorAsset : 0,
      sorter: {
        compare: (a, b) => 
          {
            const costA = a.costBasedMajorAsset || '';
            const costB = b.costBasedMajorAsset || '';
            return costA.localeCompare(costB);
          },
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
      dataIndex: 'minorCost',
      key: 'minorCost',
      title: <span className="table-hd-fs">Cost Based Minor Asset</span>,
      render: (_, record) => record.costBasedMinorAsset ? record.costBasedMinorAsset : 0,
      sorter: {
        compare: (a, b) => {
          const costA = a.costBasedMinorAsset || '';
          const costB = b.costBasedMinorAsset || '';
          return costA.localeCompare(costB);
        },
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
    <Grid container rowSpacing={2.5} columnSpacing={2.75}>
      {/* row 1 */}
      {/* <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid> */}

      <Grid item xs={12} sm={12} md={7} lg={8} sx={{ mt: 1.0, p: 0 }}>
        <MainCard contentSX={{ p: 2, pt: 0, pl: 0, pb: 0, textAlign: 'center' }} sx={{ pt: 1.5, pl: 2, pb: 0, border: 'none' }}>
          <Grid container spacing={2}>
            <Grid item xs={2} lg={2}>
              <AnalyticEcommerce
                title="Total Order"
                subtitle="Total No. of Assets(inclusive damaged Assets)"
                count="158965"
                label={AssetClassCount['AllAsset'] ? AssetClassCount['AllAsset'] : 0}
                value="Total No. of Asset"
                bgcolor="#4380EB"
                width="7rem"
                color="#FFFFFF"
              />
            </Grid>
            <Grid item xs={10} lg={10}>
              <AnalyticEcommerce2 AssetClass={AssetClassCount} />
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={4} sx={{ mt: 1.0, p: 0 }}>
        <MainCard contentSX={{ p: 2, pt: 0, pl: 0, pb: 0, textAlign: 'center' }} sx={{ pt: 1.5, pl: 2, pb: 0, border: 'none' }}>
          <Grid container spacing={2}>
            <Grid item>
              <AnalyticEcommerce
                title="Total Order"
                subtitle="Total No. of damaged Assets"
                count="2829"
                label={AssetDamageRejected['totalDamagedAsset'] ? AssetDamageRejected['totalDamagedAsset'] : 0}
                value="Total Damage Asset"
                bgcolor="#f99e14e0"
                width="10rem"
                color="#FFFFFF"
              />
            </Grid>

            <Grid item alignItems="center" sx={{ pt: 1, pl: 3, pb: 0, borderRadius: '10px', width: '10rem' }}>
              <Grid item lg={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 3, paddingTop: '10px' }}>
                <SoftwareSvg width="29px" mt="4" height="32px" />
              </Grid>
              <Grid
                item
                lg={12}
                sx={{ color: '#fff', fontSize: '28px', fontWeight: '300', pt: 0, textAlign: 'center' }}
                onClick={() => handleStatusModal()}
              >
                <Grid item sx={{ fontSize: '19px', color: 'grey', justifyContent: 'center' }}>
                  {AssetDamageRejected['totalRejectedAsset'] ? AssetDamageRejected['totalRejectedAsset'] : 0}
                </Grid>
                <Grid item sx={{ fontSize: '11px', color: 'grey', mt: 1, ml: 1 }}>
                  Total Rejected Asset
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <RejectedCountModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      {/* <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} /> */}

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <MainCard sx={{ mt: 1 }}>
          <Stack spacing={1.5} sx={{ mb: -12 }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Grid item lg={6} md={6}>
                <Typography sx={{ fontSize: '20px', color: '#000000', fontWeight: '600' }}>Assets Count</Typography>
              </Grid>
              <Grid item sx={{ display: 'flex' }}>
                <Grid item sx={{ width: '50%', height: '40px', mt: 0.3 }}>
                  <Input
                    style={{ backgroundColor: '#F3F3F3', border: 'none', height: '40px' }}
                    placeholder="Search Asset"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    prefix={<SearchOutlined style={{ color: '#C7C7C7' }} />}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Stack>
          <Grid item sx={{ mt: 9 }} lg={12}>
            <SalesColumnChart assetClassCount={filteredData} />
            <Grid className="next-prv-container" container item justifyContent="space-between" sx={{ mt: 1 }}>
              <Grid item sx={{ mt: 1 }} className="prev-btn">
                {disableBack == 1 && <ChevronLeft onClick={moveBackward} />}
                {/* <ChevronLeft onClick={moveBackward} /> */}
              </Grid>
              <Grid item sx={{ mt: 1 }} className="next-btn">
                {compareSize == AssetClassCount.AllAsset ? '' : <ChevronRight onClick={moveForward} />}
                {/* <ChevronRight onClick={moveForward} /> */}
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid item container alignItems="center" justifyContent="space-between">
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 1, border: 'none' }} content={false}>
          <Box sx={{ p: 3, pt: 2, pb: 0 }}>
            <Stack spacing={2}>
              <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '20px', color: '#000000', fontWeight: '600' }}>Overall Asset by Status</Typography>
                <Typography variant="h6" color="textSecondary"></Typography>
              </Grid>
            </Stack>
          </Box>
          <Grid item sx={{ height: '390px', mt: 3 }}>
            <MonthlyBarChart overallAsset={AssetOverall} />
          </Grid>
        </MainCard>
      </Grid>

      {/* row 3 */}

      <Grid item xs={12} md={12} lg={12}>
        <Grid item container>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 1 }} content={false}>
          <Grid item sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Grid item>
              <Typography sx={{ fontSize: '20px', color: '#000000', fontWeight: '600', ml: 3 }}>Damaged Assets Rate</Typography>
            </Grid>
            <Grid item sx={{ mr: 3, display: 'flex' }}>
              <Grid item sx={{ mt: 0.5 }}>
                <Select
                  value={seletedYear}
                  onChange={handleYear}
                  style={{ width: 80, height: '35px', backgroundColor: '#F3F3F3', border: 'none' }}
                  options={values.map((option) => ({
                    value: option.value,
                    label: option.label
                  }))}
                />
              </Grid>
            </Grid>
          </Grid>
          <ReportAreaChart AssetdamageRate = {AssetdamageRate} />
        </MainCard>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <MainCard sx={{ mt: 1 }}>
          <Stack spacing={1.5} sx={{ mb: -12 }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Grid item lg={6} md={6}>
                <Typography sx={{ fontSize: '20px', color: '#000000', fontWeight: '600' }}>Assets Count</Typography>
              </Grid>
              <Grid item sx={{ display: 'flex' }}>
                <Grid item sx={{ width: '50%', height: '40px', mt: 0.3 }}>
                  <Input
                    style={{ backgroundColor: '#F3F3F3', border: 'none', height: '40px' }}
                    placeholder="Search Asset"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    prefix={<SearchOutlined style={{ color: '#C7C7C7' }} />}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Stack>
          <Grid item sx={{ mt: 9 }} lg={12}>
            <AssetCountChart statusAssetData={statusAssetData} />
            <Grid className="next-prv-container" container item justifyContent="space-between" sx={{ mt: 1 }}>
              <Grid item sx={{ mt: 1 }} className="prev-btn">
                {assetClassDisableBack == 1 && <ChevronLeft onClick={moveAssetClassBackward} />}
              </Grid>
              <Grid item sx={{ mt: 1 }} className="next-btn">
                {assetClassCompareSize == AssetClassCount.AllAsset ? '' : <ChevronRight onClick={moveAssetClassForward} />}
                
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Grid item container alignItems="center" justifyContent="space-between">
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 1, border: 'none' }} content={false}>
          <Box sx={{ p: 3, pt: 2, pb: 0 }}>
            <Stack spacing={2}>
              <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Grid item lg={6} md={6}>
                <Typography sx={{ fontSize: '20px', color: '#000000', fontWeight: '600' }}>Major & Minor Asset</Typography>
              </Grid>
              <Grid item sx={{ display: 'flex' }}>
                <Grid item sx={{ width: '50%', height: '40px', mt: 0.3 }}>
                  <Input
                    style={{ backgroundColor: '#F3F3F3', border: 'none', height: '40px' }}
                    placeholder="Search Asset"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    prefix={<SearchOutlined style={{ color: '#C7C7C7' }} />}
                  />
                </Grid>
              </Grid>
              </Grid>
            </Stack>
          </Box>
          <Grid item sx={{ height: '390px', mt: 3 }}>
          <Table
            className="table-hd"
            columns={columns}
            dataSource={dataWithSerialNumbers}
            pagination={false}
            // loading={loading}
            // showSorterTooltip={false}
          />
          <div className="align-center-data">
            <Pagination defaultCurrent={pageNo} current ={pageNo} pageSize={pageSize} total={MajorMinorAssetClassCount} onChange={getpagerecord} hideOnSinglePage={true} />
          </div>
          </Grid>
        </MainCard>
      </Grid>

    </Grid>
  );
}
