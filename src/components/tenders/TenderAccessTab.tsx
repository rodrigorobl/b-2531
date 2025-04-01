
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface AccessRequest {
  id: string;
  companyId: string;
  companyName: string;
  lotId: string;
  lotName: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  decisionDate?: string;
}

interface TenderAccessTabProps {
  tenderId: string;
  lots: {
    id: string;
    name: string;
  }[];
}

export function TenderAccessTab({ tenderId, lots }: TenderAccessTabProps) {
  const { toast } = useToast();
  // Mock data for access requests - in a real app, this would come from an API
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([
    {
      id: 'req-001',
      companyId: 'company-001',
      companyName: 'BTP Construction',
      lotId: 'cat-001',
      lotName: 'Gros Œuvre',
      requestDate: '10/05/2024',
      status: 'pending'
    },
    {
      id: 'req-002',
      companyId: 'company-002',
      companyName: 'Électricité Martin',
      lotId: 'cat-003',
      lotName: 'Électricité',
      requestDate: '11/05/2024',
      status: 'approved',
      decisionDate: '12/05/2024'
    },
    {
      id: 'req-003',
      companyId: 'company-003',
      companyName: 'Plomberie Générale',
      lotId: 'cat-004',
      lotName: 'Plomberie',
      requestDate: '12/05/2024',
      status: 'rejected',
      decisionDate: '13/05/2024'
    },
    {
      id: 'req-004',
      companyId: 'company-004',
      companyName: 'Menuiseries Durables',
      lotId: 'cat-005',
      lotName: 'Menuiseries',
      requestDate: '13/05/2024',
      status: 'pending'
    },
    {
      id: 'req-005',
      companyId: 'company-005',
      companyName: 'Constructions Martin',
      lotId: 'cat-001',
      lotName: 'Gros Œuvre',
      requestDate: '14/05/2024',
      status: 'pending'
    }
  ]);

  const handleApproveAccess = (requestId: string) => {
    setAccessRequests(current =>
      current.map(req =>
        req.id === requestId
          ? { ...req, status: 'approved', decisionDate: new Date().toLocaleDateString('fr-FR') }
          : req
      )
    );
    toast({
      title: "Accès autorisé",
      description: "L'entreprise a été notifiée de l'autorisation d'accès",
    });
  };

  const handleRejectAccess = (requestId: string) => {
    setAccessRequests(current =>
      current.map(req =>
        req.id === requestId
          ? { ...req, status: 'rejected', decisionDate: new Date().toLocaleDateString('fr-FR') }
          : req
      )
    );
    toast({
      title: "Accès refusé",
      description: "L'entreprise a été notifiée du refus d'accès",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">En attente</Badge>;
      case 'approved':
        return <Badge variant="success" className="bg-green-500">Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Refusé</Badge>;
      default:
        return null;
    }
  };

  // Group access requests by lot
  const requestsByLot = lots.map(lot => {
    const requests = accessRequests.filter(req => req.lotId === lot.id);
    return {
      lot,
      requests
    };
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Gestion des accès au DCE</h2>
        <p className="text-muted-foreground mb-6">
          Ce projet est en mode d'accès restreint. Les entreprises doivent demander l'accès à chaque lot avant de pouvoir consulter le DCE.
        </p>

        {requestsByLot.map(({ lot, requests }) => (
          <Card key={lot.id} className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>
                Lot: {lot.name} ({requests.length} demande{requests.length > 1 ? 's' : ''})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {requests.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entreprise</TableHead>
                      <TableHead>Date de demande</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date de décision</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <Link 
                            to={`/company-detail/${request.companyId}`} 
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            {request.companyName}
                            <ExternalLink size={14} />
                          </Link>
                        </TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>{request.decisionDate || '—'}</TableCell>
                        <TableCell className="text-right">
                          {request.status === 'pending' && (
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2 text-green-500 border-green-500 hover:bg-green-50"
                                onClick={() => handleApproveAccess(request.id)}
                              >
                                <Check size={16} className="mr-1" />
                                Autoriser
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2 text-red-500 border-red-500 hover:bg-red-50"
                                onClick={() => handleRejectAccess(request.id)}
                              >
                                <X size={16} className="mr-1" />
                                Refuser
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  Aucune demande d'accès pour ce lot
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
