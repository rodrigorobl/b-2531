
export interface ProjectData {
  id: string;
  nom: string;
  description: string;
  type_projet: string;
  localisation: string | null;
  budget_estime: number | null;
  statut: 'En cours' | 'Clôturé' | 'Attribué';
  date_debut: string | null;
  date_fin: string | null;
  maitre_ouvrage_id: string;
  maitre_ouvrage_nom?: string;
  progress_percentage?: number;
}

export interface TenderData {
  id: string;
  lot: string;
  description: string;
  type_appel_offre: string;
  statut: 'Ouvert' | 'Clôturé' | 'Attribué';
  date_limite: string;
  budget: number | null;
  quotes_received: number | null;
  progress: number | null;
  lots_total: number | null;
  lots_assigned: number | null;
  projet_id?: string;
}

export interface QuoteData {
  id: string;
  montant: number;
  date_soumission: string | null;
  statut: string | null;
  entreprise_id: string;
  entreprise_nom?: string;
  document_url: string | null;
  appel_offre_id?: string;
}
