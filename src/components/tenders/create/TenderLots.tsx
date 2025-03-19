
import React from 'react';
import LotSelector from './construction/LotSelector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TenderFormProps } from './TenderFormProps';

const TenderLots: React.FC<TenderFormProps<any>> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Définition des lots</h2>
        <p className="text-muted-foreground mt-1">
          Sélectionnez les différents lots pour votre projet de construction
        </p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lots personnalisés</CardTitle>
          <CardDescription>
            Créez vos propres lots pour ce projet spécifique
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LotSelector form={form} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TenderLots;
