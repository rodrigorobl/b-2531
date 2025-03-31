import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Sidebar from '@/components/Sidebar';
import { TenderHeader } from '@/components/tenders/TenderHeader';
import { TenderOverviewTab } from '@/components/tenders/TenderOverviewTab';
import { TenderQuotesTab } from '@/components/tenders/TenderQuotesTab';
import { TenderMessagesTab } from '@/components/tenders/TenderMessagesTab';
import { TenderDocumentsTab } from '@/components/tenders/TenderDocumentsTab';
import { TenderContactsTab } from '@/components/tenders/TenderContactsTab';
import { TenderTrackingTab } from '@/components/tenders/TenderTrackingTab';
import { TenderAnalysisTab } from '@/components/tenders/TenderAnalysisTab';

// Types
interface Tender {
  id: string;
  name: string;
  description: string;
  status: 'open' | 'closed' | 'assigned';
  createdAt: string;
  deadline: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  projectType: string;
  tenderType: 'conception' | 'realisation' | 'services';
  budget: number;
  categories: Category[];
  messages: Message[];
  documents: Document[];
}

interface Category {
  id: string;
  name: string;
  budget?: number;
  quotes: Quote[];
}

interface Quote {
  id: string;
  companyName: string;
  submissionDate: string;
  isCompliant: boolean;
  price: number;
  comments: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Message {
  id: string;
  sender: string;
  senderType: 'promoteur' | 'entreprise' | 'bet';
  content: string;
  timestamp: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
}

// Mock data for demonstration
const mockTender: Tender = {
  id: 'tender-001',
  name: 'Résidence Les Cerisiers - Construction',
  description: 'Projet de construction d\'une résidence de 40 logements sur 4 étages avec parking souterrain. Le projet vise une certification environnementale RT2020.',
  status: 'open',
  createdAt: '15/04/2024',
  deadline: '30/06/2024',
  location: {
    address: '12 Rue des Fleurs, 75001 Paris',
    lat: 48.856614,
    lng: 2.3522219
  },
  projectType: 'Résidentiel',
  tenderType: 'realisation',
  budget: 3500000,
  categories: [{
    id: 'cat-001',
    name: 'Gros Œuvre',
    budget: 850000,
    quotes: [{
      id: 'quote-001',
      companyName: 'BTP Construction',
      submissionDate: '01/05/2024',
      isCompliant: true,
      price: 850000,
      comments: 'Proposition incluant fondations spéciales pour terrain argileux',
      status: 'pending'
    }, {
      id: 'quote-002',
      companyName: 'Constructions Martin',
      submissionDate: '05/05/2024',
      isCompliant: true,
      price: 920000,
      comments: 'Option pour béton haute performance et livraison anticipée',
      status: 'pending'
    }, {
      id: 'quote-003',
      companyName: 'Bouygues Bâtiment',
      submissionDate: '10/05/2024',
      isCompliant: false,
      price: 780000,
      comments: 'Hors fondations spéciales mentionnées dans le cahier des charges',
      status: 'pending'
    }, {
      id: 'quote-004',
      companyName: 'Vinci Construction',
      submissionDate: '12/05/2024',
      isCompliant: true,
      price: 890000,
      comments: 'Inclut garantie décennale étendue et suivi de chantier renforcé',
      status: 'pending'
    }]
  }, {
    id: 'cat-002',
    name: 'Charpente',
    budget: 320000,
    quotes: [{
      id: 'quote-005',
      companyName: 'Charpentes Bernard',
      submissionDate: '03/05/2024',
      isCompliant: true,
      price: 320000,
      comments: 'Utilisation de bois locaux certifiés PEFC',
      status: 'pending'
    }, {
      id: 'quote-006',
      companyName: 'Structures Bois',
      submissionDate: '08/05/2024',
      isCompliant: true,
      price: 350000,
      comments: 'Traitement anti-insectes et ignifuge inclus',
      status: 'pending'
    }]
  }, {
    id: 'cat-003',
    name: 'Électricité',
    budget: 275000,
    quotes: []
  }, {
    id: 'cat-004',
    name: 'Plomberie',
    budget: 280000,
    quotes: [{
      id: 'quote-007',
      companyName: 'Plomberie Générale',
      submissionDate: '05/05/2024',
      isCompliant: true,
      price: 280000,
      comments: 'Système d\'économie d\'eau et récupération d\'eau de pluie',
      status: 'pending'
    }]
  }, {
    id: 'cat-005',
    name: 'Menuiseries',
    budget: 420000,
    quotes: [{
      id: 'quote-008',
      companyName: 'Menuiseries Durables',
      submissionDate: '02/05/2024',
      isCompliant: true,
      price: 420000,
      comments: 'Fenêtres triple vitrage et menuiseries extérieures aluminium',
      status: 'pending'
    }, {
      id: 'quote-009',
      companyName: 'Art du Bois',
      submissionDate: '07/05/2024',
      isCompliant: false,
      price: 390000,
      comments: 'Ne respecte pas les normes d\'isolation thermique requises',
      status: 'pending'
    }, {
      id: 'quote-010',
      companyName: 'Fenêtres & Portes',
      submissionDate: '11/05/2024',
      isCompliant: true,
      price: 405000,
      comments: 'Options supplémentaires pour portes sécurisées',
      status: 'pending'
    }, {
      id: 'quote-011',
      companyName: 'Menuiseries Modernes',
      submissionDate: '15/05/2024',
      isCompliant: true,
      price: 410000,
      comments: 'Inclut domotique pour ouvertures automatisées',
      status: 'pending'
    }]
  }],
  messages: [{
    id: 'msg-001',
    sender: 'Jean Dupont',
    senderType: 'promoteur',
    content: 'Bonjour, pourriez-vous préciser les délais d\'exécution pour le lot Gros Œuvre ?',
    timestamp: '20/04/2024 10:45'
  }, {
    id: 'msg-002',
    sender: 'BTP Construction',
    senderType: 'entreprise',
    content: 'Bonjour, nous estimons un délai de 6 mois pour la réalisation complète du gros œuvre, avec possibilité d\'optimisation selon les conditions météorologiques.',
    timestamp: '21/04/2024 09:30'
  }, {
    id: 'msg-003',
    sender: 'Cabinet d\'études Structura',
    senderType: 'bet',
    content: 'Après analyse des propositions, nous recommandons de clarifier les spécifications des fondations avec tous les soumissionnaires pour assurer la comparabilité des offres.',
    timestamp: '22/04/2024 14:15'
  }],
  documents: [{
    id: 'doc-001',
    name: 'DCE - Dossier Complet',
    type: 'pdf',
    size: '15.2 MB',
    url: '#'
  }, {
    id: 'doc-002',
    name: 'DPGF - Lots Techniques',
    type: 'xlsx',
    size: '2.8 MB',
    url: '#'
  }, {
    id: 'doc-003',
    name: 'Plans Architecte',
    type: 'pdf',
    size: '8.5 MB',
    url: '#'
  }, {
    id: 'doc-004',
    name: 'Étude de Sol',
    type: 'pdf',
    size: '4.3 MB',
    url: '#'
  }, {
    id: 'doc-005',
    name: 'Calendrier Prévisionnel',
    type: 'pdf',
    size: '1.2 MB',
    url: '#'
  }]
};

export default function TenderDetail() {
  const { tenderId } = useParams<{ tenderId: string }>();
  const [tender, setTender] = useState<Tender | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setTender(mockTender);
    if (mockTender.categories.length > 0) {
      setSelectedCategory(mockTender.categories[0].id);
    }
  }, [tenderId]);

  if (!tender) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-center h-full">
            <p>Chargement de l'appel d'offres...</p>
          </div>
        </main>
      </div>
    );
  }

  const totalCategories = tender.categories.length;
  const assignedCategories = tender.categories.filter(
    cat => cat.quotes.some(quote => quote.status === 'approved')
  ).length;
  const progressPercentage = totalCategories > 0 
    ? Math.round(assignedCategories / totalCategories * 100) 
    : 0;

  const totalQuotesAmount = tender.categories.reduce((total, category) => {
    const lowestQuoteForCategory = category.quotes.length > 0 
      ? Math.min(...category.quotes.filter(q => q.isCompliant).map(q => q.price)) 
      : 0;
    return total + lowestQuoteForCategory;
  }, 0);
  
  const budgetStatus = totalQuotesAmount > tender.budget ? 'exceeded' : 'respected';
  const budgetDifference = Math.abs(tender.budget - totalQuotesAmount);
  const budgetDifferencePercentage = tender.budget > 0 
    ? Math.round(budgetDifference / tender.budget * 100) 
    : 0;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-start mb-4">
          <TenderHeader tender={tender} />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="quotes">
              Devis ({tender.categories.reduce((total, cat) => total + cat.quotes.length, 0)})
            </TabsTrigger>
            <TabsTrigger value="tracking">Suivi</TabsTrigger>
            <TabsTrigger value="analysis">Analyse</TabsTrigger>
            <TabsTrigger value="messages">Messages ({tender.messages.length})</TabsTrigger>
            <TabsTrigger value="documents">Documents ({tender.documents.length})</TabsTrigger>
            <TabsTrigger value="contacts">Intervenants</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <TenderOverviewTab 
              tender={tender}
              tenderId={tenderId || ''}
              progressPercentage={progressPercentage}
              assignedCategories={assignedCategories}
              totalCategories={totalCategories}
              budgetStatus={budgetStatus}
              budgetDifference={budgetDifference}
              budgetDifferencePercentage={budgetDifferencePercentage}
              totalQuotesAmount={totalQuotesAmount}
            />
          </TabsContent>

          <TabsContent value="quotes">
            <TenderQuotesTab 
              tenderId={tenderId || ''}
              categories={tender.categories}
            />
          </TabsContent>

          <TabsContent value="tracking">
            <TenderTrackingTab categories={tender.categories} />
          </TabsContent>

          <TabsContent value="analysis">
            <TenderAnalysisTab tenderId={tenderId || ''} />
          </TabsContent>

          <TabsContent value="messages">
            <TenderMessagesTab messages={tender.messages} />
          </TabsContent>

          <TabsContent value="documents">
            <TenderDocumentsTab 
              documents={tender.documents}
              categories={tender.categories}
            />
          </TabsContent>

          <TabsContent value="contacts">
            <TenderContactsTab tenderId={tenderId || ''} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
