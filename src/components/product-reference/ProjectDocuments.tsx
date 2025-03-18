
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Plus, File, FileImage, FileSpreadsheet, FileClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

interface ProjectDocumentsProps {
  documents: Document[];
}

export default function ProjectDocuments({ documents }: ProjectDocumentsProps) {
  const [docTypeFilter, setDocTypeFilter] = useState('all');
  
  const filteredDocs = docTypeFilter === 'all' 
    ? documents 
    : documents.filter(doc => doc.type === docTypeFilter);

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'technical':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'certification':
        return <FileClock className="h-4 w-4 text-green-500" />;
      case 'measurement':
        return <FileSpreadsheet className="h-4 w-4 text-yellow-500" />;
      case 'quote':
        return <File className="h-4 w-4 text-purple-500" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };
  
  const getDocumentTypeName = (type: string) => {
    switch (type) {
      case 'technical':
        return 'Fiche technique';
      case 'certification':
        return 'Certification';
      case 'measurement':
        return 'Métré';
      case 'quote':
        return 'Devis';
      default:
        return 'Document';
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Documents du projet
          </CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un document
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Select value={docTypeFilter} onValueChange={setDocTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="technical">Fiches techniques</SelectItem>
              <SelectItem value="certification">Certifications</SelectItem>
              <SelectItem value="measurement">Métrés</SelectItem>
              <SelectItem value="quote">Devis</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date d'ajout</TableHead>
              <TableHead>Taille</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocs.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  {getDocumentIcon(doc.type)}
                  <span>{doc.name}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {getDocumentTypeName(doc.type)}
                  </Badge>
                </TableCell>
                <TableCell>{doc.uploadDate}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
