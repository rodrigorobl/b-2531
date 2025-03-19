
import React, { useState } from 'react';
import { ServiceTenderSearchResult } from '@/pages/ServicesTenderSearch';
import ServicesTenderViewModeSelector from './ServicesTenderViewModeSelector';
import ServicesTenderFilterSortMenu from './ServicesTenderFilterSortMenu';
import ServicesTenderGridView from './ServicesTenderGridView';
import ServicesTenderListView from './ServicesTenderListView';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface ServicesTenderResultsProps {
  tenders: ServiceTenderSearchResult[];
  onSelectTender: (tenderId: string) => void;
  selectedTenderId: string | null;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export default function ServicesTenderResults({
  tenders,
  onSelectTender,
  selectedTenderId,
  viewMode,
  onViewModeChange
}: ServicesTenderResultsProps) {
  const [sortBy, setSortBy] = useState<'date' | 'budget' | 'location' | 'relevance'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Calculate total pages
  const totalPages = Math.ceil(tenders.length / itemsPerPage);
  
  // Get current tenders
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTenders = tenders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm mr-4 overflow-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          {tenders.length} appels d'offres trouvés
        </div>
        
        <div className="flex items-center gap-2">
          <ServicesTenderViewModeSelector 
            viewMode={viewMode} 
            onViewModeChange={onViewModeChange} 
          />
          
          <ServicesTenderFilterSortMenu
            sortBy={sortBy}
            sortDirection={sortDirection}
            setSortBy={setSortBy}
            setSortDirection={setSortDirection}
          />
        </div>
      </div>

      {viewMode === 'grid' ? (
        <ServicesTenderGridView 
          tenders={currentTenders} 
          selectedTenderId={selectedTenderId} 
          onSelectTender={onSelectTender} 
        />
      ) : (
        <ServicesTenderListView 
          tenders={currentTenders} 
          selectedTenderId={selectedTenderId} 
          onSelectTender={onSelectTender} 
        />
      )}
      
      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(index + 1);
                    }}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
