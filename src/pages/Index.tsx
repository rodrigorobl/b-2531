
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectInfo from '@/components/ProjectInfo';
import TenderOffers from '@/components/TenderOffers';
import Communication from '@/components/Communication';
import ProjectMap from '@/components/ProjectMap';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Sample data for demonstration
const projectData = {
  id: "PRJ-2023-042",
  name: "Construction d'un immeuble de bureaux à Lyon Part-Dieu",
  owner: {
    name: "InnovaSpace",
    logo: ""
  },
  type: "Tertiaire",
  status: "in-progress" as const,
  location: {
    address: "25 Rue de la Villette, 69003 Lyon",
    lat: 45.7602,
    lng: 4.8591
  },
  deadline: "15/06/2024"
};

const projectInfo = {
  description: "Construction d'un immeuble de bureaux de 8 étages avec commerces en rez-de-chaussée et 2 niveaux de parking souterrain. Structure béton, façade vitrée avec brise-soleil orientables.",
  surface: "4 800 m²",
  budget: "12,5 M€",
  lots: 14,
  startDate: "01/03/2024",
  endDate: "30/09/2025",
  milestones: [
    { date: "01/03/2024", title: "Démarrage du chantier", completed: true },
    { date: "15/04/2024", title: "Fin des fondations", completed: true },
    { date: "30/06/2024", title: "Structure complète R+2", completed: false },
    { date: "15/09/2024", title: "Clos et couvert", completed: false },
    { date: "30/09/2025", title: "Livraison", completed: false }
  ]
};

const offerData = [
  {
    id: "AO-2023-042-01",
    lot: "03 - Gros œuvre",
    description: "Structure béton et maçonnerie",
    status: "pending" as const,
    deadline: "20/04/2024"
  },
  {
    id: "AO-2023-042-02",
    lot: "05 - Façades",
    description: "Murs-rideaux et brise-soleil",
    status: "pending" as const,
    deadline: "25/04/2024"
  },
  {
    id: "AO-2023-042-03",
    lot: "08 - CVC",
    description: "Chauffage, ventilation, climatisation",
    status: "submitted" as const,
    deadline: "15/04/2024",
    isCompliant: true
  },
  {
    id: "AO-2023-042-04",
    lot: "09 - Électricité",
    description: "Courants forts et faibles",
    status: "submitted" as const,
    deadline: "10/04/2024",
    isCompliant: false
  },
  {
    id: "AO-2023-042-05",
    lot: "12 - Ascenseurs",
    description: "Installation de 3 ascenseurs",
    status: "approved" as const,
    deadline: "01/04/2024"
  }
];

const messagesData = [
  {
    id: "msg-001",
    sender: {
      name: "Martine Laforet",
      role: "Maître d'ouvrage"
    },
    content: "Bonjour, nous avons reçu votre candidature pour le lot CVC. Pouvez-vous préciser le délai de livraison dans votre offre ?",
    timestamp: "Hier, 14:30",
    attachments: [
      { name: "requete_complement.pdf", size: "126 Ko", type: "PDF" }
    ]
  },
  {
    id: "msg-002",
    sender: {
      name: "Thomas Dubois",
      role: "Votre entreprise"
    },
    content: "Bonjour Martine, nous avons mis à jour notre offre avec le délai de livraison demandé. Vous trouverez le document en pièce jointe.",
    timestamp: "Hier, 15:45",
    attachments: [
      { name: "offre_CVC_maj.pdf", size: "2.4 Mo", type: "PDF" }
    ]
  }
];

const notificationsData = [
  {
    id: "notif-001",
    title: "Mise à jour du DCE",
    description: "Le CCTP du lot CVC a été mis à jour. Veuillez télécharger la dernière version.",
    timestamp: "Aujourd'hui, 09:15",
    read: false,
    type: "info" as const
  },
  {
    id: "notif-002",
    title: "Date limite prolongée",
    description: "La date limite de dépôt pour le lot Façades a été prolongée jusqu'au 30/04/2024.",
    timestamp: "Hier, 11:30",
    read: true,
    type: "warning" as const
  },
  {
    id: "notif-003",
    title: "Offre acceptée",
    description: "Votre offre pour le lot Ascenseurs a été acceptée.",
    timestamp: "15/03/2024",
    read: true,
    type: "success" as const
  }
];

const documentsData = [
  {
    id: "doc-001",
    name: "CCTP Gros œuvre",
    type: "PDF",
    size: "3.2 Mo",
    uploadDate: "01/03/2024"
  },
  {
    id: "doc-002",
    name: "DPGF Façades",
    type: "XLSX",
    size: "856 Ko",
    uploadDate: "01/03/2024"
  },
  {
    id: "doc-003",
    name: "Plans architecte",
    type: "ZIP",
    size: "24.5 Mo",
    uploadDate: "01/03/2024"
  },
  {
    id: "doc-004",
    name: "Planning général",
    type: "PDF",
    size: "1.8 Mo",
    uploadDate: "01/03/2024"
  }
];

export default function Index() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex w-full min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6 animate-slide-in overflow-hidden">
        <div className="mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBack}
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </div>
        
        <ProjectHeader project={projectData} />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Informations générales sur 50% de la largeur */}
          <div className="md:col-span-6 h-full overflow-auto">
            <ProjectInfo info={projectInfo} />
            
            {/* Carte Google Maps */}
            <div className="mt-4">
              <h2 className="column-header mb-4">Localisation du projet</h2>
              <ProjectMap location={projectData.location} />
            </div>
          </div>
          
          <div className="md:col-span-3 h-full overflow-auto">
            <TenderOffers offers={offerData} />
          </div>
          
          <div className="md:col-span-3 h-full overflow-auto">
            <Communication 
              messages={messagesData} 
              notifications={notificationsData} 
              documents={documentsData} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
