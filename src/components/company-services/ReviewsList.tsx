
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageSquare, Filter } from 'lucide-react';
import { CompanyReview, Service } from "@/types/company-services";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ReviewsListProps {
  reviews: CompanyReview[];
  services: Service[];
}

export function ReviewsList({ reviews, services }: ReviewsListProps) {
  const [filterService, setFilterService] = useState<string>('all');
  
  const filteredReviews = filterService === 'all' 
    ? reviews 
    : reviews.filter(review => review.serviceId === filterService);
  
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
      />
    ));
  };

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageSquare size={18} />
          Avis clients
        </CardTitle>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {renderStars(averageRating)}
            <span className="ml-2 text-muted-foreground">
              ({averageRating.toFixed(1)}/5 - {reviews.length} avis)
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <div className="w-full max-w-xs flex items-center gap-2">
            <Filter size={16} />
            <Select value={filterService} onValueChange={setFilterService}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les services</SelectItem>
                {services.map(service => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Aucun avis trouvé pour ce service.
            </p>
          ) : (
            filteredReviews.map(review => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{review.author}</div>
                    {review.authorCompany && (
                      <div className="text-sm text-muted-foreground">
                        {review.authorCompany}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                </div>
                
                {review.serviceId && services.find(s => s.id === review.serviceId) && (
                  <div className="text-sm text-muted-foreground mb-2">
                    Service: {services.find(s => s.id === review.serviceId)?.name}
                  </div>
                )}
                
                <p className="text-muted-foreground">{review.comment}</p>
                
                <div className="text-xs text-muted-foreground mt-2">
                  {new Date(review.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
