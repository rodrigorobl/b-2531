
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Quote {
  id: string;
  companyName: string;
  totalAmount: number;
  lineItems: {
    id: string;
    designation: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
  }[];
}

// Données fictives pour la démonstration
const MOCK_QUOTES: Quote[] = [
  {
    id: 'quote-001',
    companyName: 'BTP Construction',
    totalAmount: 850000,
    lineItems: [
      { id: 'line-001', designation: 'Fondations spéciales', quantity: 1200, unit: 'm²', unitPrice: 250, totalPrice: 300000 },
      { id: 'line-002', designation: 'Dalle béton RDC', quantity: 800, unit: 'm²', unitPrice: 180, totalPrice: 144000 },
      { id: 'line-003', designation: 'Structure béton armé', quantity: 950, unit: 'm³', unitPrice: 320, totalPrice: 304000 },
      { id: 'line-004', designation: 'Coffrage', quantity: 2500, unit: 'm²', unitPrice: 40, totalPrice: 100000 },
    ]
  },
  {
    id: 'quote-002',
    companyName: 'Constructions Martin',
    totalAmount: 920000,
    lineItems: [
      { id: 'line-001', designation: 'Fondations spéciales', quantity: 1200, unit: 'm²', unitPrice: 280, totalPrice: 336000 },
      { id: 'line-002', designation: 'Dalle béton RDC', quantity: 800, unit: 'm²', unitPrice: 190, totalPrice: 152000 },
      { id: 'line-003', designation: 'Structure béton armé', quantity: 950, unit: 'm³', unitPrice: 315, totalPrice: 299250 },
      { id: 'line-004', designation: 'Coffrage', quantity: 2500, unit: 'm²', unitPrice: 45, totalPrice: 112500 },
    ]
  },
  {
    id: 'quote-003',
    companyName: 'Bouygues Bâtiment',
    totalAmount: 780000,
    lineItems: [
      { id: 'line-001', designation: 'Fondations spéciales', quantity: 1000, unit: 'm²', unitPrice: 240, totalPrice: 240000 },
      { id: 'line-002', designation: 'Dalle béton RDC', quantity: 800, unit: 'm²', unitPrice: 175, totalPrice: 140000 },
      { id: 'line-003', designation: 'Structure béton armé', quantity: 920, unit: 'm³', unitPrice: 310, totalPrice: 285200 },
      { id: 'line-004', designation: 'Coffrage', quantity: 2400, unit: 'm²', unitPrice: 42, totalPrice: 100800 },
    ]
  }
];

interface QuoteComparisonViewProps {
  quoteId: string;
}

export default function QuoteComparisonView({ quoteId }: QuoteComparisonViewProps) {
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([quoteId, MOCK_QUOTES[1].id]);
  
  // Fonction pour formater les montants en euros
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };
  
  // Fonction pour formater les écarts en pourcentage
  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };
  
  // Filtrer les devis sélectionnés
  const quotesToCompare = MOCK_QUOTES.filter(quote => selectedQuotes.includes(quote.id));
  
  // Fusionner les postes de tous les devis pour avoir une liste complète
  const allLineItems = Array.from(new Set(
    quotesToCompare.flatMap(quote => quote.lineItems.map(item => item.designation))
  ));
  
  // Trouver le devis de référence (le premier sélectionné)
  const referenceQuote = quotesToCompare[0];

  // Fonction pour obtenir l'écart en pourcentage
  const getPercentageDifference = (value: number, reference: number) => {
    if (reference === 0) return 0;
    return ((value - reference) / reference) * 100;
  };
  
  // Fonction pour obtenir l'icône de tendance
  const getTrendIcon = (diff: number) => {
    if (diff === 0) return <Minus className="h-4 w-4 text-gray-500" />;
    if (diff > 0) return <TrendingUp className="h-4 w-4 text-red-500" />;
    return <TrendingDown className="h-4 w-4 text-green-500" />;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Comparaison des devis</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">Devis 1 (référence)</label>
            <Select
              value={selectedQuotes[0]}
              onValueChange={(value) => setSelectedQuotes([value, selectedQuotes[1]])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MOCK_QUOTES.map(quote => (
                  <SelectItem key={quote.id} value={quote.id}>
                    {quote.companyName} - {formatCurrency(quote.totalAmount)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">Devis 2</label>
            <Select
              value={selectedQuotes[1]}
              onValueChange={(value) => setSelectedQuotes([selectedQuotes[0], value])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MOCK_QUOTES.map(quote => (
                  <SelectItem key={quote.id} value={quote.id}>
                    {quote.companyName} - {formatCurrency(quote.totalAmount)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Désignation</TableHead>
                <TableHead className="text-right min-w-[150px]">
                  {quotesToCompare[0]?.companyName}
                </TableHead>
                <TableHead className="text-right min-w-[150px]">
                  {quotesToCompare[1]?.companyName}
                </TableHead>
                <TableHead className="text-right min-w-[100px]">Écart</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allLineItems.map(designation => {
                const item1 = quotesToCompare[0]?.lineItems.find(item => item.designation === designation);
                const item2 = quotesToCompare[1]?.lineItems.find(item => item.designation === designation);
                
                const price1 = item1?.totalPrice || 0;
                const price2 = item2?.totalPrice || 0;
                const diff = getPercentageDifference(price2, price1);
                
                return (
                  <TableRow key={designation}>
                    <TableCell>{designation}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(price1)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(price2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {getTrendIcon(diff)}
                        <span className={diff === 0 ? 'text-gray-500' : diff > 0 ? 'text-red-500' : 'text-green-500'}>
                          {formatPercentage(diff)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="font-bold">
                <TableCell>TOTAL</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(quotesToCompare[0]?.totalAmount || 0)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(quotesToCompare[1]?.totalAmount || 0)}
                </TableCell>
                <TableCell className="text-right">
                  {quotesToCompare.length === 2 && (
                    <div className="flex items-center justify-end space-x-1">
                      {getTrendIcon(getPercentageDifference(
                        quotesToCompare[1]?.totalAmount || 0, 
                        quotesToCompare[0]?.totalAmount || 0
                      ))}
                      <span className={`font-bold ${
                        quotesToCompare[1]?.totalAmount > quotesToCompare[0]?.totalAmount
                          ? 'text-red-500'
                          : quotesToCompare[1]?.totalAmount < quotesToCompare[0]?.totalAmount
                          ? 'text-green-500'
                          : 'text-gray-500'
                      }`}>
                        {formatPercentage(getPercentageDifference(
                          quotesToCompare[1]?.totalAmount || 0, 
                          quotesToCompare[0]?.totalAmount || 0
                        ))}
                      </span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button variant="outline">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Exporter la comparaison
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
