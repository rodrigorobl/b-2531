
import { TenderDetailData } from '@/types/tenderDetail';

export const mockTenderDetail: TenderDetailData = {
  id: "t1",
  name: "Rénovation Immeuble Haussmannien",
  description: "Rénovation complète d'un immeuble Haussmannien situé dans le 8ème arrondissement de Paris. Le projet comprend la réfection de la façade, la modernisation des parties communes et la rénovation des appartements.",
  type: "construction",
  deadline: "2023-12-15",
  status: "open",
  location: "8 Avenue des Champs-Élysées, 75008 Paris",
  initialBudget: 1250000,
  currentTotalQuotes: 980000,
  progressPercentage: 60,
  lots: [
    {
      id: "l1",
      name: "Gros Œuvre",
      description: "Travaux de structure et de maçonnerie",
      isAssigned: true,
      assignedToCompanyId: "c1",
      assignedToCompanyName: "Bouygues Construction",
      budget: 350000,
      quotesCount: 4
    },
    {
      id: "l2",
      name: "Charpente",
      description: "Réfection et consolidation de la charpente existante",
      isAssigned: true,
      assignedToCompanyId: "c3",
      assignedToCompanyName: "Charpentes & Co",
      budget: 180000,
      quotesCount: 3
    },
    {
      id: "l3",
      name: "Électricité",
      description: "Mise aux normes de l'installation électrique",
      isAssigned: true,
      assignedToCompanyId: "c5",
      assignedToCompanyName: "ElectroPro",
      budget: 120000,
      quotesCount: 5
    },
    {
      id: "l4",
      name: "Plomberie",
      description: "Remplacement des canalisations et installation sanitaire",
      isAssigned: false,
      budget: 150000,
      quotesCount: 2
    },
    {
      id: "l5",
      name: "Finitions",
      description: "Travaux de peinture, revêtements de sol et murs",
      isAssigned: false,
      budget: 220000,
      quotesCount: 0
    }
  ],
  quotes: [
    {
      id: "q1",
      lotId: "l1",
      lotName: "Gros Œuvre",
      companyId: "c1",
      companyName: "Bouygues Construction",
      price: 335000,
      submissionDate: "2023-10-05",
      isCompliant: true,
      comments: "Propose de réaliser les travaux en 3 mois. Équipe expérimentée en rénovation haussmannienne.",
      status: 'accepted'
    },
    {
      id: "q2",
      lotId: "l1",
      lotName: "Gros Œuvre",
      companyId: "c2",
      companyName: "Eiffage BTP",
      price: 360000,
      submissionDate: "2023-10-07",
      isCompliant: true,
      comments: "Délai de 4 mois. Propose une solution alternative pour la reprise en sous-œuvre.",
      status: 'rejected'
    },
    {
      id: "q3",
      lotId: "l2",
      lotName: "Charpente",
      companyId: "c3",
      companyName: "Charpentes & Co",
      price: 175000,
      submissionDate: "2023-10-12",
      isCompliant: true,
      comments: "Utilisation de bois traité et certifié. Garantie décennale.",
      status: 'accepted'
    },
    {
      id: "q4",
      lotId: "l3",
      lotName: "Électricité",
      companyId: "c5",
      companyName: "ElectroPro",
      price: 115000,
      submissionDate: "2023-10-15",
      isCompliant: true,
      comments: "Installation électrique aux dernières normes. Propose des solutions d'économie d'énergie.",
      status: 'accepted'
    },
    {
      id: "q5",
      lotId: "l4",
      lotName: "Plomberie",
      companyId: "c6",
      companyName: "PlombExpert",
      price: 155000,
      submissionDate: "2023-10-18",
      isCompliant: false,
      comments: "Dossier incomplet. Manque les spécifications techniques pour les sanitaires.",
      status: 'pending'
    },
    {
      id: "q6",
      lotId: "l4",
      lotName: "Plomberie",
      companyId: "c7",
      companyName: "AquaServices",
      price: 148000,
      submissionDate: "2023-10-20",
      isCompliant: true,
      comments: "Utilisation de matériaux de haute qualité. Garantie 5 ans sur l'installation.",
      status: 'pending'
    },
    {
      id: "q7",
      lotId: "l1",
      lotName: "Gros Œuvre",
      companyId: "c8",
      companyName: "Construction Moderne",
      price: 345000,
      submissionDate: "2023-10-08",
      isCompliant: true,
      comments: "Délai de 3.5 mois. Expertise en bâtiments historiques.",
      status: 'rejected'
    },
    {
      id: "q8",
      lotId: "l1",
      lotName: "Gros Œuvre",
      companyId: "c9",
      companyName: "BâtiPlus",
      price: 352000,
      submissionDate: "2023-10-10",
      isCompliant: true,
      comments: "Propose une technique innovante pour renforcer la structure. Délai de 4 mois.",
      status: 'rejected'
    }
  ],
  documents: [
    {
      id: "d1",
      name: "DCE Complet",
      type: "pdf",
      size: "15.2 MB",
      url: "#"
    },
    {
      id: "d2",
      name: "DPGF Lots",
      type: "xlsx",
      size: "2.4 MB",
      url: "#"
    },
    {
      id: "d3",
      name: "Plans Architecte",
      type: "pdf",
      size: "8.7 MB",
      url: "#"
    },
    {
      id: "d4",
      name: "Cahier des Charges Technique",
      type: "pdf",
      size: "4.1 MB",
      url: "#"
    },
    {
      id: "d5",
      name: "Diagnostics Bâtiment",
      type: "pdf",
      size: "6.3 MB",
      url: "#"
    }
  ],
  messages: [
    {
      id: "m1",
      sender: "Jean Martin",
      senderRole: "Architecte",
      message: "Bonjour, j'ai analysé les devis pour le lot Gros Œuvre. Je recommande l'entreprise Bouygues Construction pour leur expérience en rénovation de bâtiments haussmanniens.",
      timestamp: "2023-10-25T10:30:00"
    },
    {
      id: "m2",
      sender: "Sophie Dubois",
      senderRole: "Maître d'ouvrage",
      message: "Merci pour cette analyse. Pouvez-vous également examiner les propositions pour le lot Charpente ?",
      timestamp: "2023-10-25T14:45:00"
    },
    {
      id: "m3",
      sender: "Jean Martin",
      senderRole: "Architecte",
      message: "Pour la charpente, Charpentes & Co propose la meilleure solution technique avec un prix compétitif. Leur expertise en bâtiments historiques est un atout majeur pour ce projet.",
      timestamp: "2023-10-26T09:15:00"
    },
    {
      id: "m4",
      sender: "Pierre Lefebvre",
      senderRole: "Bureau d'études",
      message: "Concernant le lot Électricité, je valide la proposition d'ElectroPro. Leur solution d'économie d'énergie est particulièrement intéressante pour ce type de bâtiment.",
      timestamp: "2023-10-27T11:20:00"
    },
    {
      id: "m5",
      sender: "Sophie Dubois",
      senderRole: "Maître d'ouvrage",
      message: "Parfait, nous allons donc attribuer ces lots aux entreprises recommandées. Pour le lot Plomberie, nous attendons une analyse complémentaire du bureau d'études.",
      timestamp: "2023-10-27T16:00:00"
    }
  ]
};

export function getTenderDetailById(id: string): TenderDetailData | undefined {
  // In a real application, you would fetch the data from an API
  // For now, we'll just return our mock data if the ID matches
  return mockTenderDetail.id === id ? mockTenderDetail : undefined;
}
