
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Check } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface Company {
  id: string;
  name: string;
}

interface RelaunchTenderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: RelaunchFormData) => void;
  companies: Company[];
}

interface RelaunchFormData {
  type: 'all' | 'selected';
  selectedCompanies: string[];
  closureDate: string;
}

export function RelaunchTenderDialog({
  open,
  onOpenChange,
  onSubmit,
  companies
}: RelaunchTenderDialogProps) {
  const [relaunchtType, setRelaunchType] = useState<'all' | 'selected'>('all');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(
    // Default to 2 weeks from now
    new Date(new Date().setDate(new Date().getDate() + 14))
  );

  const handleCompanyToggle = (companyId: string) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId)
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleSubmit = () => {
    if (!date) return;
    
    onSubmit({
      type: relaunchtType,
      selectedCompanies: relaunchtType === 'selected' ? selectedCompanies : [],
      closureDate: format(date, 'dd/MM/yyyy')
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Relancer l'appel d'offre</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-6">
            <RadioGroup 
              value={relaunchtType} 
              onValueChange={(value) => setRelaunchType(value as 'all' | 'selected')}
              className="space-y-4"
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="all" id="all" />
                <div>
                  <Label htmlFor="all" className="font-medium">
                    Relancer l'appel d'offre et permettre à toutes les entreprises de participer
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    L'appel d'offre sera ouvert à toutes les entreprises éligibles pour ce lot.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="selected" id="selected" />
                <div className="flex-1">
                  <Label htmlFor="selected" className="font-medium">
                    Relancer l'appel d'offre avec les entreprises sélectionnées
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Seules les entreprises sélectionnées ci-dessous seront invitées à participer.
                  </p>
                  
                  {relaunchtType === 'selected' && (
                    <div className="mt-3 space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
                      {companies.map(company => (
                        <div key={company.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`company-${company.id}`}
                            checked={selectedCompanies.includes(company.id)}
                            onCheckedChange={() => handleCompanyToggle(company.id)}
                          />
                          <Label 
                            htmlFor={`company-${company.id}`}
                            className="text-sm"
                          >
                            {company.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label>Date de clôture de l'appel d'offre</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'dd MMMM yyyy', { locale: fr }) : <span>Sélectionner une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button 
            onClick={handleSubmit}
            disabled={relaunchtType === 'selected' && selectedCompanies.length === 0 || !date}
          >
            <Check className="mr-1 h-4 w-4" />
            Relancer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
