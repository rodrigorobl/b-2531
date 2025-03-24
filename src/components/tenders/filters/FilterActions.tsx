
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BellPlus } from 'lucide-react';

export function FilterActions() {
  return (
    <>
      <Button className="w-full">Appliquer les filtres</Button>
      <Button variant="outline" className="w-full">Réinitialiser</Button>
      <div className="mt-4 pt-4 border-t">
        <Link to="/tender-alerte">
          <Button variant="link" className="w-full flex items-center justify-center gap-2 text-primary">
            <BellPlus size={16} />
            <span>Créer une alerte</span>
          </Button>
        </Link>
      </div>
    </>
  );
}
