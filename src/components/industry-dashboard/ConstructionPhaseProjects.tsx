
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileText, ArrowRight, Check, Clock, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuoteStatus {
  id: string;
  projectName: string;
  lot: string;
  contractor: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: string;
  updatedAt: string;
}

interface ConstructionPhaseProjectsProps {
  quotes: QuoteStatus[];
}

export default function ConstructionPhaseProjects({ quotes }: ConstructionPhaseProjectsProps) {
  const getStatusBadge = (status: QuoteStatus['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">En attente</Badge>;
      case 'approved':
        return <Badge variant="default">Validé</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Refusé</Badge>;
    }
  };

  const getStatusIcon = (status: QuoteStatus['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case 'approved':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <X className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Mes projets en phase de réalisation</CardTitle>
        <Button asChild>
          <Link to="/quotes-to-analyze">
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
              <TableHead>Lot</TableHead>
              <TableHead>Entreprise</TableHead>
              <TableHead>Statut du devis</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Dernière mise à jour</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">{quote.projectName}</TableCell>
                <TableCell>{quote.lot}</TableCell>
                <TableCell>{quote.contractor}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(quote.status)}
                    {getStatusBadge(quote.status)}
                  </div>
                </TableCell>
                <TableCell>{quote.amount}</TableCell>
                <TableCell>{quote.updatedAt}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/quote-detail/${quote.id}`}>
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
