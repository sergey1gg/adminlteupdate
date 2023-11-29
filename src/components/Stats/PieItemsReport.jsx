import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const PieItemsReport = ({ data }) => {
    console.log(data)
  const chartContainer = useRef(null);
  const chartNullContainer = useRef(null);
  useEffect(() => {
    const statusCounts = data?.reduce((counts, item) => {
        const statusName = item.tovar_name;
        const subIdIsNull = item.SUB_ID === null;
        const key = subIdIsNull ? `${statusName}_null` : `${statusName}_not_null`;
      
        counts[key] = (counts[key] || 0) + 1;
      
        return counts;
      }, {});
      
      const nullStatusCountData = [];
      const notNullStatusCountData = [];
      
      Object.entries(statusCounts).forEach(([key, value]) => {
        const [label, subIdStatus] = key.split('_');
        const entry = {
          label,
          value,
          subIdIsNull: subIdStatus === 'null',
        };
      
        if (entry.subIdIsNull) {
          nullStatusCountData.push(entry);
        } else {
          notNullStatusCountData.push(entry);
        }
      });
      const calculatePercentage = (counts) => {
        const totalItems = counts.reduce((total, count) => total + count.value, 0);
      
        return counts.map(entry => ({
          label: entry.label,
          percentage: (entry.value / totalItems) * 100,
          subIdIsNull: entry.subIdIsNull,
        }));
      };
      
      const nullStatusPercentages = calculatePercentage(nullStatusCountData);
      const notNullStatusPercentages = calculatePercentage(notNullStatusCountData);

      console.log( nullStatusPercentages);
      console.log( notNullStatusPercentages);
      
      const chartData = {
        labels: nullStatusPercentages.map(entry => entry.label),
        datasets: [{
          data: nullStatusPercentages.map(entry => entry.percentage),
          backgroundColor: nullStatusPercentages.map(generateRandomColor),
        }],
      };
  
      const ctx = chartContainer.current.getContext('2d');
      const myChart =new Chart(ctx, {
        type: 'pie',
        data: chartData,
      });


      const chartNullData = {
        labels: notNullStatusPercentages.map(entry => entry.label),
        datasets: [{
          data: notNullStatusPercentages.map(entry => entry.percentage),
          backgroundColor: notNullStatusPercentages.map(generateRandomColor),
        }],
      };
  
      const ctxNull = chartNullContainer.current.getContext('2d');
      const myChartNull =new Chart(ctxNull, {
        type: 'pie',
        data: chartNullData,
      });
      return ()=>{
          myChart.destroy()
          myChartNull.destroy()
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center">
            <h5>Null</h5>
          <canvas ref={chartContainer} style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="col-md-6">
        <h5>Not Null</h5>
          <canvas ref={chartNullContainer} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </div>
  ) 
};


