
import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
}

interface Category {
  id: string;
  name: string;
  quotes: {
    id: string;
    companyName: string;
    submissionDate: string;
    isCompliant: boolean;
    price: number;
    comments: string;
    status: 'pending' | 'approved' | 'rejected';
  }[];
}

interface TenderDocumentsTabProps {
  documents: Document[];
  categories: Category[];
}

export function TenderDocumentsTab({ documents, categories }: TenderDocumentsTabProps) {
  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Documents de l'appel d'offres</span>
            <Button size="sm">
              <Download size={16} className="mr-1.5" />
              Tout télécharger
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Taille</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map(doc => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.type.toUpperCase()}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Tableau comparatif des devis</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lot</TableHead>
                <TableHead>Entreprises</TableHead>
                <TableHead>Prix min</TableHead>
                <TableHead>Prix max</TableHead>
                <TableHead>Écart</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.filter(cat => cat.quotes.length > 0).map(category => {
                const compliantQuotes = category.quotes.filter(q => q.isCompliant);
                const minPrice = compliantQuotes.length > 0 ? Math.min(...compliantQuotes.map(q => q.price)) : null;
                const maxPrice = compliantQuotes.length > 0 ? Math.max(...compliantQuotes.map(q => q.price)) : null;
                const priceDifference = minPrice && maxPrice ? maxPrice - minPrice : null;
                const priceDifferencePercentage = minPrice && priceDifference ? Math.round(priceDifference / minPrice * 100) : null;
                
                return (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.quotes.map(q => q.companyName).join(', ')}</TableCell>
                    <TableCell>{minPrice ? `${minPrice.toLocaleString()} €` : '-'}</TableCell>
                    <TableCell>{maxPrice ? `${maxPrice.toLocaleString()} €` : '-'}</TableCell>
                    <TableCell>
                      {priceDifferencePercentage ? (
                        <span className={priceDifferencePercentage > 20 ? 'text-red-500' : 'text-muted-foreground'}>
                          {priceDifferencePercentage}%
                        </span>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      {category.quotes.some(q => q.status === 'approved') ? (
                        <Badge className="bg-green-600">Attribué</Badge>
                      ) : (
                        <Badge className="bg-amber-500">En attente</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
