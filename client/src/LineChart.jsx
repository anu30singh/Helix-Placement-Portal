import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028'], // Categories
    datasets: [
      {
        label: 'Tech Companies',
        data: [65, 59, 80, 81, 56, 55, 40], 
        borderColor: 'rgba(255, 99, 132, 1)', // Pink
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4, // Curve the line slightly
      },
      {
        label: 'Finance Companies',
        data: [45, 69, 60, 91, 66, 65, 70],
        borderColor: 'rgba(54, 162, 235, 1)', // Blue
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
      },
      {
        label: 'Consulting Companies',
        data: [85, 79, 90, 71, 86, 75, 60],
        borderColor: 'rgba(75, 192, 192, 1)', // Green
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff', // White legend text
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
        text: 'Student Placements in Different Companies',
        color: '#fff', // White title
        font: {
          size: 18,
        },

      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff', // White x-axis labels
        },
        grid: {
          display: false, // Hide grid lines on x-axis
        },
        border: {
          color: '#fff', // White x-axis border
        },
      },
      y: {
        ticks: {
          color: '#fff', // White y-axis labels
        },
        grid: {
          display: false
        },
        border: {
          color: '#fff', // White x-axis border
        },
      },
    },
  });

  return (
    <div style={{ backgroundColor: 'transparent', padding: '20px', borderRadius: '10px', width:'80%',height:'70%' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
