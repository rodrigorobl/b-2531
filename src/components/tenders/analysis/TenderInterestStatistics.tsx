
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, FileDown, Calculator } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface LotData {
  id: string;
  name: string;
  viewedCompanies: number;
  downloadedDCE: number;
  addedToQuote: number;
}

interface TenderInterestStatisticsProps {
  viewedCompanies: number;
  downloadedDCE: number;
  addedToQuote: number;
  lotsData?: LotData[];
  onLotFilterChange?: (lotId: string | null) => void;
  selectedLot?: string | null;
}

const TenderInterestStatistics: React.FC<TenderInterestStatisticsProps> = ({
  viewedCompanies,
  downloadedDCE,
  addedToQuote,
  lotsData,
  onLotFilterChange,
  selectedLot
}) => {
  const handleLotChange = (value: string) => {
    if (onLotFilterChange) {
      onLotFilterChange(value === 'all' ? null : value);
    }
  };

  // Config for chart
  const chartConfig = {
    "Consultations": {
      color: "#93c5fd", // Bleu clair
    },
    "Téléchargements DCE": {
      color: "#a78bfa", // Violet
    },
    "Ajouts aux devis": {
      color: "#2dd4bf", // Turquoise
    },
  };

  // Prepare chart data if lotsData is available
  const chartData = lotsData ? lotsData.map(lot => ({
    name: lot.name,
    "Consultations": lot.viewedCompanies,
    "Téléchargements DCE": lot.downloadedDCE,
    "Ajouts aux devis": lot.addedToQuote,
  })) : [];

  return (
    <div className="space-y-6">
      {lotsData && onLotFilterChange && (
        <div className="flex justify-end">
          <Select 
            onValueChange={handleLotChange}
            value={selectedLot || 'all'}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrer par lot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les lots</SelectItem>
              {lotsData.map(lot => (
                <SelectItem key={lot.id} value={lot.id}>
                  Lot {lot.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Eye className="h-8 w-8 text-blue-500 mb-2" />
            <span className="text-2xl font-bold">{viewedCompanies}</span>
            <span className="text-sm text-muted-foreground">Entreprises ayant consulté</span>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <FileDown className="h-8 w-8 text-purple-500 mb-2" />
            <span className="text-2xl font-bold">{downloadedDCE}</span>
            <span className="text-sm text-muted-foreground">Téléchargements du DCE</span>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Calculator className="h-8 w-8 text-teal-500 mb-2" />
            <span className="text-2xl font-bold">{addedToQuote}</span>
            <span className="text-sm text-muted-foreground">Ajouts à "À chiffrer"</span>
          </CardContent>
        </Card>
      </div>
      
      {lotsData && chartData.length > 0 && (
        <div className="mt-8">
          <Separator className="my-4" />
          <h3 className="text-lg font-medium mb-4">Détail par lot</h3>
          <div className="h-[300px]">
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
                    dataKey="Consultations"
                    fill={chartConfig["Consultations"].color}
                  />
                  <Bar
                    dataKey="Téléchargements DCE"
                    fill={chartConfig["Téléchargements DCE"].color}
                  />
                  <Bar
                    dataKey="Ajouts aux devis"
                    fill={chartConfig["Ajouts aux devis"].color}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenderInterestStatistics;
