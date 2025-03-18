
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { ProjectSearchFilters } from '@/components/projects-search/ProjectSearchFilters';
import { ProjectSearchResults } from '@/components/projects-search/ProjectSearchResults';

// Types
export interface Project {
  id: string;
  name: string;
  type: 'conception' | 'realisation';
  location: string;
  client: string;
  referencing: 'in-progress' | 'not-started';
  contractor?: string;
  lots: string[];
  quoteStatus?: 'to-send' | 'sent' | 'signed';
  sentDate?: string | null;
}

export default function ProjectsSearch() {
  // Mock data for demonstration
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Résidence Les Cerisiers",
      type: "realisation",
      location: "Lyon",
      client: "Immobilier Moderne",
      referencing: "in-progress",
      contractor: "Entreprise Construction ABC",
      lots: ["Menuiserie", "Isolation"],
      quoteStatus: "to-send",
      sentDate: null
    },
    {
      id: "2",
      name: "Campus numérique",
      type: "conception",
      location: "Paris",
      client: "Université Digitale",
      referencing: "not-started",
      lots: ["Ventilation", "Électricité"]
    },
    {
      id: "3",
      name: "Tour Horizon",
      type: "realisation",
      location: "Marseille",
      client: "Développeurs Associés",
      referencing: "in-progress",
      contractor: "Construction du Sud",
      lots: ["Menuiserie", "Façade"],
      quoteStatus: "sent",
      sentDate: "2024-03-15"
    },
    {
      id: "4",
      name: "Éco-quartier Vert",
      type: "conception",
      location: "Nantes",
      client: "Ville de Nantes",
      referencing: "not-started",
      lots: ["Isolation", "Chauffage"]
    },
    {
      id: "5",
      name: "Centre Commercial Étoile",
      type: "realisation",
      location: "Bordeaux",
      client: "Retail Invest",
      referencing: "in-progress",
      contractor: "Grands Travaux SA",
      lots: ["Ventilation", "Climatisation"],
      quoteStatus: "signed",
      sentDate: "2024-02-10"
    },
    {
      id: "6",
      name: "Immeuble de bureaux Elite",
      type: "conception",
      location: "Lille",
      client: "Corporate Spaces",
      referencing: "in-progress",
      lots: ["Menuiserie", "Électricité", "Isolation"]
    },
    {
      id: "7",
      name: "Résidence Séniors Tranquillité",
      type: "realisation",
      location: "Strasbourg",
      client: "Silver Habitat",
      referencing: "not-started",
      contractor: "Constructions de l'Est",
      lots: ["Plomberie", "Électricité", "Chauffage"],
      quoteStatus: "to-send",
      sentDate: null
    },
    {
      id: "8",
      name: "Hôtel Premium",
      type: "conception",
      location: "Nice",
      client: "Luxe Hospitality",
      referencing: "not-started",
      lots: ["Climatisation", "Plomberie", "Électricité"]
    }
  ]);

  // Filter state
  const [filters, setFilters] = useState({
    projectType: 'all' as 'all' | 'conception' | 'realisation',
    referencing: 'all' as 'all' | 'in-progress' | 'not-started',
    location: 'all',
    searchQuery: ''
  });

  // Filtered projects
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  // Apply filters when filters state changes
  useEffect(() => {
    let result = [...projects];
    
    // Filter by project type
    if (filters.projectType !== 'all') {
      result = result.filter(project => project.type === filters.projectType);
    }
    
    // Filter by referencing status
    if (filters.referencing !== 'all') {
      result = result.filter(project => project.referencing === filters.referencing);
    }
    
    // Filter by location
    if (filters.location !== 'all') {
      result = result.filter(project => project.location.includes(filters.location));
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        project => 
          project.name.toLowerCase().includes(query) || 
          project.client.toLowerCase().includes(query) ||
          (project.contractor && project.contractor.toLowerCase().includes(query))
      );
    }
    
    setFilteredProjects(result);
  }, [filters, projects]);

  return (
    <Layout>
      <div className="container p-6 space-y-6">
        <header>
          <h1 className="text-3xl font-bold mb-2">Recherche de projets</h1>
          <p className="text-muted-foreground">
            Trouvez des opportunités de référencement pour vos produits
          </p>
        </header>
        
        <div className="flex flex-col md:flex-row gap-6">
          <ProjectSearchFilters 
            filters={filters} 
            setFilters={setFilters} 
          />
          
          <ProjectSearchResults 
            projects={filteredProjects}
          />
        </div>
      </div>
    </Layout>
  );
}
