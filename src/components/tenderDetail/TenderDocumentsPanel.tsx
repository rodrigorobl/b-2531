
import React from 'react';
import { TenderDetailData } from '@/types/tenderDetail';
import { 
  FileDown, 
  FileText, 
  FileSpreadsheet, 
  File,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TenderDocumentsPanelProps {
  tender: TenderDetailData;
}

export default function TenderDocumentsPanel({ tender }: TenderDocumentsPanelProps) {
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-500" />;
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="w-8 h-8 text-green-600" />;
      default:
        return <File className="w-8 h-8 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Documents</h2>
        <Button size="sm">
          <Upload className="w-4 h-4 mr-1" />
          Ajouter un document
        </Button>
      </div>

      <div className="space-y-3">
        {tender.documents.map((doc) => (
          <div key={doc.id} className="flex items-center gap-3 p-3 border rounded-md hover:bg-muted/50 transition-colors">
            {getFileIcon(doc.type)}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{doc.name}</p>
              <p className="text-xs text-muted-foreground">{doc.size}</p>
            </div>
            <Button variant="ghost" size="sm">
              <FileDown className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
