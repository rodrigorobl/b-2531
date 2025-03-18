
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Clock, Users, Ruler, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Lot {
  id: string;
  name: string;
  budget: string;
  deadline: string;
  minSurveyPrice: number;
  minSurveyDelivery: string;
}

interface ProjectLotsProps {
  projectId: string;
  lots: Lot[];
}

export default function ProjectLots({ projectId, lots }: ProjectLotsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Lots du projet</span>
          <Button variant="outline" size="sm">
            <Plus size={14} className="mr-2" />
            Ajouter un lot
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lots.map((lot) => (
            <div key={lot.id} className="border rounded-lg p-4 hover:bg-accent/20 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{lot.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Briefcase size={14} />
                      <span>Budget: {lot.budget}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock size={14} />
                      <span>Échéance: {lot.deadline}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/quantity-survey-request?project=${projectId}&lot=${lot.id}`}>
                    <Button variant="outline" size="sm">
                      <Ruler size={14} className="mr-2" />
                      Faire réaliser les métrés (à partir de {lot.minSurveyPrice}€ HT - {lot.minSurveyDelivery})
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Users size={14} className="mr-2" />
                    Voir les offres
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
