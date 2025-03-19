
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface LotClosureDate {
  lotName: string;
  closureDate: Date | undefined;
}

interface TenderLotsClosureDateProps {
  form: UseFormReturn<any>;
}

const TenderLotsClosureDate: React.FC<TenderLotsClosureDateProps> = ({ form }) => {
  // Get the current lots from the form
  const selectedLots = form.getValues('construction.lots' as any) || [];
  let lotsList: string[] = [];
  
  if (Array.isArray(selectedLots)) {
    lotsList = selectedLots.map(lot => lot.name);
  }
  
  // Initialize closure dates from existing values or create new ones
  const existingClosureDates = form.getValues('construction.lotClosureDates' as any);
  
  let initialClosureDates: LotClosureDate[] = [];
  
  if (Array.isArray(lotsList) && lotsList.length > 0) {
    // Create closure dates for each lot
    initialClosureDates = lotsList.map(lotName => {
      // Try to find an existing date for this lot
      const existingDate = Array.isArray(existingClosureDates) 
        ? existingClosureDates.find((item: LotClosureDate) => item.lotName === lotName)
        : undefined;
        
      return {
        lotName,
        closureDate: existingDate?.closureDate || undefined
      };
    });
  }

  const [closureDates, setClosureDates] = useState<LotClosureDate[]>(initialClosureDates);
  const [globalDate, setGlobalDate] = useState<Date>();

  const updateDate = (lotName: string, date: Date | undefined) => {
    const updatedDates = closureDates.map(item => 
      item.lotName === lotName ? { ...item, closureDate: date } : item
    );
    
    setClosureDates(updatedDates);
    form.setValue('construction.lotClosureDates' as any, updatedDates);
  };

  const applyGlobalDate = () => {
    if (!globalDate) return;
    
    const updatedDates = closureDates.map(item => ({
      ...item,
      closureDate: globalDate
    }));
    
    setClosureDates(updatedDates);
    form.setValue('construction.lotClosureDates' as any, updatedDates);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, "dd MMMM yyyy", { locale: fr });
  };

  // If no lots are selected, show a message
  if (!Array.isArray(lotsList) || lotsList.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Dates de clôture par lot</h2>
          <p className="text-muted-foreground mt-1">
            Veuillez d'abord sélectionner des lots de travaux pour définir les dates de clôture.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Dates de clôture par lot</h2>
        <p className="text-muted-foreground mt-1">
          Définissez les dates de clôture pour chaque lot de travaux
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 border rounded-md bg-muted/50">
          <h3 className="text-md font-medium mb-3">Date de clôture globale</h3>
          <div className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !globalDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {globalDate ? formatDate(globalDate) : <span>Choisir une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={globalDate}
                  onSelect={setGlobalDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button 
              onClick={applyGlobalDate}
              disabled={!globalDate}
            >
              Appliquer à tous les lots
            </Button>
          </div>
        </div>

        {lotsList && lotsList.map((lotName) => (
          <div key={lotName} className="flex items-center justify-between border-b pb-2">
            <Label className="font-medium">{lotName}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !closureDates.find(d => d.lotName === lotName)?.closureDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {closureDates.find(d => d.lotName === lotName)?.closureDate ? 
                    formatDate(closureDates.find(d => d.lotName === lotName)?.closureDate) : 
                    <span>Choisir une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={closureDates.find(d => d.lotName === lotName)?.closureDate}
                  onSelect={(date) => updateDate(lotName, date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenderLotsClosureDate;
