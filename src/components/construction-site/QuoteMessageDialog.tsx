
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Plus, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuoteMessageDialogProps {
  onSendQuote: (quoteData: {
    message: string;
    service: string;
    price: string;
    document?: File;
  }) => void;
  trigger?: React.ReactNode;
}

export function QuoteMessageDialog({ onSendQuote, trigger }: QuoteMessageDialogProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [service, setService] = useState('');
  const [price, setPrice] = useState('');
  const [document, setDocument] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message || !service || !price) {
      toast({
        title: "Information incomplète",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }
    
    onSendQuote({
      message,
      service,
      price,
      document: document || undefined
    });
    
    // Reset form and close dialog
    setMessage('');
    setService('');
    setPrice('');
    setDocument(null);
    setOpen(false);
    
    toast({
      title: "Devis envoyé",
      description: "Votre devis a été transmis avec succès",
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        toast({
          title: "Format non supporté",
          description: "Seuls les fichiers PDF sont acceptés",
          variant: "destructive"
        });
        return;
      }
      setDocument(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="flex items-center gap-2">
            <Plus size={16} />
            Envoyer un devis
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Envoyer un devis</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service">Service proposé *</Label>
            <Input 
              id="service" 
              value={service} 
              onChange={(e) => setService(e.target.value)} 
              placeholder="Ex: Installation électrique, Plomberie, etc."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Prix (€) *</Label>
            <Input 
              id="price" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 1500"
              type="text"
              inputMode="decimal"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea 
              id="message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Décrivez votre proposition..."
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="document">Document PDF du devis</Label>
            <div className="flex items-center gap-2">
              {document ? (
                <div className="flex flex-1 items-center p-2 border rounded-md bg-secondary/20">
                  <FileText size={16} className="mr-2 text-primary" />
                  <span className="text-sm truncate">{document.name}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    className="ml-auto"
                    onClick={() => setDocument(null)}
                  >
                    ×
                  </Button>
                </div>
              ) : (
                <label className="flex-1">
                  <div className="flex items-center justify-center gap-2 p-2 border border-dashed rounded-md bg-background hover:bg-secondary/20 cursor-pointer transition-colors">
                    <Upload size={16} />
                    <span className="text-sm">Choisir un fichier</span>
                  </div>
                  <input 
                    type="file" 
                    id="document" 
                    className="hidden" 
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Envoyer le devis
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
