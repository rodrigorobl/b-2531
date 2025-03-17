
import { TenderSearchResult } from '@/types/tenders';

/**
 * Calculate statistics from tenders data
 */
export function calculateTenderStats(tenders: TenderSearchResult[]) {
  return {
    activeTenders: tenders.filter(t => t.status === 'open').length,
    assignedLots: tenders.reduce((acc, t) => acc + (t.lotsAssigned || 0), 0),
    receivedQuotes: tenders.reduce((acc, t) => acc + (t.actualQuotesReceived || 0), 0),
    averageQuotes: calculateAverageQuotes(tenders),
  };
}

function calculateAverageQuotes(tenders: TenderSearchResult[]): number {
  const totalLots = tenders.reduce((acc, t) => acc + (t.lotsTotal || 0), 0);
  const totalQuotes = tenders.reduce((acc, t) => acc + (t.actualQuotesReceived || 0), 0);
  return totalLots ? parseFloat((totalQuotes / totalLots).toFixed(1)) : 0;
}
