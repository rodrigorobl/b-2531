
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  LabelList
} from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';

interface Bid {
  id: string;
  companyName: string;
  amount: number;
  compliant: boolean;
  solvencyScore: 'excellent' | 'average' | 'at-risk';
}

interface Lot {
  id: string;
  name: string;
  bids: Bid[];
}

interface LotAnalysisChartProps {
  lot: Lot;
  estimatedBudget: number;
}

export function LotAnalysisChart({ lot, estimatedBudget }: LotAnalysisChartProps) {
  // Prepare data for the chart
  const chartData = lot.bids.map(bid => ({
    name: bid.companyName,
    amount: bid.amount,
    compliant: bid.compliant ? 'Conforme' : 'Non conforme',
    solvencyClass: bid.solvencyScore,
    fill: bid.compliant ? '#22c55e' : '#ef4444'
  }));
  
  // Sort by amount for better visualization
  chartData.sort((a, b) => a.amount - b.amount);
  
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  };
  
  // Define chart config
  const chartConfig = {
    compliant: { label: 'Conforme', color: '#22c55e' },
    'non-compliant': { label: 'Non conforme', color: '#ef4444' },
    estimated: { label: 'Budget estimé', color: '#3b82f6' },
  };
  
  return (
    <div className="h-[400px] w-full">
      <ChartContainer config={chartConfig}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
          <YAxis tickFormatter={formatPrice} />
          <ChartTooltip
            content={<ChartTooltipContent labelKey="name" />}
            formatter={(value: number) => [formatPrice(value), 'Montant']}
          />
          <Legend />
          <ReferenceLine y={estimatedBudget} stroke="#3b82f6" strokeDasharray="3 3" label={{ value: 'Budget estimé', position: 'left', fill: '#3b82f6' }} />
          <Bar 
            dataKey="amount" 
            name="Montant" 
            fill="#22c55e"
            opacity={0.8}
            barSize={40}
            fillOpacity={0.6}
            strokeWidth={1}
            stroke="#22c55e"
          >
            {chartData.map((entry, index) => (
              <rect 
                key={`rect-${index}`}
                x={0}
                y={0}
                width={40}
                height={0}
                fill={entry.fill}
                strokeWidth={1}
                stroke={entry.fill}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
