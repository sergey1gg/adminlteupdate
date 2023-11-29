import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const PieOrders = ({ data }) => {
  const chartContainer = useRef(null);
  useEffect(() => {
    const statusCounts = data?.reduce((counts, item) => {
      const statusName = item.status_name;
      counts[statusName] = (counts[statusName] || 0) + 1;
      return counts;
    }, {});
    
    const totalItems = Object.values(statusCounts).reduce((total, count) => total + count, 0);
    
    const statusCountData = Object.entries(statusCounts).map(([label, value]) => ({
      label,
      percentage: (value / totalItems) * 100,
    }));
    
    const chartData = {
      labels: statusCountData.map(entry => entry.label),
      datasets: [{
        data: statusCountData.map(entry => entry.percentage),
        backgroundColor: statusCountData.map(generateRandomColor),
      }],
    };
    
    const ctx = chartContainer.current.getContext('2d');
    const myChart =new Chart(ctx, {
      type: 'pie',
      data: chartData,
    });
    return ()=>{
        myChart.destroy()
    }
  }, [data]);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return(
    <div style={{width: '50%', height: '50%', margin: '0 auto'}}>
        <canvas  ref={chartContainer} />;
    </div>
  ) 
};


