
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import StatusBadge from '@/components/StatusBadge';

interface ProjectData {
  id: string;
  name: string;
  location: string;
  status: string;
  createdDate: string;
  [key: string]: any;
}

interface ProjectHeaderProps {
  projectData: ProjectData;
}

export default function ProjectHeader({ projectData }: ProjectHeaderProps) {
  return (
    <div className="md:w-2/3">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{projectData.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={projectData.status === 'open' ? 'in-progress' : projectData.status === 'closed' ? 'closed' : 'draft'} />
            <span className="text-sm text-muted-foreground">•</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin size={14} />
              <span>{projectData.location}</span>
            </div>
            <span className="text-sm text-muted-foreground">•</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar size={14} />
              <span>Publié le {projectData.createdDate}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/submit-quote/${projectData.id}`}>
            <Button>Déposer une offre</Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download size={16} className="mr-2" />
                Télécharger
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Télécharger les documents</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between hover:bg-accent p-2 rounded-md cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>DCE_Complet.zip</span>
                  </div>
                  <Download size={16} />
                </div>
                <div className="flex items-center justify-between hover:bg-accent p-2 rounded-md cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>Plans_Architecte.pdf</span>
                  </div>
                  <Download size={16} />
                </div>
                <div className="flex items-center justify-between hover:bg-accent p-2 rounded-md cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>DPGF.xlsx</span>
                  </div>
                  <Download size={16} />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
