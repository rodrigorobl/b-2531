
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { MessageSquare, Lock } from 'lucide-react';

interface QuoteLineItemAnnotationDialogProps {
  itemId: string;
  onClose: () => void;
  onSave: (annotation: { text: string; isInternal: boolean }) => void;
}

export function QuoteLineItemAnnotationDialog({
  itemId,
  onClose,
  onSave
}: QuoteLineItemAnnotationDialogProps) {
  const [text, setText] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  const handleSave = () => {
    if (text.trim()) {
      onSave({
        text: text.trim(),
        isInternal
      });
    }
  };

  return (
    <Dialog open={!!itemId} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter une annotation</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Saisissez votre annotation ici..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px]"
          />
          
          <RadioGroup value={isInternal.toString()} onValueChange={(value) => setIsInternal(value === 'true')}>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="public" />
                <Label htmlFor="public" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Visible par l'entreprise
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="internal" />
                <Label htmlFor="internal" className="flex items-center">
                  <Lock className="h-4 w-4 mr-1" />
                  Annotation interne
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={!text.trim()}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
