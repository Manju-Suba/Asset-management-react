import { useEffect, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: true,
      tools: {
        download: `<i className="icon-download"> </i>`
      }
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent']
  },
  // xaxis: {
  //     categories: ['laptop', 'Chair', 'Table', 'Notepad', 'Computer', 'Scanner', 'Desktop']
  // },
  yaxis: {
    title: {
      text: 'Counts'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter(val) {
        return ` ${val} `;
      }
    }
  },
  legend: {
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 2,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 16,
      height: 16,
      radius: '50%',
      offsexX: 2,
      offsexY: 2
    },
    itemMargin: {
      horizontal: 15,
      vertical: 50
    }
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
};

// ==============================|| SALES COLUMN CHART ||============================== //

const AssetCountChart = (statusAssetData) => {
  const theme = useTheme();
  const [series, setSeries] = useState([]);

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;
  const success = theme.palette.success.main;
  // const [series] = useState([
  //     {
  //         name: 'Stock',
  //         data: [870, 610, 280, 785, 610, 830, 590]
  //     },
  //     {
  //         name: 'Dispose',
  //         data: [250, 430, 240, 550, 220, 250, 410]
  //     }

  // ]);

  // useEffect(() => {

  // }, [assetClassCount]);

  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [success,secondary,primaryMain, warning],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        },
        categories: statusAssetData.statusAssetData.map((item) => item.assetClass)
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
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
        position: 'top',

        horizontalAlign: 'left',

        labels: {
          colors: 'grey.500'
        }
      }
    }));
    if (statusAssetData.statusAssetData.length > 0) {
      const newData = [
        {
          name: 'Online',
          data: statusAssetData.statusAssetData.map((item) => item.Online)
        },
        {
          name: 'Offline',
          data: statusAssetData.statusAssetData.map((item) => item.Offline)
        },
        {
            name: 'Maintenance',
            data: statusAssetData.statusAssetData.map((item) => item.Maintenance)
        },
        {
            name: 'Scrapped',
            data: statusAssetData.statusAssetData.map((item) => item.Scrapped)
          }
      ];
      setSeries(newData);
    }
  }, [statusAssetData, primary, secondary, line, warning, primaryMain, successDark,success]);

  return (
    <div id="chart">
      <ReactApexChart className="sales-chart" options={options} series={series} type="bar" height={380} />
    </div>
  );
};

export default AssetCountChart;
