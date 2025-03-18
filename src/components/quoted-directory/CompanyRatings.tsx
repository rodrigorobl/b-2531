
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Filter,
  CalendarDays,
  User,
  Building
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface Rating {
  id: string;
  overall: number;
  commercial: number;
  projectManagement: number;
  customerService: number;
  comment: string;
  author: string;
  authorRole: string;
  date: string;
  isPositive: boolean;
}

interface CompanyRatingsProps {
  companyId: string;
}

export default function CompanyRatings({ companyId }: CompanyRatingsProps) {
  const [timePeriod, setTimePeriod] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  
  // Mock data for company ratings
  const ratings: Rating[] = [
    {
      id: '1',
      overall: 5,
      commercial: 5,
      projectManagement: 4,
      customerService: 5,
      comment: 'Excellente prestation de bout en bout. L\'équipe a été très professionnelle et à l\'écoute de nos besoins. Je recommande vivement cette agence pour des projets d\'envergure.',
      author: 'Jean-Pierre Durand',
      authorRole: 'Promoteur immobilier',
      date: '2023-12-15',
      isPositive: true
    },
    {
      id: '2',
      overall: 4,
      commercial: 5,
      projectManagement: 4,
      customerService: 3,
      comment: 'Très bonne conception architecturale et bon suivi de projet. Quelques difficultés de communication lors de la phase finale, mais globalement satisfait du résultat.',
      author: 'Marie Lefort',
      authorRole: 'Directrice d\'établissement',
      date: '2023-10-22',
      isPositive: true
    },
    {
      id: '3',
      overall: 3,
      commercial: 4,
      projectManagement: 2,
      customerService: 3,
      comment: 'Projet livré avec quelques mois de retard, mais la qualité architecturale est au rendez-vous. Le suivi de chantier aurait pu être plus rigoureux.',
      author: 'Philippe Martin',
      authorRole: 'Maître d\'ouvrage',
      date: '2023-08-05',
      isPositive: false
    },
    {
      id: '4',
      overall: 5,
      commercial: 5,
      projectManagement: 5,
      customerService: 5,
      comment: 'Une collaboration parfaite du début à la fin. L\'équipe a su répondre à toutes nos exigences et s\'est montrée force de proposition. Le résultat dépasse nos attentes.',
      author: 'Sophie Dubois',
      authorRole: 'Directrice de projet',
      date: '2023-05-30',
      isPositive: true
    },
  ];
  
  // Filter ratings based on time period and rating filter
  const filteredRatings = ratings.filter(rating => {
    const ratingDate = new Date(rating.date);
    const now = new Date();
    const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
    const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 3)); // now is already at -3, so this becomes -6
    const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
    
    // Filter by time period
    if (timePeriod === '3months' && ratingDate < threeMonthsAgo) return false;
    if (timePeriod === '6months' && ratingDate < sixMonthsAgo) return false;
    if (timePeriod === '1year' && ratingDate < oneYearAgo) return false;
    
    // Filter by rating type
    if (ratingFilter === 'positive' && !rating.isPositive) return false;
    if (ratingFilter === 'negative' && rating.isPositive) return false;
    
    return true;
  });
  
  // Calculate average ratings
  const calculateAverage = (field: keyof Pick<Rating, 'overall' | 'commercial' | 'projectManagement' | 'customerService'>) => {
    return ratings.reduce((sum, rating) => sum + rating[field], 0) / ratings.length;
  };
  
  const averageOverall = calculateAverage('overall');
  const averageCommercial = calculateAverage('commercial');
  const averageProjectManagement = calculateAverage('projectManagement');
  const averageCustomerService = calculateAverage('customerService');
  
  // Format date to French format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  // Render stars for rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "fill-amber-500 text-amber-500" : "text-gray-300"} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Average rating card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star size={18} className="text-amber-500" />
            Note globale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-4xl font-bold text-amber-500">{averageOverall.toFixed(1)}</span>
                <div className="flex flex-col">
                  <div className="flex">
                    {renderStars(Math.round(averageOverall))}
                  </div>
                  <span className="text-sm text-muted-foreground mt-1">
                    {ratings.length} avis
                  </span>
                </div>
              </div>
              
              <div className="w-full space-y-3 mt-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Démarche commerciale</span>
                    <span>{averageCommercial.toFixed(1)}/5</span>
                  </div>
                  <Progress value={averageCommercial * 20} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Suivi de chantier</span>
                    <span>{averageProjectManagement.toFixed(1)}/5</span>
                  </div>
                  <Progress value={averageProjectManagement * 20} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>SAV</span>
                    <span>{averageCustomerService.toFixed(1)}/5</span>
                  </div>
                  <Progress value={averageCustomerService * 20} className="h-2" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-full max-w-xs">
                <h3 className="font-medium mb-4">Évolution des notes</h3>
                <div className="p-4 border rounded-md flex items-center justify-center h-40 bg-muted/30">
                  <span className="text-muted-foreground text-sm">
                    Graphique d'évolution des notes
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Évolution de la note globale sur les 12 derniers mois
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Reviews card */}
      <Card>
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare size={18} />
            Avis ({filteredRatings.length})
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-36 h-8">
                <CalendarDays size={14} className="mr-2" />
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les périodes</SelectItem>
                <SelectItem value="3months">3 derniers mois</SelectItem>
                <SelectItem value="6months">6 derniers mois</SelectItem>
                <SelectItem value="1year">12 derniers mois</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-36 h-8">
                <Filter size={14} className="mr-2" />
                <SelectValue placeholder="Notation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les avis</SelectItem>
                <SelectItem value="positive">Avis positifs</SelectItem>
                <SelectItem value="negative">Avis négatifs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredRatings.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                Aucun avis correspondant aux critères sélectionnés
              </div>
            ) : (
              filteredRatings.map((rating, index) => (
                <div key={rating.id}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-2">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User size={18} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{rating.author}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building size={14} />
                            <span>{rating.authorRole}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex">
                          {renderStars(rating.overall)}
                        </div>
                        <span className="text-sm text-muted-foreground mt-1">
                          {formatDate(rating.date)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pl-12">
                      <p className="text-sm">{rating.comment}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-3">
                        <Badge variant="outline" className="flex items-center gap-1">
                          Démarche commerciale
                          <span className="ml-1 flex">
                            {renderStars(rating.commercial)}
                          </span>
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          Suivi de chantier
                          <span className="ml-1 flex">
                            {renderStars(rating.projectManagement)}
                          </span>
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          SAV
                          <span className="ml-1 flex">
                            {renderStars(rating.customerService)}
                          </span>
                        </Badge>
                      </div>
                      
                      <div className="mt-3 flex gap-2">
                        <Badge variant={rating.isPositive ? "outline" : "secondary"} className="flex items-center gap-1">
                          <ThumbsUp size={14} />
                          Recommande
                        </Badge>
                        <Badge variant={!rating.isPositive ? "outline" : "secondary"} className="flex items-center gap-1">
                          <ThumbsDown size={14} />
                          Ne recommande pas
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {index < filteredRatings.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
