
import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '@/components/ui/card';

interface MarketShareChartProps {
  region: string;
  timeRange: string;
  projectType: string;
}

const MarketShareChart = ({ region, timeRange, projectType }: MarketShareChartProps) => {
  // Mock data - would be fetched from API in a real scenario
  const data = [
    { name: 'Votre entreprise', value: 25, color: '#0ea5e9' },
    { name: 'Concurrent A', value: 18, color: '#f43f5e' },
    { name: 'Concurrent B', value: 15, color: '#8b5cf6' },
    { name: 'Concurrent C', value: 12, color: '#10b981' },
    { name: 'Concurrent D', value: 10, color: '#f59e0b' },
    { name: 'Autres entreprises', value: 20, color: '#6b7280' },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MarketShareChart;
