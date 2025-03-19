
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface KeyDate {
  id: string;
  name: string;
  date: Date | undefined;
}

interface TenderKeyDatesProps {
  form: UseFormReturn<TenderFormValues>;
}

const TenderKeyDates: React.FC<TenderKeyDatesProps> = ({ form }) => {
  // Default key dates for construction projects
  const defaultKeyDates: KeyDate[] = [
    { id: 'start', name: 'Démarrage du projet', date: undefined },
    { id: 'asbestos', name: 'Démarrage du désamiantage', date: undefined },
    { id: 'demolition', name: 'Démarrage de la démolition', date: undefined },
    { id: 'earthworks', name: 'Démarrage du terrassement', date: undefined },
    { id: 'structure', name: 'Démarrage du Gros Œuvre', date: undefined },
    { id: 'technical', name: 'Démarrage des corps d\'états techniques', date: undefined },
    { id: 'delivery', name: 'Livraison', date: undefined },
  ];

  // Make sure we handle the form value properly, ensuring it matches KeyDate[]
  const existingDates = form.getValues('construction.keyDates');
  const initialKeyDates: KeyDate[] = existingDates ? 
    existingDates.map(date => ({
      id: date.id || '', 
      name: date.name || '', 
      date: date.date
    })) : 
    defaultKeyDates;

  const [keyDates, setKeyDates] = useState<KeyDate[]>(initialKeyDates);

  const updateDate = (id: string, date: Date | undefined) => {
    const updatedDates = keyDates.map(item => 
      item.id === id ? { ...item, date } : item
    );
    
    setKeyDates(updatedDates);
    form.setValue('construction.keyDates', updatedDates);
  };

  // Format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, "dd MMMM yyyy", { locale: fr });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Dates clés du projet</h2>
        <p className="text-muted-foreground mt-1">
          Définissez les jalons importants de votre projet de construction
        </p>
      </div>

      <div className="space-y-4">
        {keyDates.map((keyDate) => (
          <div key={keyDate.id} className="flex items-center justify-between border-b pb-2">
            <Label htmlFor={keyDate.id} className="font-medium">{keyDate.name}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={keyDate.id}
                  variant={"outline"}
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !keyDate.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {keyDate.date ? formatDate(keyDate.date) : <span>Choisir une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={keyDate.date}
                  onSelect={(date) => updateDate(keyDate.id, date)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenderKeyDates;
