
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MessageSquare, Lock, User, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Annotation {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  isInternal: boolean;
  itemId?: string;
  itemName?: string;
}

interface QuoteLineItem {
  id: string;
  designation: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  discount?: number;
  observations?: string;
  annotations?: {
    id: string;
    text: string;
    author: string;
    timestamp: string;
    isInternal: boolean;
  }[];
}

interface QuoteAnnotationsProps {
  quoteId: string;
  lineItems: QuoteLineItem[];
}

export default function QuoteAnnotations({ quoteId, lineItems }: QuoteAnnotationsProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [newComment, setNewComment] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  // Récupérer toutes les annotations des lignes
  const getAllAnnotations = (): Annotation[] => {
    const allAnnotations: Annotation[] = [];
    
    lineItems.forEach(item => {
      if (item.annotations && item.annotations.length > 0) {
        item.annotations.forEach(annotation => {
          allAnnotations.push({
            ...annotation,
            itemId: item.id,
            itemName: item.designation
          });
        });
      }
    });
    
    // Ajout de quelques commentaires généraux pour l'exemple
    allAnnotations.push({
      id: 'gen-001',
      text: 'Le devis est globalement conforme aux attentes, quelques points à éclaircir sur les fondations.',
      author: 'Marie Durand',
      timestamp: '2024-05-02 09:15',
      isInternal: false
    });
    
    allAnnotations.push({
      id: 'gen-002',
      text: 'Nous devons demander une réduction de 5% sur l'ensemble avant de valider.',
      author: 'Thomas Bernard',
      timestamp: '2024-05-03 11:30',
      isInternal: true
    });
    
    // Tri par date (du plus récent au plus ancien)
    return allAnnotations.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };
  
  const annotations = getAllAnnotations();
  
  // Filtrer les annotations en fonction de l'onglet actif
  const filteredAnnotations = activeTab === 'all' 
    ? annotations 
    : activeTab === 'internal' 
      ? annotations.filter(a => a.isInternal) 
      : annotations.filter(a => !a.isInternal);

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log('New comment:', {
        text: newComment,
        isInternal,
        quoteId
      });
      
      // Dans une application réelle, vous appelleriez une API ici
      // puis vous mettriez à jour l'état local
      
      setNewComment('');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Envoyer un commentaire</h2>
          </div>
          
          <div className="space-y-4">
            <Textarea
              placeholder="Saisissez votre commentaire ici..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Switch
                  id="comment-visibility"
                  checked={isInternal}
                  onCheckedChange={setIsInternal}
                />
                <Label htmlFor="comment-visibility" className="flex items-center">
                  <Lock className="h-4 w-4 mr-1" />
                  Commentaire interne uniquement
                </Label>
              </div>
              
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Envoyer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Tous ({annotations.length})</TabsTrigger>
            <TabsTrigger value="public">Publics ({annotations.filter(a => !a.isInternal).length})</TabsTrigger>
            <TabsTrigger value="internal">Internes ({annotations.filter(a => a.isInternal).length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredAnnotations.length > 0 ? (
                    filteredAnnotations.map(annotation => (
                      <div key={annotation.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center text-primary-foreground mr-2">
                              {annotation.author.split(' ').map(name => name[0]).join('')}
                            </div>
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium">{annotation.author}</span>
                                {annotation.isInternal && (
                                  <span className="ml-2 flex items-center text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                    <Lock className="h-3 w-3 mr-1" />
                                    Interne
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {annotation.timestamp}
                              </div>
                            </div>
                          </div>
                          
                          {annotation.itemName && (
                            <div className="text-xs bg-muted px-2 py-1 rounded">
                              Poste: {annotation.itemName}
                            </div>
                          )}
                        </div>
                        
                        <p className="text-sm">{annotation.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      <p>Aucun commentaire pour le moment</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
