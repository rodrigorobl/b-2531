
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Quote, QuoteRequest } from '@/types/services-quotes';
import { QuoteManagementHeader } from '@/components/services-quotes/QuoteManagementHeader';
import { QuoteSearchBar } from '@/components/services-quotes/QuoteSearchBar';
import { mockQuoteRequests, mockQuotes } from '@/components/services-quotes/mock-data';
import { QuotesTabContent } from '@/components/services-quotes/QuotesTabContent';

export default function ServicesQuoteManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRequests, setFilteredRequests] = useState<QuoteRequest[]>(mockQuoteRequests);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(mockQuotes);

  // Handle search and filtering
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term) {
      setFilteredRequests(mockQuoteRequests.filter(request => 
        request.projectName.toLowerCase().includes(term) || 
        request.serviceName.toLowerCase().includes(term) ||
        request.requesterName.toLowerCase().includes(term)
      ));
      
      setFilteredQuotes(mockQuotes.filter(quote => 
        quote.projectName.toLowerCase().includes(term) || 
        quote.serviceName.toLowerCase().includes(term) ||
        quote.recipientName.toLowerCase().includes(term)
      ));
    } else {
      setFilteredRequests(mockQuoteRequests);
      setFilteredQuotes(mockQuotes);
    }
  };

  // Handle export functionality
  const handleExportPDF = () => {
    console.log('Exporting as PDF...');
    // Implementation would be added here
  };

  const handleExportXLS = () => {
    console.log('Exporting as XLS...');
    // Implementation would be added here
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <QuoteManagementHeader 
          onExportPDF={handleExportPDF} 
          onExportXLS={handleExportXLS} 
        />

        <QuoteSearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
        />

        <QuotesTabContent filteredQuotes={filteredQuotes} />
      </div>
    </Layout>
  );
}
