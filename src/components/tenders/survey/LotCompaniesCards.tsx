
import React from 'react';
import { Separator } from '@/components/ui/separator';
import CompanyCard from './CompanyCard';

interface Company {
  id: string;
  name: string;
  status: 'invited' | 'submitted' | 'declined';
  quoteAmount?: number;
  analysisStatus?: 'not-analyzed' | 'compliant' | 'non-compliant';
}

interface Lot {
  id: string;
  name: string;
  description: string;
  companies: Company[];
}

interface LotCompaniesCardsProps {
  lot: Lot;
}

const LotCompaniesCards: React.FC<LotCompaniesCardsProps> = ({ lot }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{lot.name}</h3>
        <p className="text-sm text-muted-foreground">{lot.description}</p>
      </div>
      
      <div className="flex flex-nowrap gap-4 overflow-x-auto pb-4">
        {lot.companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
      
      <Separator />
    </div>
  );
};

export default LotCompaniesCards;
