
import React from 'react';
import { ProjectData, TenderData, QuoteData } from '@/types/projectDetail';
import { ProjectDescription } from './overview/ProjectDescription';
import { ProjectKPICards } from './overview/ProjectKPICards';
import { TenderStatistics } from './overview/TenderStatistics';
import { RecentTendersTable } from './overview/RecentTendersTable';

interface ProjectOverviewTabProps {
  project: ProjectData;
  tenders: TenderData[];
  quotes: { [key: string]: QuoteData[] };
  setActiveTab: (tab: string) => void;
  setSelectedTenderId: (id: string) => void;
}

export function ProjectOverviewTab({ 
  project, 
  tenders, 
  quotes, 
  setActiveTab,
  setSelectedTenderId
}: ProjectOverviewTabProps) {
  return (
    <>
      {/* Project Description */}
      <ProjectDescription description={project.description} />
      
      {/* Project KPIs and Budget */}
      <ProjectKPICards project={project} />
      
      {/* Project Statistics */}
      <TenderStatistics tenders={tenders} quotes={quotes} />
      
      {/* Recent Tenders */}
      <RecentTendersTable 
        tenders={tenders}
        setActiveTab={setActiveTab}
        setSelectedTenderId={setSelectedTenderId}
      />
    </>
  );
}
