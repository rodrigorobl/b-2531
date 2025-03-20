
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface LotData {
  id: string;
  name: string;
  nonCompliantQuotes: number;
  compliantQuotes: number;
  interestedCompanies: number;
  declinedCompanies: number;
  noResponseCompanies: number;
}

interface TenderLotsBarChartProps {
  tenderId: string;
}

// Mock data for demonstration
const mockLotsData: LotData[] = [
  {
    id: 'lot-001',
    name: 'Gros Œuvre',
    nonCompliantQuotes: 1,
    compliantQuotes: 1,
    interestedCompanies: 0,
    declinedCompanies: 1,
    noResponseCompanies: 1
  },
  {
    id: 'lot-002',
    name: 'Charpente',
    nonCompliantQuotes: 0,
    compliantQuotes: 0,
    interestedCompanies: 1,
    declinedCompanies: 0,
    noResponseCompanies: 1
  },
  {
    id: 'lot-003',
    name: 'Électricité',
    nonCompliantQuotes: 0,
    compliantQuotes: 1,
    interestedCompanies: 0,
    declinedCompanies: 1,
    noResponseCompanies: 1
  },
  {
    id: 'lot-004',
    name: 'Plomberie',
    nonCompliantQuotes: 0,
    compliantQuotes: 0,
    interestedCompanies: 0,
    declinedCompanies: 0,
    noResponseCompanies: 2
  },
  {
    id: 'lot-005',
    name: 'Menuiseries',
    nonCompliantQuotes: 0,
    compliantQuotes: 1,
    interestedCompanies: 0,
    declinedCompanies: 1,
    noResponseCompanies: 1
  }
];

const TenderLotsBarChart: React.FC<TenderLotsBarChartProps> = ({ tenderId }) => {
  const [data, setData] = useState<LotData[]>([]);

  useEffect(() => {
    console.log("Loading lots chart data for tender:", tenderId);
    // In a real app, we would fetch data based on tenderId
    // For now, use mock data
    setData(mockLotsData);
  }, [tenderId]);

  const chartData = data.map(lot => ({
    name: lot.name,
    "Offres non conformes": lot.nonCompliantQuotes,
    "Offres conformes": lot.compliantQuotes,
    "Entreprises intéressées": lot.interestedCompanies,
    "Entreprises ayant décliné": lot.declinedCompanies,
    "Sans réponse": lot.noResponseCompanies,
  }));

  const chartConfig = {
    "Offres non conformes": {
      color: "#ea384c", // Rouge
    },
    "Offres conformes": {
      color: "#4ade80", // Vert
    },
    "Entreprises intéressées": {
      color: "#fef08a", // Jaune
    },
    "Entreprises ayant décliné": {
      color: "#333333", // Gris foncé
    },
    "Sans réponse": {
      color: "#93c5fd", // Bleu clair
    },
  };

  if (data.length === 0) {
    return <div>Chargement des données...</div>;
  }

  return (
    <ChartContainer className="h-[300px] w-full" config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip 
            content={({ active, payload, label }) => (
              <ChartTooltipContent 
                active={active} 
                payload={payload} 
                label={label} 
              />
            )}
          />
          <Legend />
          <Bar 
            dataKey="Offres non conformes" 
            stackId="a" 
            fill={chartConfig["Offres non conformes"].color} 
          />
          <Bar 
            dataKey="Offres conformes" 
            stackId="a" 
            fill={chartConfig["Offres conformes"].color} 
          />
          <Bar 
            dataKey="Entreprises intéressées" 
            stackId="a" 
            fill={chartConfig["Entreprises intéressées"].color} 
          />
          <Bar 
            dataKey="Entreprises ayant décliné" 
            stackId="a" 
            fill={chartConfig["Entreprises ayant décliné"].color} 
          />
          <Bar 
            dataKey="Sans réponse" 
            stackId="a" 
            fill={chartConfig["Sans réponse"].color} 
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TenderLotsBarChart;
