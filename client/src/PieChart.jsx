import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const [chartData, setChartData] = useState({
    labels: [
      'Tech Companies', 
      'Finance Companies', 
      'Consulting Companies', 
      'Retail Companies', 
      'Healthcare Companies', 
      'Manufacturing Companies'
    ],
    datasets: [
      {
        data: [30, 25, 15, 10, 12, 8], // Adjusted percentages for more company types
        backgroundColor: [
          '#E8A838', // Vibrant color for Tech Companies
          '#F1E15B', // Vibrant color for Finance Companies
          '#F47560', // Vibrant color for Consulting Companies
          '#E8C1A0', // Vibrant color for Retail Companies
          '#61CDBB', // Vibrant color for Healthcare Companies
          '#97E3D5', // Another complementary color for Manufacturing Companies
        ],
        borderColor: [
          '#E8A838', 
          '#F1E15B', 
          '#F47560', 
          '#E8C1A0', 
          '#61CDBB', 
          '#97E3D5',
        ],
        borderWidth: 2,
        hoverOffset: 10, // Increased section size on hover
        cutout: '40%', // Converts it to a donut chart by cutting out the center
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    maintainAspectRatio: false, // Important for controlling the size manually
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true, // Uses small circular dots instead of squares
          pointStyle: 'circle',
          color: '#fff',
          boxWidth: 10, // Adjust the size of the dot
          padding: 15, // Adds space between the items in the horizontal layout
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
      },
      title: {
        display: true,
        text: 'Company Representation by Type in %',
        color: '#fff',
        font: {
          size: 18,
        },
      },
    },
  });

  return (
    <div style={{ width: '500px', height: '500px', margin: '0', backgroundColor: 'transparent', padding: '20px', borderRadius: '10px' }}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default DonutChart;
