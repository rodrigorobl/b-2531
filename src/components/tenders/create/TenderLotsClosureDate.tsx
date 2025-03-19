
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

interface LotClosureDate {
  lotName: string;
  closureDate: Date | undefined;
}

interface TenderLotsClosureDateProps {
  form: UseFormReturn<TenderFormValues>;
}

const TenderLotsClosureDate: React.FC<TenderLotsClosureDateProps> = ({ form }) => {
  const [globalClosureDate, setGlobalClosureDate] = useState<Date | undefined>(undefined);
  
  // Get lots from form
  const lots = form.getValues('construction.lots') || [];
  
  // Initialize closure dates
  const [lotClosureDates, setLotClosureDates] = useState<LotClosureDate[]>(
    form.getValues('construction.lotClosureDates') || 
    lots.map(lot => ({ lotName: lot.name, closureDate: undefined }))
  );
  
  // Apply the same date to all lots
  const applyGlobalDate = () => {
    if (!globalClosureDate) return;
    
    const updatedDates = lotClosureDates.map(item => ({
      ...item,
      closureDate: globalClosureDate
    }));
    
    setLotClosureDates(updatedDates);
    form.setValue('construction.lotClosureDates', updatedDates);
  };
  
  // Update a specific lot's date
  const updateLotDate = (lotName: string, date: Date | undefined) => {
    const updatedDates = lotClosureDates.map(item => 
      item.lotName === lotName ? { ...item, closureDate: date } : item
    );
    
    setLotClosureDates(updatedDates);
    form.setValue('construction.lotClosureDates', updatedDates);
  };

  // Format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, "dd MMMM yyyy", { locale: fr });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Clôture des appels d'offres</h2>
        <p className="text-muted-foreground mt-1">
          Définissez les dates limites de réponse pour chaque lot
        </p>
      </div>

      <div className="flex items-center gap-4 p-4 border rounded-md bg-muted/30">
        <div className="flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !globalClosureDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {globalClosureDate ? formatDate(globalClosureDate) : <span>Choisir une date pour tous les lots</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={globalClosureDate}
                onSelect={setGlobalClosureDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button onClick={applyGlobalDate} disabled={!globalClosureDate}>
          Appliquer à tous
        </Button>
      </div>

      <div className="space-y-4">
        {lots.map((lot, index) => {
          const lotClosure = lotClosureDates.find(item => item.lotName === lot.name);
          
          return (
            <div key={index} className="flex items-center justify-between border-b pb-2">
              <Label className="font-medium">{lot.name}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !lotClosure?.closureDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {lotClosure?.closureDate ? formatDate(lotClosure.closureDate) : <span>Choisir une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={lotClosure?.closureDate}
                    onSelect={(date) => updateLotDate(lot.name, date)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TenderLotsClosureDate;
