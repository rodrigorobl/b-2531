
import { TenderSearchResult } from '@/types/tenders';

export function filterTenders(
  tenders: TenderSearchResult[],
  searchQuery: string,
  selectedTab: string
): TenderSearchResult[] {
  return tenders.filter(tender => {
    if (selectedTab !== 'all' && tender.status !== selectedTab) return false;
    
    if (searchQuery && 
        !tender.projectName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tender.projectType.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tender.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tender.lots.some(lot => lot.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    return true;
  });
}
