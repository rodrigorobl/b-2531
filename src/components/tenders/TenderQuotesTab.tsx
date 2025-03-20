import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowDownUp, Users, PieChart, FileText, CheckCircle, Calendar, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Quote {
  id: string;
  companyName: string;
  submissionDate: string;
  isCompliant: boolean;
  price: number;
  comments: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Category {
  id: string;
  name: string;
  quotes: Quote[];
}

interface TenderQuotesTabProps {
  tenderId: string;
  categories: Category[];
}

export function TenderQuotesTab({ tenderId, categories }: TenderQuotesTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categories.length > 0 ? categories[0].id : null
  );
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  const getSortedQuotes = (quotes: Quote[]) => {
    if (!sortConfig) return quotes;
    return [...quotes].sort((a, b) => {
      if (sortConfig.key === 'price') {
        return sortConfig.direction === 'asc' ? a.price - b.price : b.price - a.price;
      }
      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc' 
          ? new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime() 
          : new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
      }
      return 0;
    });
  };

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({
      key,
      direction
    });
  };

  const getCategoryEvaluation = (quotesCount: number) => {
    if (quotesCount >= 4) return {
      label: 'Bon',
      color: 'bg-green-500'
    };
    if (quotesCount >= 2) return {
      label: 'Moyen',
      color: 'bg-amber-500'
    };
    return {
      label: 'Mauvais',
      color: 'bg-red-500'
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="space-y-1">
        {categories.map(category => {
          const evaluation = getCategoryEvaluation(category.quotes.length);
          return (
            <button 
              key={category.id} 
              onClick={() => setSelectedCategory(category.id)} 
              className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors ${
                selectedCategory === category.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              <span>{category.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm mr-2">{category.quotes.length}</span>
                <div className={`w-2 h-2 rounded-full ${
                  selectedCategory === category.id ? 'bg-white' : evaluation.color
                }`}></div>
                {category.quotes.length > 0 && (
                  <Link 
                    to={`/tender/${tenderId}/lot/${category.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`text-xs ${
                      selectedCategory === category.id ? 'text-white' : 'text-primary'
                    } hover:underline`}
                  >
                    <PieChart size={12} />
                  </Link>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="md:col-span-3">
        {selectedCategoryData ? (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Devis pour {selectedCategoryData.name}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="ml-2">
                    {selectedCategoryData.quotes.length} devis
                  </Badge>
                  {selectedCategoryData.quotes.length > 0 && (
                    <Link 
                      to={`/tender/${tenderId}/lot/${selectedCategoryData.id}`}
                      className="text-primary hover:underline inline-flex items-center"
                    >
                      <PieChart size={14} className="mr-1" />
                      Analyser le lot
                    </Link>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCategoryData.quotes.length > 0 ? (
                <div>
                  <div className="flex justify-end mb-3 gap-2">
                    <Button variant="outline" size="sm" onClick={() => requestSort('date')} className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      Date
                      {sortConfig?.key === 'date' && <ArrowDownUp size={14} className="ml-1" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => requestSort('price')} className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      Prix
                      {sortConfig?.key === 'price' && <ArrowDownUp size={14} className="ml-1" />}
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {getSortedQuotes(selectedCategoryData.quotes).map(quote => (
                      <Card key={quote.id} className="overflow-hidden">
                        <div className={`h-1 w-full ${quote.isCompliant ? 'bg-green-500' : 'bg-red-500'}`} />
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{quote.companyName}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Calendar size={14} className="mr-1" />
                                <span>Soumis le {quote.submissionDate}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg">{quote.price.toLocaleString()} €</div>
                              <Badge variant="outline" className={`mt-1 ${quote.isCompliant ? 'text-green-600' : 'text-red-500'}`}>
                                {quote.isCompliant ? (
                                  <><CheckCircle size={12} className="mr-1" /> Conforme</>
                                ) : (
                                  <><AlertTriangle size={12} className="mr-1" /> Non conforme</>
                                )}
                              </Badge>
                            </div>
                          </div>
                          
                          {quote.comments && (
                            <div className="mt-3 text-sm bg-muted p-3 rounded-md">
                              <p className="font-medium mb-1">Commentaires:</p>
                              <p>{quote.comments}</p>
                            </div>
                          )}
                          
                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <FileText size={14} className="mr-1" />
                              Voir le devis
                            </Button>
                            {quote.status === 'pending' && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle size={14} className="mr-1" />
                                Accepter
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-3" />
                  <h3 className="font-medium text-lg mb-1">Aucun devis reçu</h3>
                  <p className="text-muted-foreground">
                    Il n'y a pas encore de devis pour cette catégorie.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Sélectionnez une catégorie</p>
          </div>
        )}
      </div>
    </div>
  );
}
