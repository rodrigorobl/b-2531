
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Mail, Phone, ExternalLink, Send, Clock, CheckCircle, Eye } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom';

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
}

interface ProductReferenceTableProps {
  references: ProjectReference[];
}

export function ProductReferenceTable({ references }: ProductReferenceTableProps) {
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

  // Mock company IDs for demo purposes
  // In a real app, these would come from your data model
  const getMockCompanyId = (name: string): string => {
    // Simple hash function to generate pseudo-random but consistent IDs
    return String(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000);
  };

  return (
    <Card>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Projet</TableHead>
              <TableHead>MOE</TableHead>
              <TableHead>Entreprise titulaire</TableHead>
              <TableHead>Statut du devis</TableHead>
              <TableHead>Date d'envoi</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {references.map((reference) => (
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
                </TableCell>
                <TableCell>{getStatusBadge(reference.quoteStatus)}</TableCell>
                <TableCell>
                  {reference.sentDate ? reference.sentDate : '-'}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {reference.quoteStatus === 'to-send' ? (
                      <Button size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer un devis
                      </Button>
                    ) : null}
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/product-reference/${reference.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Voir détails
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
