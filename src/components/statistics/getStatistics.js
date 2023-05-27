// react
import React from 'react';

// @chartjs
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import { Pie, PolarArea, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, RadialLinearScale, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export const pieData = {
  labels: ['Conector', 'Receptor', 'Vendedor'],
  datasets: [
    {
      label: ['# of Users'],
      data: [19, 5, 3],
      backgroundColor: [
        'rgba(153, 102, 255, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(75, 192, 192, 0.2)',

      ],
      borderColor: [
        'rgba(153, 102, 255, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export function PieGraph() {
    return <Pie data={pieData} />;
}

export const polarData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
export function PolarGraph() {
    return <PolarArea data={polarData} />;
}

export const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const labels = ['Bello', 'Poblado', 'Envigado', 'Caribe', 'Hospital', 'Itagui', 'San Antonio'];
  
  export const lineData = {
    labels,
    datasets: [
      {
        label: 'Envios',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Conexiones',
        data: [18, 9, 23, 5, 12, 43],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  export function LineChart() {
    return <Line options={lineOptions} data={lineData} />;
  }