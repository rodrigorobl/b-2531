
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface Company {
  id: string;
  name: string;
  status: 'invited' | 'submitted' | 'declined';
  quoteAmount?: number;
  analysisStatus?: 'not-analyzed' | 'compliant' | 'non-compliant';
}

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const navigate = useNavigate();
  
  // Determine card color based on company status
  const cardColor = 
    company.status === 'declined' ? 'bg-red-50 border-red-200' :
    company.status === 'submitted' ? 'bg-blue-50 border-blue-200' :
    'bg-gray-50 border-gray-200';
  
  // Determine analysis status icon and color
  const renderAnalysisStatus = () => {
    if (!company.analysisStatus || company.status !== 'submitted') return null;
    
    switch(company.analysisStatus) {
      case 'compliant':
        return <div className="flex items-center gap-1 text-green-600 text-sm">
          <Check size={14} />
          <span>Conforme</span>
        </div>;
      case 'non-compliant':
        return <div className="flex items-center gap-1 text-red-600 text-sm">
          <X size={14} />
          <span>Non conforme</span>
        </div>;
      case 'not-analyzed':
        return <div className="flex items-center gap-1 text-amber-600 text-sm">
          <AlertCircle size={14} />
          <span>Non analysé</span>
        </div>;
      default:
        return null;
    }
  };
  
  const handleClick = () => {
    // Navigate to company details page
    navigate(`/company-detail/${company.id}`);
  };

  return (
    <Card 
      className={cn(
        "min-w-64 cursor-pointer transition-all hover:shadow-md",
        cardColor
      )}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <h4 className="font-medium mb-2">{company.name}</h4>
        
        {company.status === 'submitted' && company.quoteAmount && (
          <div className="text-sm font-semibold mb-2">
            {company.quoteAmount.toLocaleString()} €
          </div>
        )}
        
        <div className="mt-auto">
          {company.status === 'invited' && (
            <div className="text-gray-600 text-sm">Invitation en attente</div>
          )}
          
          {company.status === 'declined' && (
            <div className="text-red-600 text-sm">A décliné</div>
          )}
          
          {renderAnalysisStatus()}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
