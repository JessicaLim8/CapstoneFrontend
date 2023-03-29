import React, { Component } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

    const MeasurementTime = [0];
    const MeasurementArray = [0];

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Load Cell Sensor Data',
      },
      
    },
  };
  
  export const data = {
    labels: MeasurementTime,
    datasets: [
      {
        label: 'Force (g)',
        data: MeasurementArray,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  

class SensorChart extends Component {
  render() {
    return <Line options={options} data={data} />
  }
}

export default SensorChart; // Don’t forget to use export default!
