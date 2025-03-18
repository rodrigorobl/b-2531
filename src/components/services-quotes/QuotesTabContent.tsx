
import React from 'react';
import { ExternalLink, SendIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote } from '@/types/services-quotes';
import { QuotesList } from './QuotesList';
import { QuoteTypeFilter } from './QuoteTypeFilter';

interface QuotesTabContentProps {
  quotes: Quote[];
  quoteTypeFilter: 'all' | 'requested' | 'voluntary';
  setQuoteTypeFilter: (type: 'all' | 'requested' | 'voluntary') => void;
  filteredQuotes: Quote[];
}

export function QuotesTabContent({ 
  quotes, 
  quoteTypeFilter, 
  setQuoteTypeFilter, 
  filteredQuotes 
}: QuotesTabContentProps) {
  // Filter quotes by type (requested or voluntary)
  const getFilteredQuotesByType = () => {
    if (quoteTypeFilter === 'all') return filteredQuotes;
    return filteredQuotes.filter(quote => 
      quoteTypeFilter === 'requested' 
        ? !quote.isVoluntary 
        : quote.isVoluntary
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div>
            <CardTitle>Devis envoyés</CardTitle>
            <CardDescription>
              Suivez l'état de vos devis envoyés, qu'ils soient en réponse à une demande ou envoyés spontanément
            </CardDescription>
          </div>
          
          <QuoteTypeFilter 
            quoteTypeFilter={quoteTypeFilter} 
            setQuoteTypeFilter={setQuoteTypeFilter} 
            quotes={quotes} 
          />
        </div>
      </CardHeader>
      <CardContent>
        <QuotesList quotes={getFilteredQuotesByType()} />
      </CardContent>
    </Card>
  );
}
