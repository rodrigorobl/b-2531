
import { TenderStatus } from '@/types/tenders';

/**
 * Utility functions for mapping tender statuses
 */

export function mapStatus(status: string | null): TenderStatus {
  if (!status) return 'open';
  
  switch (status.toLowerCase()) {
    case 'ouvert':
      return 'open';
    case 'clôturé':
      return 'closed';
    case 'attribué':
      return 'assigned';
    default:
      return 'open';
  }
}

export function mapLotStatus(status: string | null): 'open' | 'assigned' {
  if (!status) return 'open';
  
  switch (status.toLowerCase()) {
    case 'assigned':
    case 'attribué':
      return 'assigned';
    default:
      return 'open';
  }
}

// Random helpers for demo purposes (will be used until real data is available)
export function getRandomQuoteQuality(): 'poor' | 'medium' | 'good' {
  const qualities = ['poor', 'medium', 'good'];
  return qualities[Math.floor(Math.random() * qualities.length)] as 'poor' | 'medium' | 'good';
}

export function getRandomBudgetRespect(): 'under' | 'on-target' | 'over' {
  const budgetRespects = ['under', 'on-target', 'over'];
  return budgetRespects[Math.floor(Math.random() * budgetRespects.length)] as 'under' | 'on-target' | 'over';
}
