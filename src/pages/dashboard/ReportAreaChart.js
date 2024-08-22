import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    height: 340,
    type: 'line',
    toolbar: {
      show: true
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 1.5
  },
  grid: {
    strokeDashArray: 4
  },

  xaxis: {
    type: 'datetime',
    categories: [
      '2018-01-19T00:00:00.000Z',
      '2018-02-19T00:00:00.000Z',
      '2018-03-19T00:00:00.000Z',

      '2018-04-19T00:00:00.000Z',

      '2018-05-19T00:00:00.000Z',
      '2018-06-19T00:00:00.000Z',
      '2018-07-19T01:30:00.000Z',
      '2018-08-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-10-19T04:30:00.000Z',
      '2018-11-19T05:30:00.000Z',
      '2018-12-19T06:30:00.000Z'
    ],

    labels: {
      format: 'MMM'
    },
    axisBorder: {
      show: true
    },
    axisTicks: {
      show: true
    }
  },

  tooltip: {
    x: {
      format: 'MM'
    }
  },
  yaxis: { type: 'string', categories: ['200', '300', '400', '500', '600', '700', '800'] }
};

// ==============================|| REPORT AREA CHART ||============================== //

const ReportAreaChart = (AssetdamageRate) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.warning.main],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary],
            fontSize: '14px'
          }
        }
      }
    }));
    // dispatch(getAssetDamagedRate());
  }, [primary, secondary, line, theme]);

  useEffect(() => {
    setSeries([
      {
        name: 'Disposed Asset',
        data: [
          AssetdamageRate.AssetdamageRate?.January || 0,
          AssetdamageRate.AssetdamageRate?.February || 0,
          AssetdamageRate.AssetdamageRate?.March || 0,
          AssetdamageRate.AssetdamageRate?.April || 0,
          AssetdamageRate.AssetdamageRate?.May || 0,
          AssetdamageRate.AssetdamageRate?.June || 0,
          AssetdamageRate.AssetdamageRate?.July || 0,
          AssetdamageRate.AssetdamageRate?.August || 0,
          AssetdamageRate.AssetdamageRate?.September || 0,
          AssetdamageRate.AssetdamageRate?.October || 0,
          AssetdamageRate.AssetdamageRate?.November || 0,
          AssetdamageRate.AssetdamageRate?.December || 0
        ]
      }
    ]);
  }, [AssetdamageRate]);

  return <ReactApexChart className="report-chart" options={options} series={series} type="line" height={345} />;
};

export default ReportAreaChart;
