
import React from 'react';
import { Button } from '@/components/ui/button';

export function FilterActions() {
  return (
    <div className="pt-2 flex flex-col gap-2">
      <Button className="w-full">Appliquer les filtres</Button>
      <Button variant="outline" className="w-full">Réinitialiser</Button>
    </div>
  );
}
