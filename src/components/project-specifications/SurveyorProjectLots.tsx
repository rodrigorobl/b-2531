
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Clock } from 'lucide-react';
import { Input as InputComponent } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Lot {
  id: string;
  name: string;
  budget: string;
  deadline: string;
  minSurveyPrice: number;
  minSurveyDelivery: string;
}

interface SurveyorProjectLotsProps {
  lots: Lot[];
}

export default function SurveyorProjectLots({ lots }: SurveyorProjectLotsProps) {
  const [lotPrices, setLotPrices] = useState<Record<string, number>>(
    lots.reduce((acc, lot) => ({ ...acc, [lot.id]: lot.minSurveyPrice }), {})
  );
  
  const [lotDays, setLotDays] = useState<Record<string, string>>(
    lots.reduce((acc, lot) => {
      const days = parseInt(lot.minSurveyDelivery);
      return { ...acc, [lot.id]: isNaN(days) ? '5' : days.toString() };
    }, {})
  );

  const handlePriceChange = (lotId: string, price: string) => {
    const numPrice = parseInt(price);
    if (!isNaN(numPrice)) {
      setLotPrices({ ...lotPrices, [lotId]: numPrice });
    }
  };

  const handleDaysChange = (lotId: string, days: string) => {
    setLotDays({ ...lotDays, [lotId]: days });
  };

  const handleSave = (lotId: string) => {
    toast.success(`Prix et délai mis à jour pour le lot ${lots.find(lot => lot.id === lotId)?.name}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lots du projet</CardTitle>
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
                <div className="flex gap-6 items-center">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Prix (€)</label>
                    <InputComponent
                      type="number"
                      value={lotPrices[lot.id]}
                      className="w-24"
                      onChange={(e) => handlePriceChange(lot.id, e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Jours nécessaires</label>
                    <InputComponent
                      type="number"
                      value={lotDays[lot.id]}
                      className="w-24"
                      min="1"
                      onChange={(e) => handleDaysChange(lot.id, e.target.value)}
                    />
                  </div>
                  <Button 
                    size="sm" 
                    className="mt-6"
                    onClick={() => handleSave(lot.id)}
                  >
                    Enregistrer
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
