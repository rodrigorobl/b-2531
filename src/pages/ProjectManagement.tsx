
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useProjectManagement } from '@/hooks/useProjectManagement';
import ProjectFiltersBar from '@/components/projects/ProjectFiltersBar';
import ProjectManagementTable from '@/components/projects/ProjectManagementTable';

export default function ProjectManagement() {
  const { projects, isLoading, error } = useProjectManagement();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('projectName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter projects based on search and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (project.location && project.location.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort projects based on sort field and direction
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortField === 'startDate') {
      // Convert date string to date for sorting
      const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
      const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
      return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else if (sortField === 'progressPercentage') {
      return sortDirection === 'asc' ? a.progressPercentage - b.progressPercentage : b.progressPercentage - a.progressPercentage;
    } else {
      // Sort by project name as default
      return sortDirection === 'asc' 
        ? a.projectName.localeCompare(b.projectName) 
        : b.projectName.localeCompare(a.projectName);
    }
  });

  // Handle sort change
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Gestion des projets</h1>
            <p className="text-muted-foreground">
              Gérez et suivez tous vos projets immobiliers et leurs appels d'offres associés.
            </p>
          </div>
          
          {/* Filters and Search */}
          <ProjectFiltersBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          
          {/* Projects Table */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 w-full grid grid-cols-4">
              <TabsTrigger value="all" onClick={() => setStatusFilter('all')}>
                Tous
              </TabsTrigger>
              <TabsTrigger value="En cours" onClick={() => setStatusFilter('En cours')}>
                En cours
              </TabsTrigger>
              <TabsTrigger value="Clôturé" onClick={() => setStatusFilter('Clôturé')}>
                Clôturés
              </TabsTrigger>
              <TabsTrigger value="Attribué" onClick={() => setStatusFilter('Attribué')}>
                Attribués
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="m-0">
              <div className="rounded-md border bg-card">
                <ProjectManagementTable 
                  projects={sortedProjects}
                  isLoading={isLoading}
                  error={error}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="En cours" className="m-0">
              {/* Content will be filtered by the tab selection */}
            </TabsContent>
            
            <TabsContent value="Clôturé" className="m-0">
              {/* Content will be filtered by the tab selection */}
            </TabsContent>
            
            <TabsContent value="Attribué" className="m-0">
              {/* Content will be filtered by the tab selection */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
