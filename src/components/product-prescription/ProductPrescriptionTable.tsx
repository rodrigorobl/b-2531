
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Mail, Phone, Clock, CheckCircle, Eye, Filter, AlertTriangle, Loader2 } from 'lucide-react';
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

interface ProjectPrescription {
  id: string;
  projectName: string;
  location: string;
  projectManager: string;
  contractor: Contractor;
  prescriptionStatus: 'to-do' | 'in-progress' | 'validated' | 'lost';
  sentDate: string | null;
  productName: string;
  phase: 'conception';
}

interface ProductPrescriptionTableProps {
  prescriptions: ProjectPrescription[];
}

export function ProductPrescriptionTable({ prescriptions }: ProductPrescriptionTableProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'to-do' | 'in-progress' | 'validated' | 'lost'>('all');
  
  const filteredPrescriptions = prescriptions.filter(prescription => 
    statusFilter === 'all' || prescription.prescriptionStatus === statusFilter
  );

  const getStatusBadge = (status: ProjectPrescription['prescriptionStatus']) => {
    switch (status) {
      case 'to-do':
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" /> À réaliser</Badge>;
      case 'in-progress':
        return <Badge variant="default" className="bg-blue-600 gap-1"><Loader2 className="h-3 w-3 animate-spin" /> En cours</Badge>;
      case 'validated':
        return <Badge variant="default" className="bg-green-600 gap-1"><CheckCircle className="h-3 w-3" /> Prescription validée</Badge>;
      case 'lost':
        return <Badge variant="default" className="bg-red-600 gap-1"><AlertTriangle className="h-3 w-3" /> Prescription perdue</Badge>;
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
          {filteredPrescriptions.length} projet{filteredPrescriptions.length !== 1 ? 's' : ''} trouvé{filteredPrescriptions.length !== 1 ? 's' : ''}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Statut:</span>
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as 'all' | 'to-do' | 'in-progress' | 'validated' | 'lost')}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="to-do">À réaliser</SelectItem>
              <SelectItem value="in-progress">En cours</SelectItem>
              <SelectItem value="validated">Prescription validée</SelectItem>
              <SelectItem value="lost">Prescription perdue</SelectItem>
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
              <TableHead>Statut de la prescription</TableHead>
              <TableHead>Date de mise à jour</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Détails</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrescriptions.map((prescription) => (
              <TableRow key={prescription.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{prescription.projectName}</div>
                    <div className="flex items-center text-sm text-muted-foreground gap-1">
                      <MapPin className="h-4 w-4" />
                      {prescription.location}
                    </div>
                    <div className="text-sm text-muted-foreground italic">
                      Produit : {prescription.productName}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <Link 
                      to={`/company/${getMockCompanyId(prescription.projectManager)}`}
                      className="text-primary hover:underline"
                    >
                      {prescription.projectManager}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">Conception</Badge>
                </TableCell>
                <TableCell>{getStatusBadge(prescription.prescriptionStatus)}</TableCell>
                <TableCell>
                  {prescription.sentDate ? prescription.sentDate : '-'}
                </TableCell>
                <TableCell>
                  {prescription.prescriptionStatus === 'to-do' ? (
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Commencer
                    </Button>
                  ) : null}
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/product-prescription/${prescription.id}`}>
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
