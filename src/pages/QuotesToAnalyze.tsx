
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuoteFilterButtons } from '@/components/quotes/QuoteFilterButtons';
import { QuoteAdvancedFilters } from '@/components/quotes/QuoteAdvancedFilters';
import { QuotesTable, Quote, QuoteStatus } from '@/components/quotes/QuotesTable';
import type { UrgencyLevel } from '@/components/quotes/QuotesTable';

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
    status: 'to-analyze' as const,
    dueDate: '2024-05-25',
    urgency: 'high' as const
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
    status: 'in-progress' as const,
    dueDate: '2024-05-30',
    urgency: 'medium' as const
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
    status: 'compliant' as const,
    dueDate: '2024-05-20',
    urgency: 'low' as const
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
    status: 'non-compliant' as const,
    dueDate: '2024-05-15',
    urgency: 'high' as const
  },
  {
    id: 'q5',
    projectId: 'p3',
    projectName: 'Centre Commercial Étoile',
    lotId: 'l5',
    lotName: 'Peinture',
    companyId: 'c5',
    companyName: 'Peintures Leroy',
    submissionDate: '2024-05-12',
    amount: 18700,
    status: 'to-analyze' as const,
    dueDate: '2024-05-27',
    urgency: 'medium' as const
  },
  {
    id: 'q6',
    projectId: 'p3',
    projectName: 'Centre Commercial Étoile',
    lotId: 'l6',
    lotName: 'Revêtement de sols',
    companyId: 'c6',
    companyName: 'Carrelages & Sols Pro',
    submissionDate: '2024-05-07',
    amount: 42000,
    status: 'to-analyze' as const,
    dueDate: '2024-05-14',
    urgency: 'high' as const
  },
];

export default function QuotesToAnalyze() {
  const [quotes, setQuotes] = useState<Quote[]>(MOCK_QUOTES);
  const [sortField, setSortField] = useState<string>('submissionDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState<QuoteStatus | 'all'>('all');
  const [filterProject, setFilterProject] = useState<string>('all');
  const [filterLot, setFilterLot] = useState<string>('all');
  const [filterUrgency, setFilterUrgency] = useState<UrgencyLevel | 'all'>('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [classificationComment, setClassificationComment] = useState<string>('');

  // Get unique projects and lots for filtering
  const projectOptions = Array.from(new Set(quotes.map(quote => quote.projectName)));
  const lotOptions = Array.from(new Set(quotes.map(quote => quote.lotName)));

  // Sort quotes based on current sort configuration
  const sortedQuotes = [...quotes].sort((a, b) => {
    if (sortField === 'submissionDate') {
      const dateA = new Date(a.submissionDate).getTime();
      const dateB = new Date(b.submissionDate).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortField === 'dueDate') {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortField === 'amount') {
      return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortField === 'projectName') {
      return sortDirection === 'asc' 
        ? a.projectName.localeCompare(b.projectName) 
        : b.projectName.localeCompare(a.projectName);
    } else if (sortField === 'urgency') {
      const urgencyValues = { 'low': 0, 'medium': 1, 'high': 2 };
      return sortDirection === 'asc' 
        ? urgencyValues[a.urgency] - urgencyValues[b.urgency] 
        : urgencyValues[b.urgency] - urgencyValues[a.urgency];
    }
    return 0;
  });

  // Filter quotes based on all criteria
  const filteredQuotes = sortedQuotes.filter(quote => {
    const statusMatch = filter === 'all' || quote.status === filter;
    const projectMatch = filterProject === 'all' || quote.projectName === filterProject;
    const lotMatch = filterLot === 'all' || quote.lotName === filterLot;
    const urgencyMatch = filterUrgency === 'all' || quote.urgency === filterUrgency;
    
    return statusMatch && projectMatch && lotMatch && urgencyMatch;
  });

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

  // Update quote status
  const updateQuoteStatus = (quoteId: string, newStatus: QuoteStatus) => {
    setQuotes(prevQuotes => 
      prevQuotes.map(quote => 
        quote.id === quoteId 
          ? { ...quote, status: newStatus } 
          : quote
      )
    );
    setSelectedQuote(null);
    setClassificationComment('');
  };

  // Reset all filters
  const resetFilters = () => {
    setFilter('all');
    setFilterProject('all');
    setFilterLot('all');
    setFilterUrgency('all');
  };

  // Share quote analysis (mock function)
  const shareQuoteAnalysis = (quoteId: string) => {
    alert(`Partage de l'analyse du devis ${quoteId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="mr-2" asChild>
            <Link to="/dashboard-bet">
              <ArrowLeft size={18} />
              <span className="ml-1">Retour</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Devis à analyser</h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <QuoteFilterButtons 
            filter={filter}
            setFilter={setFilter}
          />
          
          <div className="flex gap-2">
            <QuoteAdvancedFilters 
              projectOptions={projectOptions}
              lotOptions={lotOptions}
              filterProject={filterProject}
              setFilterProject={setFilterProject}
              filterLot={filterLot}
              setFilterLot={setFilterLot}
              filterUrgency={filterUrgency}
              setFilterUrgency={setFilterUrgency}
              resetFilters={resetFilters}
            />
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Liste des devis</span>
              <span className="text-sm font-normal">
                {filteredQuotes.length} {filteredQuotes.length > 1 ? 'devis trouvés' : 'devis trouvé'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QuotesTable 
              quotes={filteredQuotes}
              handleSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
              formatDate={formatDate}
              formatAmount={formatAmount}
              updateQuoteStatus={updateQuoteStatus}
              shareQuoteAnalysis={shareQuoteAnalysis}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
