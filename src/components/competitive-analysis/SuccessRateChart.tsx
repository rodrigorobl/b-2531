
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SuccessRateChartProps {
  region: string;
  timeRange: string;
}

const SuccessRateChart = ({ region, timeRange }: SuccessRateChartProps) => {
  // Mock data - would be fetched from API in a real scenario
  const data = [
    {
      name: 'Gros œuvre',
      'Votre entreprise': 58,
      'Moyenne concurrents': 42,
    },
    {
      name: 'Second œuvre',
      'Votre entreprise': 65,
      'Moyenne concurrents': 51,
    },
    {
      name: 'Électricité',
      'Votre entreprise': 49,
      'Moyenne concurrents': 55,
    },
    {
      name: 'Plomberie',
      'Votre entreprise': 72,
      'Moyenne concurrents': 63,
    },
    {
      name: 'Menuiserie',
      'Votre entreprise': 53,
      'Moyenne concurrents': 47,
    },
    {
      name: 'Peinture',
      'Votre entreprise': 68,
      'Moyenne concurrents': 59,
    },
    {
      name: 'CVC',
      'Votre entreprise': 43,
      'Moyenne concurrents': 51,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis unit="%" />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar dataKey="Votre entreprise" fill="#0ea5e9" />
        <Bar dataKey="Moyenne concurrents" fill="#f43f5e" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SuccessRateChart;
