
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Download, FileText, Folder, Eye } from 'lucide-react';

interface SearchResult {
  id: string;
  name: string;
  path: string;
  type: string;
  size: number;
  lastModified: string;
  matchScore: number; // Used for sorting results
}

export function FileSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedResults, setSelectedResults] = useState<Record<string, boolean>>({});

  // Mock search function
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock search results
      const results: SearchResult[] = [
        {
          id: 'search-1',
          name: 'CCTP_Lot1_Gros_oeuvre.pdf',
          path: '02_CCTP/CCTP_Lot1_Gros_oeuvre.pdf',
          type: 'pdf',
          size: 1500000,
          lastModified: '20/04/2023',
          matchScore: 0.9,
        },
        {
          id: 'search-2',
          name: 'Plan_RDC.pdf',
          path: '01_Plans/Plans Architecte/Plan_RDC.pdf',
          type: 'pdf',
          size: 2500000,
          lastModified: '15/04/2023',
          matchScore: 0.7,
        },
        {
          id: 'search-3',
          name: 'DPGF_Lot1.xlsx',
          path: '03_DPGF/DPGF_Lot1.xlsx',
          type: 'xlsx',
          size: 500000,
          lastModified: '22/04/2023',
          matchScore: 0.6,
        },
        {
          id: 'search-4',
          name: 'Règlement d\'appel d\'offres.pdf',
          path: 'Règlement d\'appel d\'offres.pdf',
          type: 'pdf',
          size: 3500000,
          lastModified: '25/04/2023',
          matchScore: 0.5,
        },
      ].filter(result => {
        if (selectedFilter === 'all') return true;
        return result.type === selectedFilter;
      });
      
      setSearchResults(results);
      setIsSearching(false);
    }, 800);
  };

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  // Handle checkbox change
  const handleCheckboxChange = (resultId: string, checked: boolean) => {
    setSelectedResults(prev => ({
      ...prev,
      [resultId]: checked
    }));
  };

  // Calculate total size of selected results
  const calculateSelectedSize = () => {
    return searchResults
      .filter(result => selectedResults[result.id])
      .reduce((total, result) => total + result.size, 0);
  };

  // Preview document
  const handlePreview = (result: SearchResult) => {
    // In a real implementation, this would open a modal with a PDF viewer
    console.log(`Previewing ${result.name}`);
    alert(`Prévisualisation de ${result.name} (Fonctionnalité simulée)`);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Rechercher des documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Rechercher par nom de fichier, mot-clé..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={isSearching} className="gap-2">
            <Search className="h-4 w-4" />
            <span>Rechercher</span>
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={selectedFilter} onValueChange={setSelectedFilter}>
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="pdf">PDF</TabsTrigger>
            <TabsTrigger value="xlsx">Excel</TabsTrigger>
            <TabsTrigger value="dwg">AutoCAD</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {isSearching ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse text-center">
              <p className="text-muted-foreground">Recherche en cours...</p>
            </div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {searchResults.length} résultat(s) trouvé(s)
              </span>
              
              {Object.values(selectedResults).some(Boolean) && (
                <Button size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  <span>Télécharger la sélection ({(calculateSelectedSize() / 1024 / 1024).toFixed(1)} Mo)</span>
                </Button>
              )}
            </div>
            
            {searchResults.map(result => (
              <div 
                key={result.id} 
                className="flex items-center p-3 border rounded-lg hover:bg-accent/50"
              >
                <Checkbox
                  checked={selectedResults[result.id] || false}
                  onCheckedChange={(checked) => handleCheckboxChange(result.id, checked === true)}
                  className="mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">{result.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {result.path}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{formatSize(result.size)}</Badge>
                  {result.type === 'pdf' && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handlePreview(result)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Aucun résultat trouvé pour "{searchQuery}"</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
