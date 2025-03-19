
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileText, ArrowRight, Clock, AlertTriangle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReferenceStatus {
  id: string;
  projectName: string;
  productName: string;
  status: 'non-reference' | 'en-cours' | 'valide';
  betName: string;
  updatedAt: string;
}

interface DesignPhaseProjectsProps {
  references: ReferenceStatus[];
}

export default function DesignPhaseProjects({ references }: DesignPhaseProjectsProps) {
  const getStatusBadge = (status: ReferenceStatus['status']) => {
    switch (status) {
      case 'non-reference':
        return <Badge variant="destructive">Non référencé</Badge>;
      case 'en-cours':
        return <Badge variant="secondary">En cours</Badge>;
      case 'valide':
        return <Badge variant="default">Validé</Badge>;
    }
  };

  const getStatusIcon = (status: ReferenceStatus['status']) => {
    switch (status) {
      case 'non-reference':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'en-cours':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case 'valide':
        return <Check className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Mes projets en phase de conception</CardTitle>
        <Button asChild>
          <Link to="/product-reference">
            <ArrowRight className="mr-2 h-4 w-4" />
            Voir tous
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Projet</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>BET</TableHead>
              <TableHead>Dernière mise à jour</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {references.map((ref) => (
              <TableRow key={ref.id}>
                <TableCell className="font-medium">{ref.projectName}</TableCell>
                <TableCell>{ref.productName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(ref.status)}
                    {getStatusBadge(ref.status)}
                  </div>
                </TableCell>
                <TableCell>{ref.betName}</TableCell>
                <TableCell>{ref.updatedAt}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/product-reference/${ref.id}`}>
                      <FileText className="h-4 w-4 mr-1" />
                      Détails
                    </Link>
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
