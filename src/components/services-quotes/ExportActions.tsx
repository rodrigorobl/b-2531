
import React from 'react';
import { FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExportActionsProps {
  onExportPDF: () => void;
  onExportXLS: () => void;
}

export function ExportActions({ onExportPDF, onExportXLS }: ExportActionsProps) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={onExportPDF}>
        <FileText size={16} className="mr-2" />
        Export PDF
      </Button>
      <Button variant="outline" onClick={onExportXLS}>
        <FileSpreadsheet size={16} className="mr-2" />
        Export XLS
      </Button>
    </div>
  );
}
