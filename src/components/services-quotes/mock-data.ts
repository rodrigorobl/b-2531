
import { Quote, QuoteRequest } from '@/types/services-quotes';

// Mock data for demonstration
export const mockQuoteRequests: QuoteRequest[] = [
  {
    id: 'req1',
    projectId: 'proj1',
    projectName: 'Résidence Les Cèdres',
    requesterType: 'developer',
    requesterName: 'Promoteur ABC',
    requesterId: 'comp1',
    serviceId: 'serv1',
    serviceName: 'Nettoyage de fin de chantier',
    requestDate: '2023-05-15',
    desiredCompletionDate: '2023-06-30',
    description: 'Nettoyage complet de 15 appartements avant livraison',
    status: 'pending'
  },
  {
    id: 'req2',
    projectId: 'proj2',
    projectName: 'Tour Horizon',
    requesterType: 'constructor',
    requesterName: 'Construction XYZ',
    requesterId: 'comp2',
    serviceId: 'serv2',
    serviceName: 'Location nacelle élévatrice',
    requestDate: '2023-05-10',
    desiredCompletionDate: '2023-05-25',
    description: 'Location nacelle 15m pour 5 jours',
    status: 'sent'
  },
  {
    id: 'req3',
    projectId: 'proj3',
    projectName: 'Centre Commercial Est',
    requesterType: 'project-manager',
    requesterName: 'Bureau Études Tech',
    requesterId: 'comp3',
    serviceId: 'serv3',
    serviceName: 'Contrôle technique installations',
    requestDate: '2023-05-05',
    desiredCompletionDate: '2023-05-20',
    description: 'Vérification conformité électrique',
    status: 'accepted'
  }
];

export const mockQuotes: Quote[] = [
  {
    id: 'quote1',
    requestId: 'req1',
    projectId: 'proj1',
    projectName: 'Résidence Les Cèdres',
    recipientType: 'developer',
    recipientName: 'Promoteur ABC',
    recipientId: 'comp1',
    serviceId: 'serv1',
    serviceName: 'Nettoyage de fin de chantier',
    createdAt: '2023-05-16',
    updatedAt: '2023-05-16',
    status: 'sent',
    currentAmount: 3500,
    versions: [
      {
        id: 'v1',
        quoteId: 'quote1',
        version: 1,
        amount: 3500,
        createdAt: '2023-05-16'
      }
    ],
    isVoluntary: false
  },
  {
    id: 'quote2',
    projectId: 'proj4',
    projectName: 'Immeuble Le Parc',
    recipientType: 'constructor',
    recipientName: 'Bâtiment Pro',
    recipientId: 'comp4',
    serviceId: 'serv4',
    serviceName: 'Entretien espaces verts',
    createdAt: '2023-05-05',
    updatedAt: '2023-05-07',
    status: 'pending',
    currentAmount: 1200,
    versions: [
      {
        id: 'v2',
        quoteId: 'quote2',
        version: 1,
        amount: 1500,
        createdAt: '2023-05-05'
      },
      {
        id: 'v3',
        quoteId: 'quote2',
        version: 2,
        amount: 1200,
        createdAt: '2023-05-07',
        notes: 'Révision suite à discussion client'
      }
    ],
    isVoluntary: true
  },
  {
    id: 'quote3',
    requestId: 'req3',
    projectId: 'proj3',
    projectName: 'Centre Commercial Est',
    recipientType: 'project-manager',
    recipientName: 'Bureau Études Tech',
    recipientId: 'comp3',
    serviceId: 'serv3',
    serviceName: 'Contrôle technique installations',
    createdAt: '2023-05-06',
    updatedAt: '2023-05-10',
    status: 'accepted',
    currentAmount: 2800,
    versions: [
      {
        id: 'v4',
        quoteId: 'quote3',
        version: 1,
        amount: 3200,
        createdAt: '2023-05-06'
      },
      {
        id: 'v5',
        quoteId: 'quote3',
        version: 2,
        amount: 2800,
        createdAt: '2023-05-10',
        notes: 'Réduction suite à négociation'
      }
    ],
    isVoluntary: false
  },
  // New quotes examples
  {
    id: 'quote4',
    projectId: 'proj5',
    projectName: 'Hôtel de Ville',
    recipientType: 'service-company',
    recipientName: 'Mairie de Lyon',
    recipientId: 'comp5',
    serviceId: 'serv5',
    serviceName: 'Rénovation façade',
    createdAt: '2023-06-10',
    updatedAt: '2023-06-12',
    status: 'accepted',
    currentAmount: 18500,
    versions: [
      {
        id: 'v6',
        quoteId: 'quote4',
        version: 1,
        amount: 18500,
        createdAt: '2023-06-10'
      }
    ],
    isVoluntary: true
  },
  {
    id: 'quote5',
    requestId: 'req5',
    projectId: 'proj6',
    projectName: 'Campus Universitaire',
    recipientType: 'service-company',
    recipientName: 'Université Paul Valéry',
    recipientId: 'comp6',
    serviceId: 'serv6',
    serviceName: 'Installation système sécurité',
    createdAt: '2023-06-15',
    updatedAt: '2023-06-15',
    status: 'rejected',
    currentAmount: 12700,
    versions: [
      {
        id: 'v7',
        quoteId: 'quote5',
        version: 1,
        amount: 12700,
        createdAt: '2023-06-15'
      }
    ],
    isVoluntary: false
  },
  {
    id: 'quote6',
    projectId: 'proj7',
    projectName: 'Centre Sportif Municipal',
    recipientType: 'project-manager',
    recipientName: 'Cabinet MTO Architectes',
    recipientId: 'comp7',
    serviceId: 'serv7',
    serviceName: 'Étude acoustique',
    createdAt: '2023-07-01',
    updatedAt: '2023-07-05',
    status: 'pending',
    currentAmount: 4800,
    versions: [
      {
        id: 'v8',
        quoteId: 'quote6',
        version: 1,
        amount: 5200,
        createdAt: '2023-07-01'
      },
      {
        id: 'v9',
        quoteId: 'quote6',
        version: 2,
        amount: 4800,
        createdAt: '2023-07-05',
        notes: 'Ajustement suite à précision du périmètre'
      }
    ],
    isVoluntary: true
  },
  {
    id: 'quote7',
    requestId: 'req7',
    projectId: 'proj8',
    projectName: 'Résidence Les Oliviers',
    recipientType: 'developer',
    recipientName: 'Groupe Immobilier Méditerranée',
    recipientId: 'comp8',
    serviceId: 'serv8',
    serviceName: 'Diagnostic plomberie',
    createdAt: '2023-07-20',
    updatedAt: '2023-07-20',
    status: 'sent',
    currentAmount: 2300,
    versions: [
      {
        id: 'v10',
        quoteId: 'quote7',
        version: 1,
        amount: 2300,
        createdAt: '2023-07-20'
      }
    ],
    isVoluntary: false
  }
];
