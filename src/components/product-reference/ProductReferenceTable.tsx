
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Mail, Phone, Send, Clock, CheckCircle, Eye, Filter } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface Contractor {
  name: string;
  contact: string;
  phone: string;
}

interface ProjectReference {
  id: string;
  projectName: string;
  location: string;
  projectManager: string;
  contractor: Contractor;
  quoteStatus: 'to-send' | 'sent' | 'signed';
  sentDate: string | null;
  productName: string;
  phase: 'conception' | 'realisation';
}

interface ProductReferenceTableProps {
  references: ProjectReference[];
}

export function ProductReferenceTable({ references }: ProductReferenceTableProps) {
  const [phaseFilter, setPhaseFilter] = useState<'all' | 'conception' | 'realisation'>('all');
  
  const filteredReferences = references.filter(ref => 
    phaseFilter === 'all' || ref.phase === phaseFilter
  );

  const getStatusBadge = (status: ProjectReference['quoteStatus']) => {
    switch (status) {
      case 'to-send':
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" /> À réaliser</Badge>;
      case 'sent':
        return <Badge variant="default" className="gap-1"><Send className="h-3 w-3" /> Envoyé</Badge>;
      case 'signed':
        return <Badge variant="default" className="bg-green-600 gap-1"><CheckCircle className="h-3 w-3" /> Signé</Badge>;
    }
  };

  const getPhaseBadge = (phase: ProjectReference['phase']) => {
    switch (phase) {
      case 'conception':
        return <Badge variant="secondary">Conception</Badge>;
      case 'realisation':
        return <Badge variant="default">Réalisation</Badge>;
    }
  };

  // Mock company IDs for demo purposes
  // In a real app, these would come from your data model
  const getMockCompanyId = (name: string): string => {
    // Simple hash function to generate pseudo-random but consistent IDs
    return String(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000);
  };

  return (
    <Card>
      <div className="p-4 border-b flex items-center justify-between">
        <div className="font-medium">
          {filteredReferences.length} projet{filteredReferences.length !== 1 ? 's' : ''} trouvé{filteredReferences.length !== 1 ? 's' : ''}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Phase:</span>
          </div>
          <Select
            value={phaseFilter}
            onValueChange={(value) => setPhaseFilter(value as 'all' | 'conception' | 'realisation')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Toutes les phases" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les phases</SelectItem>
              <SelectItem value="conception">Conception</SelectItem>
              <SelectItem value="realisation">Réalisation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Projet</TableHead>
              <TableHead>MOE</TableHead>
              <TableHead>Phase</TableHead>
              <TableHead>Entreprise titulaire</TableHead>
              <TableHead>Statut du devis</TableHead>
              <TableHead>Date d'envoi</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Détails</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReferences.map((reference) => (
              <TableRow key={reference.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{reference.projectName}</div>
                    <div className="flex items-center text-sm text-muted-foreground gap-1">
                      <MapPin className="h-4 w-4" />
                      {reference.location}
                    </div>
                    <div className="text-sm text-muted-foreground italic">
                      Produit : {reference.productName}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <Link 
                      to={`/company/${getMockCompanyId(reference.projectManager)}`}
                      className="text-primary hover:underline"
                    >
                      {reference.projectManager}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  {getPhaseBadge(reference.phase)}
                </TableCell>
                <TableCell>
                  {reference.phase === 'conception' ? (
                    <span className="text-sm text-muted-foreground italic">Non défini</span>
                  ) : (
                    <div className="space-y-1">
                      <div className="font-medium">
                        <Link 
                          to={`/company/${getMockCompanyId(reference.contractor.name)}`}
                          className="text-primary hover:underline"
                        >
                          {reference.contractor.name}
                        </Link>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {reference.contractor.contact}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {reference.contractor.phone}
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(reference.quoteStatus)}</TableCell>
                <TableCell>
                  {reference.sentDate ? reference.sentDate : '-'}
                </TableCell>
                <TableCell>
                  {reference.quoteStatus === 'to-send' ? (
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer un devis
                    </Button>
                  ) : null}
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/product-reference/${reference.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Voir détails
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
