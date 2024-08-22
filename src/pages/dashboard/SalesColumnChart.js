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

const SalesColumnChart = (assetClassCount) => {
  const theme = useTheme();
  const [series, setSeries] = useState([]);

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

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
      colors: [primaryMain, warning],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        },
        categories: assetClassCount.assetClassCount.map((item) => item.name)
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
    if (assetClassCount.assetClassCount.length > 0) {
      const newData = [
        {
          name: 'Stock',
          data: assetClassCount.assetClassCount.map((item) => item.stock)
        },
        {
          name: 'Dispose',
          data: assetClassCount.assetClassCount.map((item) => item.dispose)
        }
      ];
      setSeries(newData);
    }
  }, [assetClassCount, primary, secondary, line, warning, primaryMain, successDark]);

  return (
    <div id="chart">
      <ReactApexChart className="sales-chart" options={options} series={series} type="bar" height={380} />
    </div>
  );
};

export default SalesColumnChart;
