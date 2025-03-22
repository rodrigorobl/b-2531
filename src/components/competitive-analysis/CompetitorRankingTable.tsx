
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CompetitorRankingTableProps {
  region: string;
  timeRange: string;
  projectType: string;
}

const CompetitorRankingTable = ({ region, timeRange, projectType }: CompetitorRankingTableProps) => {
  // Mock data - would be fetched from API in a real scenario
  const competitors = [
    {
      id: 'your-company',
      rank: 1,
      name: 'Votre entreprise',
      projectsWon: 42,
      successRate: 68,
      averageBudget: '980 000 €',
      trend: 'up',
      highlight: true,
    },
    {
      id: 'comp-1',
      rank: 2,
      name: 'Concurrent A',
      projectsWon: 38,
      successRate: 61,
      averageBudget: '1 120 000 €',
      trend: 'up',
      highlight: false,
    },
    {
      id: 'comp-2',
      rank: 3,
      name: 'Concurrent B',
      projectsWon: 35,
      successRate: 59,
      averageBudget: '870 000 €',
      trend: 'down',
      highlight: false,
    },
    {
      id: 'comp-3',
      rank: 4,
      name: 'Concurrent C',
      projectsWon: 33,
      successRate: 55,
      averageBudget: '950 000 €',
      trend: 'stable',
      highlight: false,
    },
    {
      id: 'comp-4',
      rank: 5,
      name: 'Concurrent D',
      projectsWon: 29,
      successRate: 52,
      averageBudget: '760 000 €',
      trend: 'up',
      highlight: false,
    },
    {
      id: 'comp-5',
      rank: 6,
      name: 'Concurrent E',
      projectsWon: 27,
      successRate: 48,
      averageBudget: '690 000 €',
      trend: 'down',
      highlight: false,
    },
    {
      id: 'comp-6',
      rank: 7,
      name: 'Concurrent F',
      projectsWon: 24,
      successRate: 45,
      averageBudget: '830 000 €',
      trend: 'stable',
      highlight: false,
    },
    {
      id: 'comp-7',
      rank: 8,
      name: 'Concurrent G',
      projectsWon: 21,
      successRate: 42,
      averageBudget: '720 000 €',
      trend: 'down',
      highlight: false,
    },
    {
      id: 'comp-8',
      rank: 9,
      name: 'Concurrent H',
      projectsWon: 19,
      successRate: 38,
      averageBudget: '680 000 €',
      trend: 'down',
      highlight: false,
    },
    {
      id: 'comp-9',
      rank: 10,
      name: 'Concurrent I',
      projectsWon: 17,
      successRate: 35,
      averageBudget: '590 000 €',
      trend: 'up',
      highlight: false,
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Rang</TableHead>
            <TableHead>Entreprise</TableHead>
            <TableHead className="text-right">Projets remportés</TableHead>
            <TableHead className="text-right">Taux de réussite</TableHead>
            <TableHead className="text-right">Budget moyen</TableHead>
            <TableHead className="text-right">Tendance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competitors.map((competitor) => (
            <TableRow key={competitor.id} className={competitor.highlight ? "bg-primary/5" : ""}>
              <TableCell className="font-medium">{competitor.rank}</TableCell>
              <TableCell>
                {competitor.name}
                {competitor.highlight && (
                  <Badge variant="outline" className="ml-2 bg-primary/10">
                    Vous
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">{competitor.projectsWon}</TableCell>
              <TableCell className="text-right">{competitor.successRate}%</TableCell>
              <TableCell className="text-right">{competitor.averageBudget}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end">
                  {getTrendIcon(competitor.trend)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompetitorRankingTable;
