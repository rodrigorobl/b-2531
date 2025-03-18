
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BellRing } from 'lucide-react';

export function FilterActions() {
  return (
    <>
      <Button className="w-full">Appliquer les filtres</Button>
      <Button variant="outline" className="w-full">Réinitialiser</Button>
      <div className="mt-4 pt-4 border-t">
        <Link to="/alerte-management">
          <Button variant="link" className="w-full flex items-center justify-center gap-2 text-primary">
            <BellRing size={16} />
            <span>Gérer mes alertes</span>
          </Button>
        </Link>
      </div>
    </>
  );
}
