
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import LotCompaniesCards from '@/components/tenders/survey/LotCompaniesCards';

interface Company {
  id: string;
  name: string;
  status: 'invited' | 'submitted' | 'declined';
  quoteAmount?: number;
  analysisStatus?: 'not-analyzed' | 'compliant' | 'non-compliant';
}

interface Category {
  id: string;
  name: string;
  description?: string;
  companies?: Company[];
  quotes: {
    id: string;
    companyName: string;
    submissionDate: string;
    isCompliant: boolean;
    price: number;
    comments: string;
    status: 'pending' | 'approved' | 'rejected';
  }[];
}

interface TenderTrackingTabProps {
  categories: Category[];
}

export function TenderTrackingTab({ categories }: TenderTrackingTabProps) {
  // Convert categories to the format expected by LotCompaniesCards
  const lots = categories.map(category => {
    // Extract companies from quotes data
    const companies: Company[] = category.quotes.map(quote => ({
      id: quote.id,
      name: quote.companyName,
      status: 'submitted',
      quoteAmount: quote.price,
      analysisStatus: quote.isCompliant ? 'compliant' : 'non-compliant'
    }));

    // Add additional companies if they exist in the category
    if (category.companies) {
      companies.push(...category.companies);
    }

    return {
      id: category.id,
      name: category.name,
      description: category.description || `Description du lot ${category.name}`,
      companies: companies
    };
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-8">
            {lots.map((lot) => (
              <LotCompaniesCards key={lot.id} lot={lot} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
