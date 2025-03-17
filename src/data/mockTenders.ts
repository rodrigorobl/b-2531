
import { TenderSearchResult } from '@/types/tenders';

export const mockTenders: TenderSearchResult[] = [
  {
    id: "search-001",
    projectName: "Centre Commercial Riviera",
    projectType: "Commercial",
    location: "Paris",
    budget: "2 500 000 €",
    surface: "15 000 m²",
    deadline: "30/08/2023",
    status: "open",
    client: {
      name: "Unibail-Rodamco",
      logo: ""
    },
    lots: ["Gros œuvre", "Menuiseries", "Électricité", "CVC"],
    isFavorite: false,
    createdAt: "01/07/2023",
    description: "Construction d'un nouveau centre commercial sur 3 niveaux avec parking souterrain et espaces verts en toiture terrasse."
  },
  {
    id: "search-002",
    projectName: "Résidence Les Ormes",
    projectType: "Logement",
    location: "Lyon",
    budget: "1 200 000 €",
    surface: "3 500 m²",
    deadline: "15/09/2023",
    status: "open",
    client: {
      name: "Nexity",
      logo: ""
    },
    lots: ["Second œuvre", "Plomberie", "Peinture"],
    isFavorite: true,
    createdAt: "15/07/2023",
    description: "Ensemble résidentiel de 45 logements avec jardin partagé et local à vélos."
  },
  {
    id: "search-003",
    projectName: "Tour Horizon",
    projectType: "Tertiaire",
    location: "Nantes",
    budget: "8 000 000 €",
    surface: "25 000 m²",
    deadline: "10/08/2023",
    status: "closed",
    client: {
      name: "BNP Paribas Real Estate",
      logo: ""
    },
    lots: ["Façades", "Ascenseurs", "Sécurité incendie"],
    isFavorite: false,
    createdAt: "01/06/2023",
    description: "Immeuble de bureaux de grande hauteur avec certification environnementale HQE."
  },
  {
    id: "search-004",
    projectName: "École Jean Jaurès",
    projectType: "Public",
    location: "Marseille",
    budget: "950 000 €",
    surface: "2 800 m²",
    deadline: "25/07/2023",
    status: "assigned",
    client: {
      name: "Ville de Marseille",
      logo: ""
    },
    lots: ["Rénovation thermique", "Espaces extérieurs"],
    isFavorite: false,
    createdAt: "15/05/2023",
    description: "Rénovation énergétique d'un groupe scolaire avec mise aux normes d'accessibilité."
  },
  {
    id: "search-005",
    projectName: "Hôtel Bellevue",
    projectType: "Hôtellerie",
    location: "Nice",
    budget: "3 500 000 €",
    surface: "8 200 m²",
    deadline: "05/09/2023",
    status: "open",
    client: {
      name: "Groupe Accor",
      logo: ""
    },
    lots: ["Gros œuvre", "Décoration", "Piscine", "Façades"],
    isFavorite: true,
    createdAt: "10/07/2023",
    description: "Rénovation complète d'un hôtel de luxe en front de mer."
  }
];
