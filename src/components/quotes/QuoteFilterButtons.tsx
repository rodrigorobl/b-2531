
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuoteFilterButtonsProps {
  filter: 'all' | 'to-analyze' | 'in-progress' | 'compliant' | 'non-compliant';
  setFilter: (filter: 'all' | 'to-analyze' | 'in-progress' | 'compliant' | 'non-compliant') => void;
}

export const QuoteFilterButtons = ({ filter, setFilter }: QuoteFilterButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
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
  );
};
