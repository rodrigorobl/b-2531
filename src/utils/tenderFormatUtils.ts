
/**
 * Utility functions for formatting tender data
 */

export function formatBudget(budget: number | null): string {
  if (!budget) return 'Non spécifié';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(budget);
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return 'Non spécifié';
  
  // Handle different date formats
  let date;
  if (dateString.includes('T')) {
    // ISO format
    date = new Date(dateString);
  } else {
    // Simple date string
    const parts = dateString.split('-');
    date = new Date(
      parseInt(parts[0]), 
      parseInt(parts[1]) - 1, 
      parseInt(parts[2])
    );
  }
  
  return date.toLocaleDateString('fr-FR');
}
