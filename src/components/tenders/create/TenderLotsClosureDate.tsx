import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TenderFormProps } from './TenderFormProps';

interface LotClosureDate {
  lotName: string;
  closureDate?: Date;
}

const TenderLotsClosureDate: React.FC<TenderFormProps> = ({ form }) => {
  const [lotClosureDates, setLotClosureDates] = useState<LotClosureDate[]>([]);
  
  useEffect(() => {
    const lots = form.getValues('construction.lots' as any);
    
    if (!lots || !Array.isArray(lots)) return;
    
    const selectedLots = lots.filter(lot => lot.selected);
    
    // Get existing closure dates
    const existingClosureDates = form.getValues('construction.lotClosureDates' as any);
    
    // Create initial state, preserving existing dates where possible
    const initialLotClosureDates = selectedLots.map(lot => {
      // Try to find existing closure date
      if (existingClosureDates && Array.isArray(existingClosureDates)) {
        const existingDate = existingClosureDates.find(
          date => date.lotName === lot.name
        );
        if (existingDate) {
          return {
            lotName: lot.name,
            closureDate: existingDate.closureDate
          };
        }
      }
      
      // Otherwise create new entry
      return {
        lotName: lot.name,
        closureDate: undefined
      };
    });
    
    setLotClosureDates(initialLotClosureDates);
    form.setValue('construction.lotClosureDates' as any, initialLotClosureDates);
  }, [form]);
  
  const updateDate = (lotName: string, date: Date | undefined) => {
    const updatedDates = lotClosureDates.map(item => 
      item.lotName === lotName ? { ...item, closureDate: date } : item
    );
    
    setLotClosureDates(updatedDates);
    form.setValue('construction.lotClosureDates' as any, updatedDates);
  };
  
  // Format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, "dd MMMM yyyy", { locale: fr });
  };

  if (!lotClosureDates.length) {
    return (
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Dates de clôture par lot</h2>
        <p className="text-muted-foreground">
          Aucun lot sélectionné. Veuillez d'abord sélectionner des lots dans la section précédente.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Dates de clôture par lot</h2>
        <p className="text-muted-foreground mt-1">
          Définissez les dates de clôture pour chaque lot de votre projet
        </p>
      </div>

      <div className="space-y-4">
        {Array.isArray(lotClosureDates) && lotClosureDates.map((lotDate) => (
          <div key={lotDate.lotName} className="flex items-center justify-between border-b pb-2">
            <Label className="font-medium">{lotDate.lotName}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !lotDate.closureDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {lotDate.closureDate ? formatDate(lotDate.closureDate) : <span>Choisir une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={lotDate.closureDate}
                  onSelect={(date) => updateDate(lotDate.lotName, date)}
                  initialFocus
                  className="p-3"
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
