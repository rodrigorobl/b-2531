
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, DownloadCloud, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface LotAnalysisHeaderProps {
  lotName: string;
  projectName: string;
  projectId: string;
  onDownloadSummary: (format: 'pdf' | 'excel') => void;
}

export function LotAnalysisHeader({ 
  lotName, 
  projectName, 
  projectId,
  onDownloadSummary 
}: LotAnalysisHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link to={`/tender/${projectId}`}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{lotName}</h1>
          <div className="text-muted-foreground flex items-center gap-1">
            Projet: <Link to={`/tender/${projectId}`} className="hover:underline">{projectName}</Link>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => onDownloadSummary('excel')}>
          <DownloadCloud className="mr-2 h-4 w-4" />
          Excel
        </Button>
        <Button variant="outline" onClick={() => onDownloadSummary('pdf')}>
          <FileText className="mr-2 h-4 w-4" />
          PDF
        </Button>
      </div>
    </div>
  );
}
