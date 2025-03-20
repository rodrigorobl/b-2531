
import React from 'react';
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
  plannedBudget: number;
  simulatedBudget: number;
  viewedCompanies: number;
  downloadedDCE: number;
  addedToQuote: number;
}

interface TenderLotsBarChartProps {
  data: LotData[];
}

const TenderLotsBarChart: React.FC<TenderLotsBarChartProps> = ({ data }) => {
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

  return (
    <ChartContainer className="h-full w-full" config={chartConfig}>
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
