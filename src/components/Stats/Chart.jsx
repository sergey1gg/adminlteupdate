import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const ChartC = ({ data, dateReq, setSelectedKiosk, setSelectedOperation, setSelectedOptions }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    // Преобразуем данные
    const kiosks = {};

    data.forEach((order) => {

      const date = dateReq.to !== dateReq.from? order.datetime.split('T')[0]: order.datetime.split('T')[1].split(':')[0]; // Получаем дату в формате "YYYY-MM-DD"
      const kioskName = order.kiosk_name;
    
      if (!kiosks[kioskName]) {
        kiosks[kioskName] = {
          label: kioskName,
          data: {},
        };
      }
    
      if (!kiosks[kioskName].data[date]) {
        kiosks[kioskName].data[date] = 0;
      }
    
      kiosks[kioskName].data[date] += order.summa;
    });
    
    const allDates = Array.from(
        new Set(
          Object.values(kiosks).flatMap((kiosk) => Object.keys(kiosk.data))
        )
      );

          const sortedDates = allDates.sort((a, b) => {
            if (dateReq.to !== dateReq.from) {
              return new Date(a) - new Date(b);
            } else {
              const hourA = parseInt(a, 10);
              const hourB = parseInt(b, 10);
          
              if (hourA === 0) return -1; 
              if (hourB === 0) return 1; 
          
              return hourA - hourB;
            }
          });
          
          
      
      const chartData = {
        labels: allDates,
        datasets: Object.values(kiosks).map((kiosk) => ({
          label: kiosk.label,
          data: sortedDates.map((date) => kiosk.data[date] || 0), 
          borderColor: getRandomColor(),
          fill: false,
        })),
      };
    

    const ctx = chartContainer.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
            
          },
          y: {
            title: {
              display: true,
              text: 'Summa',
            },
          },
        },
      },
    });

    // Уничтожаем предыдущий экземпляр графика, если он существует
    return () => {
      myChart.destroy();
    };
  }, [data, dateReq]);
  
  return <canvas ref={chartContainer} />;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
