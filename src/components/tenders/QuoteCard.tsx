
import React from 'react';
import { Calendar, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface QuoteProps {
  id: string;
  companyName: string;
  submissionDate: string;
  isCompliant: boolean;
  price: number;
  comments?: string;
  status: 'pending' | 'approved' | 'rejected';
  onApprove?: (id: string) => void;
  onView?: (id: string) => void;
}

export default function QuoteCard({
  id,
  companyName,
  submissionDate,
  isCompliant,
  price,
  comments,
  status,
  onApprove,
  onView
}: QuoteProps) {
  return (
    <Card className="overflow-hidden">
      <div className={`h-1 w-full ${isCompliant ? 'bg-green-500' : 'bg-red-500'}`} />
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{companyName}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar size={14} className="mr-1" />
              <span>Soumis le {submissionDate}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">{price.toLocaleString()} €</div>
            <Badge variant="outline" className={`mt-1 ${isCompliant ? 'text-green-600' : 'text-red-500'}`}>
              {isCompliant ? (
                <><CheckCircle size={12} className="mr-1" /> Conforme</>
              ) : (
                <><AlertTriangle size={12} className="mr-1" /> Non conforme</>
              )}
            </Badge>
          </div>
        </div>
        
        {comments && (
          <div className="mt-3 text-sm bg-muted p-3 rounded-md">
            <p className="font-medium mb-1">Commentaires:</p>
            <p>{comments}</p>
          </div>
        )}
        
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => onView && onView(id)}>
            <FileText size={14} className="mr-1" />
            Voir le devis
          </Button>
          {status === 'pending' && onApprove && (
            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => onApprove(id)}>
              <CheckCircle size={14} className="mr-1" />
              Accepter
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
