
import React from 'react';
import { InfoTabs } from './project-info/InfoTabs';
import { UserProfileDialogWrapper } from './project-info/UserProfileDialogWrapper';

interface ProjectInfoProps {
  info: {
    description: string;
    surface: string;
    budget: string;
    lots: number;
    startDate: string;
    endDate: string;
    milestones: Array<{
      date: string;
      title: string;
      completed: boolean;
    }>;
    technicalTeam?: Array<{
      role: string;
      name: string;
      company: string;
      contact?: string;
    }>;
  }
}

export default function ProjectInfo({ info }: ProjectInfoProps) {
  return (
    <div className="column h-full animate-fade-in">
      <h2 className="column-header">Informations générales</h2>
      
      <div className="column-content">
        <UserProfileDialogWrapper>
          <InfoTabs info={info} />
        </UserProfileDialogWrapper>
      </div>
    </div>
  );
}
