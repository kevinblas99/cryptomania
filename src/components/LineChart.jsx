import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: `Price In USD (${coinName})`,
        data: coinPrice,
        fill: true,
        backgroundColor: 'rgba(0, 113, 189, 0.1)',
        borderColor: '#0071bd',
        borderWidth: 2,
        pointRadius: 0,
        lineTension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#0071bd',
        titleFont: { size: 30 },
        bodyFont: { size: 10 },
        displayColors: false,
        callbacks: {
            title: () => '', // removes the title from tooltip
          },
      },
    },
    scales: {
      x: {
        
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
          borderDash: [8, 4],
        },
        ticks: {
          color: '#8c8c8c',
          padding: 10,
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header" style={{ marginBottom: '1em' }}>
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change" style={{ color: '#0071bd' }}>
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price" style={{ color: '#0071bd' }}>
            Current {coinName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
