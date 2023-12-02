import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const PieOrders = ({ data, selectedKiosk, selectedOptions }) => {

  const chartContainer = useRef(null);
  useEffect(() => {
    let filteredByOperation = data;
    if (data) {
      if (selectedOptions) {
        const filters = JSON.parse(localStorage.getItem("filters")) || [];
        const selectedFilter = filters.find((filter) => filter.name === selectedOptions.value);

        if (selectedFilter) {

          if (selectedFilter?.kiosks) {
            filteredByOperation = filteredByOperation.filter((item) =>
              selectedFilter.kiosks.some((kiosk) => kiosk.value === item.kiosk_name)
            );
          }
        }
      }
      else if (selectedKiosk && selectedKiosk.length > 0) {
        filteredByOperation = data.filter((item) => selectedKiosk.some((kiosk) => kiosk.value === item.kiosk_name));
      }
    }

    const statusCounts = filteredByOperation?.reduce((counts, item) => {
      const statusName = item.status_name;
      counts[statusName] = (counts[statusName] || 0) + 1;
      return counts;
    }, {});

    const totalItems = Object.values(statusCounts).reduce((total, count) => total + count, 0);

    const statusCountData = Object.entries(statusCounts).map(([label, value]) => ({
      label,
      percentage: Math.round((value / totalItems) * 100 * 10) / 10,
      totalItems: totalItems
    }));

    const chartData = {
      labels: statusCountData.map(entry => `${entry.label} (${entry.totalItems}) ${entry.percentage}%`),
      datasets: [{
        data: statusCountData.map(entry => entry.percentage),
        backgroundColor: statusCountData.map(generateRandomColor),
      }],
    };

    const ctx = chartContainer.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: chartData,
      options: {
        plugins: {
          legend: {
            position: 'right',
          },
        }
      }
    });
    return () => {
      myChart.destroy()
    }
  }, [data, selectedKiosk, selectedOptions]);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className='col col-md-6 mx-auto' style={{ margin: '0 auto' }}>
      <div className='w-auto h-auto '>
        <canvas ref={chartContainer} />
      </div>
    </div>
  )
};


