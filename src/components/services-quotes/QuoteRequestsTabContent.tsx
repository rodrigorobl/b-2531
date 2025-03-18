
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QuoteRequest } from '@/types/services-quotes';
import { QuoteRequestsList } from './QuoteRequestsList';

interface QuoteRequestsTabContentProps {
  requests: QuoteRequest[];
}

export function QuoteRequestsTabContent({ requests }: QuoteRequestsTabContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Demandes de devis</CardTitle>
        <CardDescription>
          Consultez et répondez aux demandes de devis pour vos services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <QuoteRequestsList requests={requests} />
      </CardContent>
    </Card>
  );
}
