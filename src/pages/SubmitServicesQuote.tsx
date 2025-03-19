
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, FileText, Send, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function SubmitServicesQuote() {
  const { tenderId } = useParams<{ tenderId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [quoteTitle, setQuoteTitle] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [message, setMessage] = useState('');
  const [items, setItems] = useState<QuoteItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0 }
  ]);
  const [files, setFiles] = useState<File[]>([]);

  const handleBack = () => {
    navigate(`/services-tender-details/${tenderId}`);
  };

  const handleAddItem = () => {
    const newId = (items.length + 1).toString();
    setItems([...items, { id: newId, description: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof QuoteItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier les champs obligatoires
    if (!quoteTitle || items.some(item => !item.description || item.unitPrice <= 0)) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }
    
    // Dans une application réelle, nous enverrions les données au serveur ici
    toast({
      title: "Devis soumis avec succès",
      description: "Votre devis a été envoyé au client",
    });
    
    // Rediriger vers la page de détails du devis
    // Dans une vraie application, on récupérerait l'ID du devis créé
    navigate(`/services-detail-tender/quote-123`);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <Button variant="outline" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'appel d'offres
        </Button>

        <h1 className="text-2xl font-bold mb-6">Soumettre un devis</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quoteTitle">Titre du devis *</Label>
                  <Input 
                    id="quoteTitle" 
                    value={quoteTitle} 
                    onChange={(e) => setQuoteTitle(e.target.value)} 
                    placeholder="Ex: Devis pour location de conteneurs"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validUntil">Validité du devis jusqu'au</Label>
                  <Input 
                    id="validUntil" 
                    type="date" 
                    value={validUntil} 
                    onChange={(e) => setValidUntil(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryTime">Délai de livraison estimé</Label>
                  <Input 
                    id="deliveryTime" 
                    value={deliveryTime} 
                    onChange={(e) => setDeliveryTime(e.target.value)} 
                    placeholder="Ex: 2 semaines après confirmation"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Détail du devis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-6 md:col-span-7">
                    <Label htmlFor={`description-${item.id}`} className={index === 0 ? "" : "sr-only"}>
                      Description *
                    </Label>
                    <Input 
                      id={`description-${item.id}`} 
                      value={item.description} 
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} 
                      placeholder="Description de la prestation"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor={`quantity-${item.id}`} className={index === 0 ? "" : "sr-only"}>
                      Quantité
                    </Label>
                    <Input 
                      id={`quantity-${item.id}`} 
                      type="number" 
                      min="1"
                      value={item.quantity} 
                      onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value))} 
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <Label htmlFor={`unitPrice-${item.id}`} className={index === 0 ? "" : "sr-only"}>
                      Prix unitaire (€) *
                    </Label>
                    <Input 
                      id={`unitPrice-${item.id}`} 
                      type="number" 
                      min="0"
                      step="0.01"
                      value={item.unitPrice} 
                      onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value))} 
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    {items.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddItem}
                className="mt-2"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter une ligne
              </Button>

              <div className="flex justify-end">
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-sm">Total HT:</div>
                  <div className="text-xl font-bold">{calculateTotal().toLocaleString()} €</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message et pièces jointes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Message au client</Label>
                <Textarea 
                  id="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Ajoutez des précisions sur votre offre..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Documents joints</Label>
                
                {files.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm flex-1 truncate">{file.name}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveFile(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <label className="flex-1">
                    <div className="flex items-center justify-center gap-2 p-3 border border-dashed rounded-md hover:bg-secondary/20 cursor-pointer transition-colors">
                      <Upload className="h-4 w-4" />
                      <span>Ajouter des fichiers</span>
                    </div>
                    <input 
                      type="file" 
                      multiple 
                      className="hidden" 
                      onChange={handleFileChange} 
                    />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleBack}>
              Annuler
            </Button>
            <Button type="submit">
              <Send className="mr-2 h-4 w-4" />
              Soumettre le devis
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
