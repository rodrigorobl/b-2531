
import React from 'react';
import { 
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Check, X, Clock } from 'lucide-react';

type QuoteStatus = 'to-analyze' | 'in-progress' | 'compliant' | 'non-compliant';

interface QuoteClassificationDialogProps {
  quoteId: string;
  updateQuoteStatus: (quoteId: string, newStatus: QuoteStatus) => void;
}

export const QuoteClassificationDialog = ({ 
  quoteId, 
  updateQuoteStatus 
}: QuoteClassificationDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" size="sm">
          <Check size={14} className="mr-1" />
          Classifier
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Classifier le devis</AlertDialogTitle>
          <AlertDialogDescription>
            Veuillez choisir le statut du devis et ajouter un commentaire si nécessaire.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1" 
              onClick={() => updateQuoteStatus(quoteId, 'compliant')}
            >
              <Check size={14} className="mr-1" />
              Conforme
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1" 
              onClick={() => updateQuoteStatus(quoteId, 'non-compliant')}
            >
              <X size={14} className="mr-1" />
              Non conforme
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1" 
              onClick={() => updateQuoteStatus(quoteId, 'in-progress')}
            >
              <Clock size={14} className="mr-1" />
              En cours
            </Button>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
