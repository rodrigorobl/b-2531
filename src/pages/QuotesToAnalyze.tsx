
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { ArrowUpDown, Calendar, FileText, User, Building, Clock, Check, X, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mock data for quotes to analyze
const MOCK_QUOTES = [
  {
    id: 'q1',
    projectId: 'p1',
    projectName: 'Résidence Les Ormes',
    lotId: 'l1',
    lotName: 'Gros œuvre',
    companyId: 'c1',
    companyName: 'Entreprise Durand Construction',
    submissionDate: '2024-05-10',
    amount: 125000,
    status: 'to-analyze' as const
  },
  {
    id: 'q2',
    projectId: 'p1',
    projectName: 'Résidence Les Ormes',
    lotId: 'l2',
    lotName: 'Électricité',
    companyId: 'c2',
    companyName: 'Électricité Moderne',
    submissionDate: '2024-05-11',
    amount: 45000,
    status: 'in-progress' as const
  },
  {
    id: 'q3',
    projectId: 'p2',
    projectName: 'Immeuble de Bureaux Horizon',
    lotId: 'l3',
    lotName: 'Plomberie',
    companyId: 'c3',
    companyName: 'Plomberie Martin',
    submissionDate: '2024-05-09',
    amount: 32500,
    status: 'compliant' as const
  },
  {
    id: 'q4',
    projectId: 'p2',
    projectName: 'Immeuble de Bureaux Horizon',
    lotId: 'l4',
    lotName: 'Menuiserie',
    companyId: 'c4',
    companyName: 'Menuiserie Dubois',
    submissionDate: '2024-05-08',
    amount: 58200,
    status: 'non-compliant' as const
  },
];

type QuoteStatus = 'to-analyze' | 'in-progress' | 'compliant' | 'non-compliant';

interface Quote {
  id: string;
  projectId: string;
  projectName: string;
  lotId: string;
  lotName: string;
  companyId: string;
  companyName: string;
  submissionDate: string;
  amount: number;
  status: QuoteStatus;
}

export default function QuotesToAnalyze() {
  const [quotes, setQuotes] = useState<Quote[]>(MOCK_QUOTES);
  const [sortField, setSortField] = useState<string>('submissionDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState<QuoteStatus | 'all'>('all');

  // Sort quotes based on current sort configuration
  const sortedQuotes = [...quotes].sort((a, b) => {
    if (sortField === 'submissionDate') {
      const dateA = new Date(a.submissionDate).getTime();
      const dateB = new Date(b.submissionDate).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortField === 'amount') {
      return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortField === 'projectName') {
      return sortDirection === 'asc' 
        ? a.projectName.localeCompare(b.projectName) 
        : b.projectName.localeCompare(a.projectName);
    }
    return 0;
  });

  // Filter quotes based on current filter
  const filteredQuotes = filter === 'all' 
    ? sortedQuotes 
    : sortedQuotes.filter(quote => quote.status === filter);

  // Handle sort toggle
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Format date string to French locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  // Format amount to French locale with Euro currency
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  // Render status badge based on quote status
  const renderStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'to-analyze':
        return (
          <Badge className="bg-amber-500 flex items-center gap-1">
            <Clock size={12} /> À analyser
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-blue-500 flex items-center gap-1">
            <User size={12} /> Analyse en cours
          </Badge>
        );
      case 'compliant':
        return (
          <Badge className="bg-green-500 flex items-center gap-1">
            <Check size={12} /> Conforme
          </Badge>
        );
      case 'non-compliant':
        return (
          <Badge className="bg-red-500 flex items-center gap-1">
            <X size={12} /> Non conforme
          </Badge>
        );
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Devis à analyser</h1>
          <div className="flex gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              onClick={() => setFilter('all')}
              size="sm"
            >
              Tous
            </Button>
            <Button 
              variant={filter === 'to-analyze' ? 'default' : 'outline'} 
              onClick={() => setFilter('to-analyze')}
              size="sm"
            >
              À analyser
            </Button>
            <Button 
              variant={filter === 'in-progress' ? 'default' : 'outline'} 
              onClick={() => setFilter('in-progress')}
              size="sm"
            >
              En cours
            </Button>
            <Button 
              variant={filter === 'compliant' ? 'default' : 'outline'} 
              onClick={() => setFilter('compliant')}
              size="sm"
            >
              Conformes
            </Button>
            <Button 
              variant={filter === 'non-compliant' ? 'default' : 'outline'} 
              onClick={() => setFilter('non-compliant')}
              size="sm"
            >
              Non conformes
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Liste des devis</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('projectName')}>
                    <div className="flex items-center gap-1">
                      Projet
                      {sortField === 'projectName' && (
                        <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Lot</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Building size={14} className="mr-1" />
                      Entreprise
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('submissionDate')}>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="mr-1" />
                      Date du devis
                      {sortField === 'submissionDate' && (
                        <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('amount')}>
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} className="mr-1" />
                      Montant
                      {sortField === 'amount' && (
                        <ArrowUpDown size={14} className={sortDirection === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      Aucun devis ne correspond à vos critères
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQuotes.map((quote) => (
                    <TableRow key={quote.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium">{quote.projectName}</div>
                      </TableCell>
                      <TableCell>{quote.lotName}</TableCell>
                      <TableCell>{quote.companyName}</TableCell>
                      <TableCell>{formatDate(quote.submissionDate)}</TableCell>
                      <TableCell className="font-medium">{formatAmount(quote.amount)}</TableCell>
                      <TableCell>{renderStatusBadge(quote.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/quote/${quote.id}`}>
                            <FileText size={14} className="mr-1" />
                            Voir le devis
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
