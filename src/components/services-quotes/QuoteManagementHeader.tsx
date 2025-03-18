
import React from 'react';
import { Link } from 'react-router-dom';
import { FilePlus2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExportActions } from './ExportActions';

interface QuoteManagementHeaderProps {
  onExportPDF: () => void;
  onExportXLS: () => void;
}

export function QuoteManagementHeader({ onExportPDF, onExportXLS }: QuoteManagementHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des devis</h1>
        <ExportActions onExportPDF={onExportPDF} onExportXLS={onExportXLS} />
      </div>
      <div className="flex justify-end mb-4">
        <Link to="/create-quote">
          <Button>
            <FilePlus2 size={16} className="mr-2" />
            Nouveau devis
          </Button>
        </Link>
      </div>
    </>
  );
}
