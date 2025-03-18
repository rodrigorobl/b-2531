
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  BellRing, 
  Edit, 
  Trash, 
  MoreVertical, 
  FileSearch, 
  AlertTriangle,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Alert {
  id: string;
  name: string;
  type: string;
  criteria: string[];
  frequency: 'instant' | 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AlertManagement() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      name: "Projets de rénovation à Paris",
      type: "Réalisation",
      criteria: ["Paris", "Rénovation", "Budget > 500 000 €"],
      frequency: "weekly",
      isActive: true,
      createdAt: "2023-06-15",
      updatedAt: "2023-06-15"
    },
    {
      id: "2",
      name: "Projets commerciaux en PACA",
      type: "Conception",
      criteria: ["PACA", "Commercial", "Budget > 1 000 000 €"],
      frequency: "daily",
      isActive: true,
      createdAt: "2023-07-10",
      updatedAt: "2023-08-05"
    },
    {
      id: "3",
      name: "Petits projets résidentiels",
      type: "Services",
      criteria: ["Résidentiel", "Budget < 200 000 €"],
      frequency: "monthly",
      isActive: false,
      createdAt: "2023-05-20",
      updatedAt: "2023-07-30"
    }
  ]);

  const toggleAlertStatus = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id 
        ? { ...alert, isActive: !alert.isActive } 
        : alert
    ));
    
    const alert = alerts.find(a => a.id === id);
    if (alert) {
      toast.success(`Alerte "${alert.name}" ${alert.isActive ? 'désactivée' : 'activée'}`);
    }
  };

  const deleteAlert = (id: string) => {
    const alertToDelete = alerts.find(a => a.id === id);
    setAlerts(alerts.filter(alert => alert.id !== id));
    if (alertToDelete) {
      toast.success(`Alerte "${alertToDelete.name}" supprimée`);
    }
  };

  const viewResults = (id: string) => {
    const alert = alerts.find(a => a.id === id);
    if (alert) {
      toast.info(`Affichage des résultats pour l'alerte "${alert.name}"`);
      // In a real application, this would navigate to a page showing matching tenders
      navigate('/tender-search');
    }
  };

  const editAlert = (id: string) => {
    navigate(`/tender-alerte?id=${id}`);
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'instant': return 'Instantanée';
      case 'daily': return 'Quotidienne';
      case 'weekly': return 'Hebdomadaire';
      case 'monthly': return 'Mensuelle';
      default: return frequency;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BellRing className="mr-2 h-6 w-6" />
            <h1 className="text-2xl font-bold">Gestion des alertes</h1>
          </div>
          <Button onClick={() => navigate('/tender-alerte')} className="flex items-center gap-2">
            <Plus size={16} />
            <span>Créer une alerte</span>
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle>Vos alertes d'appels d'offres</CardTitle>
            <CardDescription>
              Gérez et suivez vos alertes personnalisées
            </CardDescription>
          </CardHeader>
          <CardContent>
            {alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucune alerte configurée</h3>
                <p className="text-muted-foreground mb-4">
                  Vous n'avez pas encore créé d'alertes pour les appels d'offres.
                </p>
                <Button onClick={() => navigate('/tender-alerte')}>
                  Créer une première alerte
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom de l'alerte</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Critères</TableHead>
                      <TableHead>Fréquence</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Dernière mise à jour</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">{alert.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{alert.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {alert.criteria.map((criterion, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {criterion}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{getFrequencyLabel(alert.frequency)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={alert.isActive} 
                              onCheckedChange={() => toggleAlertStatus(alert.id)}
                            />
                            <span className={alert.isActive ? "text-green-600" : "text-muted-foreground"}>
                              {alert.isActive ? "Activée" : "Désactivée"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{alert.updatedAt}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => editAlert(alert.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Modifier</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => viewResults(alert.id)}>
                                <FileSearch className="mr-2 h-4 w-4" />
                                <span>Voir les résultats</span>
                              </DropdownMenuItem>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem 
                                    onSelect={(e) => e.preventDefault()}
                                    className="text-destructive"
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>Supprimer</span>
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Êtes-vous sûr de vouloir supprimer cette alerte ? Cette action est irréversible.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => deleteAlert(alert.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Supprimer
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>À propos des alertes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Les alertes vous permettent de recevoir des notifications concernant les nouveaux appels d'offres qui correspondent à vos critères spécifiques.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Types d'alertes</h3>
                <ul className="space-y-2 list-disc pl-4 text-sm">
                  <li>Alertes par type de projet</li>
                  <li>Alertes par localisation</li>
                  <li>Alertes par budget</li>
                  <li>Alertes par secteur d'activité</li>
                </ul>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Fréquence des notifications</h3>
                <ul className="space-y-2 list-disc pl-4 text-sm">
                  <li>Instantanée: notification dès qu'un AO correspond</li>
                  <li>Quotidienne: résumé quotidien</li>
                  <li>Hebdomadaire: résumé hebdomadaire</li>
                  <li>Mensuelle: résumé mensuel</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
