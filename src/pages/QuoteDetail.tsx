
import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import QuoteCard from '@/components/tenders/QuoteCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, FileText, MessageSquare, Building, Calendar } from 'lucide-react';

// Mock data for a single quote
const MOCK_QUOTE = {
  id: 'q1',
  projectId: 'p1',
  projectName: 'Résidence Les Ormes',
  lotId: 'l1',
  lotName: 'Gros œuvre',
  companyId: 'c1',
  companyName: 'Entreprise Durand Construction',
  submissionDate: '2024-05-10',
  amount: 125000,
  status: 'pending' as const,
  isCompliant: true,
  complianceNotes: 'Toutes les spécifications techniques ont été respectées. Les délais proposés correspondent aux attentes.',
  documents: [
    { id: 'd1', name: 'Devis détaillé', type: 'pdf' },
    { id: 'd2', name: 'Références similaires', type: 'pdf' },
    { id: 'd3', name: 'Planning prévisionnel', type: 'pdf' },
  ]
};

export default function QuoteDetail() {
  const { quoteId } = useParams<{ quoteId: string }>();
  
  // This would normally fetch the quote data from an API
  const quote = MOCK_QUOTE;
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleMarkCompliant = () => {
    // This would update the quote status in a real app
    console.log('Marking quote as compliant');
  };

  const handleMarkNonCompliant = () => {
    // This would update the quote status in a real app
    console.log('Marking quote as non-compliant');
  };

  const handleAddComment = () => {
    // This would open a comment dialog in a real app
    console.log('Adding comment');
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Analyse de devis</h1>
          <p className="text-muted-foreground">
            {quote.projectName} - {quote.lotName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Entreprise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-medium">{quote.companyName}</div>
              <Button variant="outline" size="sm" className="mt-2">
                <Building size={14} className="mr-1" />
                Voir le profil
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Date de soumission</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-medium">{formatDate(quote.submissionDate)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Montant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-lg">
                {quote.amount.toLocaleString()} €
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <QuoteCard
              id={quote.id}
              companyName={quote.companyName}
              submissionDate={formatDate(quote.submissionDate)}
              isCompliant={quote.isCompliant}
              price={quote.amount}
              comments={quote.complianceNotes}
              status="pending"
              onView={() => {}}
            />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Documents associés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quote.documents.map(doc => (
                    <Button key={doc.id} variant="outline" className="justify-start">
                      <FileText size={14} className="mr-2" />
                      {doc.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleMarkCompliant}>
                  <Check size={14} className="mr-2" />
                  Marquer comme conforme
                </Button>
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleMarkNonCompliant}>
                  <X size={14} className="mr-2" />
                  Marquer comme non conforme
                </Button>
                <Button className="w-full" variant="outline" onClick={handleAddComment}>
                  <MessageSquare size={14} className="mr-2" />
                  Ajouter un commentaire
                </Button>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Analyse technique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Utilisez cette section pour ajouter votre analyse technique du devis.
                </p>
                <Button variant="outline" className="w-full">
                  <FileText size={14} className="mr-2" />
                  Ajouter une analyse
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
