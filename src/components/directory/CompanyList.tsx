
import React from 'react';
import { Company, CompanyCategory } from '@/types/directory';
import CompanyCard from './CompanyCard';
import CompanyDetailDialog from './CompanyDetailDialog';
import CompanyListStatus from './CompanyListStatus';
import useCompanyDirectory from '@/hooks/useCompanyDirectory';

interface CompanyListProps {
  companies: Company[];
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  searchQuery?: string;
  selectedCategory?: CompanyCategory | null;
}

export default function CompanyList({
  selectedCompany,
  setSelectedCompany,
  searchQuery = '',
  selectedCategory = null
}: CompanyListProps) {
  const [showDetail, setShowDetail] = React.useState(false);
  
  const { companies, loading, error } = useCompanyDirectory({
    searchQuery,
    selectedCategory
  });

  const handleShowDetail = (company: Company) => {
    setSelectedCompany(company);
    setShowDetail(true);
  };

  // Show loading or error states
  if (loading || error) {
    return <CompanyListStatus loading={loading} error={error} />;
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">
          {companies.length} entreprise{companies.length !== 1 ? 's' : ''} trouvée{companies.length !== 1 ? 's' : ''}
        </h2>
      </div>
      
      <div className="space-y-4">
        {companies.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Aucune entreprise ne correspond à vos critères
          </div>
        ) : (
          companies.map((company) => (
            <CompanyCard 
              key={company.id} 
              company={company} 
              onShowDetail={handleShowDetail} 
            />
          ))
        )}
      </div>
      
      {selectedCompany && (
        <CompanyDetailDialog 
          company={selectedCompany} 
          open={showDetail} 
          onOpenChange={setShowDetail} 
        />
      )}
    </div>
  );
}
