
import React from 'react';
import { Button } from '@/components/ui/button';

export function FilterActions() {
  return (
    <>
      <Button className="w-full">Appliquer les filtres</Button>
      <Button variant="outline" className="w-full">Réinitialiser</Button>
    </>
  );
}
