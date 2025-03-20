
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { TenderHeader } from '@/components/tenders/TenderHeader';
import { Card, CardContent } from '@/components/ui/card';
import { ExportActions } from '@/components/services-quotes/ExportActions';
import LotCompaniesCards from '@/components/tenders/survey/LotCompaniesCards';

// Types
interface Company {
  id: string;
  name: string;
  status: 'invited' | 'submitted' | 'declined';
  quoteAmount?: number;
  analysisStatus?: 'not-analyzed' | 'compliant' | 'non-compliant';
}

interface Lot {
  id: string;
  name: string;
  description: string;
  companies: Company[];
}

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
  lots: Lot[];
}

// Mock data for demonstration
const mockTender: Tender = {
  id: 'tender-001',
  name: 'Résidence Les Cerisiers - Construction',
  description: 'Projet de construction d\'une résidence de 40 logements sur 4 étages avec parking souterrain.',
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
  lots: [
    {
      id: 'lot-001',
      name: 'Gros Œuvre',
      description: 'Travaux de fondation et structure',
      companies: [
        { id: 'comp-001', name: 'BTP Construction', status: 'submitted', quoteAmount: 850000, analysisStatus: 'compliant' },
        { id: 'comp-002', name: 'Constructions Martin', status: 'submitted', quoteAmount: 920000, analysisStatus: 'non-compliant' },
        { id: 'comp-003', name: 'Bouygues Bâtiment', status: 'invited' },
        { id: 'comp-004', name: 'Vinci Construction', status: 'declined' }
      ]
    },
    {
      id: 'lot-002',
      name: 'Charpente',
      description: 'Construction de la charpente bois',
      companies: [
        { id: 'comp-005', name: 'Charpentes Bernard', status: 'submitted', quoteAmount: 320000, analysisStatus: 'not-analyzed' },
        { id: 'comp-006', name: 'Structures Bois', status: 'invited' }
      ]
    },
    {
      id: 'lot-003',
      name: 'Électricité',
      description: 'Installation électrique complète',
      companies: [
        { id: 'comp-007', name: 'Électricité Générale', status: 'invited' },
        { id: 'comp-008', name: 'Courants Pro', status: 'submitted', quoteAmount: 185000, analysisStatus: 'compliant' },
        { id: 'comp-009', name: 'Électriciens Associés', status: 'declined' }
      ]
    },
    {
      id: 'lot-004',
      name: 'Plomberie',
      description: 'Travaux de plomberie et sanitaires',
      companies: [
        { id: 'comp-010', name: 'Plomberie Générale', status: 'submitted', quoteAmount: 280000, analysisStatus: 'not-analyzed' },
        { id: 'comp-011', name: 'Sanitaires Express', status: 'invited' }
      ]
    },
    {
      id: 'lot-005',
      name: 'Menuiseries',
      description: 'Fourniture et pose des menuiseries',
      companies: [
        { id: 'comp-012', name: 'Menuiseries Durables', status: 'submitted', quoteAmount: 420000, analysisStatus: 'compliant' },
        { id: 'comp-013', name: 'Art du Bois', status: 'declined' },
        { id: 'comp-014', name: 'Fenêtres & Portes', status: 'invited' }
      ]
    }
  ]
};

export default function ProjectSurvey() {
  const { tenderId } = useParams<{ tenderId: string }>();
  const [tender, setTender] = useState<Tender | null>(null);

  // Fetch tender data
  useEffect(() => {
    // In a real app, we would fetch the data based on tenderId
    // For now, use mock data
    setTender(mockTender);
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

  const handleExportPDF = () => {
    console.log('Exporting PDF...');
    // Implementation would go here
  };

  const handleExportXLS = () => {
    console.log('Exporting XLS...');
    // Implementation would go here
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <TenderHeader tender={{
            name: tender.name,
            status: tender.status,
            deadline: tender.deadline,
            projectType: tender.projectType,
            id: tender.id
          }} />
          
          <div className="flex justify-between items-center mt-6 mb-4">
            <h2 className="text-xl font-semibold">Suivi des entreprises consultées</h2>
            <ExportActions onExportPDF={handleExportPDF} onExportXLS={handleExportXLS} />
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-8">
              {tender.lots.map((lot) => (
                <LotCompaniesCards key={lot.id} lot={lot} />
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
