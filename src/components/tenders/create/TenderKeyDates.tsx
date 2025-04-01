
import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TenderFormProps } from './TenderFormProps';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface KeyDate {
  id: string;
  name: string;
  date: Date | undefined;
}

// Liste des suggestions d'événements pour les projets de construction
const EVENT_SUGGESTIONS = [
  'Démarrage du projet',
  'Démarrage du désamiantage',
  'Démarrage de la démolition', 
  'Démarrage du terrassement',
  'Démarrage du Gros Œuvre',
  'Démarrage des corps d\'états techniques',
  'Réunion de lancement',
  'Validation des plans',
  'Réception des travaux',
  'Remise des clés',
  'Livraison',
  'Levée des réserves',
  'Pose de la première pierre',
  'Fin du gros œuvre',
  'Démarrage des finitions',
  'Installation des équipements',
];

const TenderKeyDates: React.FC<TenderFormProps> = ({ form }) => {
  const { toast } = useToast();
  
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
  const existingDates = form.getValues('construction.keyDates' as any);
  let initialKeyDates: KeyDate[] = defaultKeyDates;
  
  if (existingDates && Array.isArray(existingDates)) {
    initialKeyDates = existingDates.map(date => ({
      id: date.id || '', 
      name: date.name || '', 
      date: date.date
    }));
  }

  const [keyDates, setKeyDates] = useState<KeyDate[]>(initialKeyDates);
  const [newEventName, setNewEventName] = useState<string>('');

  // Trie les dates à chaque modification
  useEffect(() => {
    sortAndUpdateDates();
  }, [keyDates]);

  const sortAndUpdateDates = () => {
    // Trier les dates chronologiquement
    const sortedDates = [...keyDates].sort((a, b) => {
      // Dates non définies vont à la fin
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      
      return a.date.getTime() - b.date.getTime();
    });
    
    if (JSON.stringify(sortedDates) !== JSON.stringify(keyDates)) {
      setKeyDates(sortedDates);
      form.setValue('construction.keyDates' as any, sortedDates);
    }
  };

  const updateDate = (id: string, date: Date | undefined) => {
    const updatedDates = keyDates.map(item => 
      item.id === id ? { ...item, date } : item
    );
    
    setKeyDates(updatedDates);
    form.setValue('construction.keyDates' as any, updatedDates);
  };

  const addNewDate = () => {
    if (!newEventName.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un nom pour l'événement",
        variant: "destructive",
      });
      return;
    }
    
    const newKeyDate: KeyDate = {
      id: `event-${Date.now()}`,
      name: newEventName,
      date: undefined
    };
    
    const updatedDates = [...keyDates, newKeyDate];
    setKeyDates(updatedDates);
    form.setValue('construction.keyDates' as any, updatedDates);
    setNewEventName('');
    
    toast({
      title: "Événement ajouté",
      description: `L'événement "${newEventName}" a été ajouté avec succès`,
    });
  };

  const addSuggestedEvent = (eventName: string) => {
    const newKeyDate: KeyDate = {
      id: `event-${Date.now()}`,
      name: eventName,
      date: undefined
    };
    
    const updatedDates = [...keyDates, newKeyDate];
    setKeyDates(updatedDates);
    form.setValue('construction.keyDates' as any, updatedDates);
    
    toast({
      title: "Événement ajouté",
      description: `L'événement "${eventName}" a été ajouté avec succès`,
    });
  };

  const removeDate = (id: string) => {
    const updatedDates = keyDates.filter(item => item.id !== id);
    setKeyDates(updatedDates);
    form.setValue('construction.keyDates' as any, updatedDates);
    
    toast({
      title: "Événement supprimé",
      description: "L'événement a été supprimé avec succès",
    });
  };

  // Format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, "dd MMMM yyyy", { locale: fr });
  };

  // Filtre les suggestions qui ne sont pas déjà dans les dates clés
  const filteredSuggestions = EVENT_SUGGESTIONS.filter(
    suggestion => !keyDates.some(date => date.name === suggestion)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Dates clés du projet</h2>
          <p className="text-muted-foreground mt-1">
            Définissez les jalons importants de votre projet de construction
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="flex gap-2">
            <Input
              placeholder="Nom de l'événement"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              className="w-64"
            />
            <Button onClick={addNewDate} size="sm" className="flex gap-1 items-center">
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Suggestions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => addSuggestedEvent(suggestion)}
                  >
                    {suggestion}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>
                  Toutes les suggestions ont été ajoutées
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-4">
        {keyDates.length === 0 ? (
          <div className="text-center py-8 border rounded-md bg-muted/20">
            <p className="text-muted-foreground">Aucune date clé définie. Ajoutez des événements pour commencer.</p>
          </div>
        ) : (
          keyDates.map((keyDate) => (
            <div key={keyDate.id} className="flex items-center justify-between border-b pb-2">
              <Label htmlFor={keyDate.id} className="font-medium">{keyDate.name}</Label>
              <div className="flex items-center gap-2">
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
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeDate(keyDate.id)}
                  className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TenderKeyDates;
