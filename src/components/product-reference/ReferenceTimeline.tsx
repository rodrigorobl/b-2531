
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle, ArrowRight, Clock, Plus, Trash, Pencil, Save, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProfile } from '@/contexts/ProfileContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface TimelineEvent {
  id?: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'cancelled' | string;
}

interface ReferenceTimelineProps {
  timeline: TimelineEvent[];
  onTimelineChange?: (timeline: TimelineEvent[]) => void;
  readOnly?: boolean;
}

// Form validation schema
const timelineEventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Le titre est requis"),
  date: z.string().min(1, "La date est requise"),
  description: z.string().min(1, "La description est requise"),
  status: z.enum(["completed", "pending", "cancelled"]),
});

type TimelineEventFormValues = z.infer<typeof timelineEventSchema>;

export default function ReferenceTimeline({ timeline: initialTimeline, onTimelineChange, readOnly = false }: ReferenceTimelineProps) {
  const { activeProfile } = useProfile();
  const { toast } = useToast();
  const [timeline, setTimeline] = useState<TimelineEvent[]>(initialTimeline);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<TimelineEvent | null>(null);
  
  const form = useForm<TimelineEventFormValues>({
    resolver: zodResolver(timelineEventSchema),
    defaultValues: {
      title: "",
      date: new Date().toISOString().split('T')[0],
      description: "",
      status: "pending",
    },
  });

  const isEditable = activeProfile === 'industriel' && !readOnly;

  const handleAddEvent = () => {
    form.reset({
      title: "",
      date: new Date().toISOString().split('T')[0],
      description: "",
      status: "pending",
    });
    setIsAddDialogOpen(true);
  };

  const handleEditEvent = (event: TimelineEvent, index: number) => {
    setCurrentEvent({ ...event, id: index.toString() });
    form.reset({
      id: index.toString(),
      title: event.title,
      date: event.date,
      description: event.description,
      status: event.status as "completed" | "pending" | "cancelled",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteEvent = (index: number) => {
    const newTimeline = [...timeline];
    newTimeline.splice(index, 1);
    setTimeline(newTimeline);
    if (onTimelineChange) {
      onTimelineChange(newTimeline);
    }
    toast({
      title: "Étape supprimée",
      description: "L'étape a été supprimée avec succès",
    });
  };

  const onSubmit = (data: TimelineEventFormValues) => {
    const newTimeline = [...timeline];
    const newEvent: TimelineEvent = {
      date: data.date,
      title: data.title,
      description: data.description,
      status: data.status,
    };

    if (data.id !== undefined) {
      // Edit existing event
      const index = parseInt(data.id);
      newTimeline[index] = newEvent;
      setIsEditDialogOpen(false);
      toast({
        title: "Étape modifiée",
        description: "L'étape a été modifiée avec succès",
      });
    } else {
      // Add new event
      newTimeline.push(newEvent);
      setIsAddDialogOpen(false);
      toast({
        title: "Étape ajoutée",
        description: "L'étape a été ajoutée avec succès",
      });
    }

    setTimeline(newTimeline);
    if (onTimelineChange) {
      onTimelineChange(newTimeline);
    }
    form.reset();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-primary" />;
      case 'pending':
        return <Clock size={16} className="text-muted-foreground" />;
      case 'cancelled':
        return <X size={16} className="text-destructive" />;
      default:
        return <ArrowRight size={16} className="text-muted-foreground" />;
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Historique et Planning du Référencement
          </CardTitle>
          
          {isEditable && (
            <Button 
              size="sm" 
              onClick={handleAddEvent}
              className="gap-1"
            >
              <Plus className="h-4 w-4" /> 
              Ajouter une étape
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative pl-8 space-y-6 pb-6">
          {/* Timeline vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-primary/20"></div>
          
          {timeline.map((event, index) => (
            <div key={index} className="relative">
              {/* Timeline bullet */}
              <div 
                className={`absolute -left-8 h-8 w-8 rounded-full flex items-center justify-center
                  ${event.status === 'completed' ? 'bg-primary/10' : 
                    event.status === 'cancelled' ? 'bg-destructive/10' : 'bg-muted'}
                `}
              >
                {getStatusIcon(event.status)}
              </div>
              
              <div className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{event.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={event.status === 'completed' ? 'default' : 
                      event.status === 'cancelled' ? 'destructive' : 'outline'}>
                      {event.date}
                    </Badge>
                    
                    {isEditable && (
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleEditEvent(event, index)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteEvent(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
          
          {timeline.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Aucune étape n'a encore été ajoutée. Cliquez sur "Ajouter une étape" pour commencer.
            </div>
          )}
        </div>
      </CardContent>

      {/* Add Event Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Ajouter une étape</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input placeholder="Titre de l'étape" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Description de l'étape" 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="completed">Terminé</SelectItem>
                        <SelectItem value="cancelled">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Modifier une étape</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input placeholder="Titre de l'étape" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Description de l'étape" 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="completed">Terminé</SelectItem>
                        <SelectItem value="cancelled">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Sauvegarder
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
