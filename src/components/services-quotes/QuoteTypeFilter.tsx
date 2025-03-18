
import React from 'react';
import { ExternalLink, SendIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Quote } from '@/types/services-quotes';

interface QuoteTypeFilterProps {
  quoteTypeFilter: 'all' | 'requested' | 'voluntary';
  setQuoteTypeFilter: (type: 'all' | 'requested' | 'voluntary') => void;
  quotes: Quote[];
}

export function QuoteTypeFilter({ quoteTypeFilter, setQuoteTypeFilter, quotes }: QuoteTypeFilterProps) {
  return (
    <div className="inline-flex p-1 rounded-md bg-muted">
      <Button 
        variant={quoteTypeFilter === 'all' ? 'default' : 'ghost'} 
        size="sm" 
        onClick={() => setQuoteTypeFilter('all')}
        className="relative flex-1"
      >
        Tous les devis
      </Button>
      <Button 
        variant={quoteTypeFilter === 'requested' ? 'default' : 'ghost'} 
        size="sm" 
        onClick={() => setQuoteTypeFilter('requested')}
        className="relative flex-1"
      >
        <ExternalLink size={14} className="mr-1" />
        Sur demande
        <Badge variant="outline" className="ml-2 bg-blue-50 hover:bg-blue-50">
          {quotes.filter(q => !q.isVoluntary).length}
        </Badge>
      </Button>
      <Button 
        variant={quoteTypeFilter === 'voluntary' ? 'default' : 'ghost'} 
        size="sm" 
        onClick={() => setQuoteTypeFilter('voluntary')}
        className="relative flex-1"
      >
        <SendIcon size={14} className="mr-1" />
        Démarchage actif
        <Badge variant="outline" className="ml-2 bg-emerald-50 hover:bg-emerald-50">
          {quotes.filter(q => q.isVoluntary).length}
        </Badge>
      </Button>
    </div>
  );
}
