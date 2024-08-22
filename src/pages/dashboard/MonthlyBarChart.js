import React from 'react';
import ReactApexChart from 'react-apexcharts';
// import DownloadIcons from 'assets/images/icons/file-export.svg';

const MonthlyBarChart = (overallAsset) => {
  const totalStocks = overallAsset.overallAsset.totalStocks;
  const totalDamage = overallAsset.overallAsset.totalDamage;

  const options = {
    labels: ['Stocks', 'Dispose'],
    colors: ['#4380EB', '#FFAA00'],
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    chart: {
      toolbar: {
        show: true,
        tools: {
          download: `<i className="icon-download"> </i>`
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: true,
      position: 'bottom',

      horizontalAlign: 'center',

      labels: {
        colors: 'grey.500',

        m: 3
      } // Hide the legend
    },
    tooltip: {
      enabled: true
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  const series = [totalStocks ? totalStocks : 0, totalDamage ? totalDamage : 0];

  return <ReactApexChart className="monthly-chart" options={options} series={series} type="donut" height={300} />;
};

export default MonthlyBarChart;
