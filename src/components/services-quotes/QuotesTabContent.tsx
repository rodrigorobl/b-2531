
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote } from '@/types/services-quotes';
import { QuotesList } from './QuotesList';

interface QuotesTabContentProps {
  filteredQuotes: Quote[];
}

export function QuotesTabContent({ filteredQuotes }: QuotesTabContentProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Devis envoyés</CardTitle>
          <CardDescription>
            Suivez l'état de vos devis envoyés, qu'ils soient en réponse à une demande ou envoyés spontanément
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <QuotesList quotes={filteredQuotes} />
      </CardContent>
    </Card>
  );
}
