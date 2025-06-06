
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, PenLine, Search, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { QuoteLineItemAnnotationDialog } from './QuoteLineItemAnnotationDialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface QuoteLineItemAnnotation {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  isInternal: boolean;
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
  annotations?: QuoteLineItemAnnotation[];
  level?: number;
  parentId?: string;
  children?: QuoteLineItem[];
}

interface QuoteLineItemsProps {
  lineItems: QuoteLineItem[];
}

export default function QuoteLineItems({ lineItems }: QuoteLineItemsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Process items to create a hierarchical structure
  const processHierarchy = (items: QuoteLineItem[]): QuoteLineItem[] => {
    // Create a map of all items by ID
    const itemMap = new Map<string, QuoteLineItem>();
    items.forEach(item => {
      itemMap.set(item.id, { ...item, children: [] });
    });
    
    // Build the hierarchy
    const rootItems: QuoteLineItem[] = [];
    
    itemMap.forEach(item => {
      if (!item.parentId) {
        // This is a root item
        rootItems.push(item);
      } else {
        // This is a child item
        const parent = itemMap.get(item.parentId);
        if (parent && parent.children) {
          parent.children.push(item);
        } else {
          // If parent doesn't exist, treat as root
          rootItems.push(item);
        }
      }
    });
    
    return rootItems;
  };

  // Fonction pour formater les montants en euros
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  // Fonction pour trier les lignes du devis
  const sortItems = (items: QuoteLineItem[]): QuoteLineItem[] => {
    if (!sortField) return items;

    return [...items].sort((a, b) => {
      let valueA, valueB;

      switch (sortField) {
        case 'designation':
          valueA = a.designation.toLowerCase();
          valueB = b.designation.toLowerCase();
          break;
        case 'quantity':
          valueA = a.quantity;
          valueB = b.quantity;
          break;
        case 'unitPrice':
          valueA = a.unitPrice;
          valueB = b.unitPrice;
          break;
        case 'totalPrice':
          valueA = a.totalPrice;
          valueB = b.totalPrice;
          break;
        default:
          return 0;
      }

      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // Fonction pour filtrer les lignes du devis
  const filterItems = (items: QuoteLineItem[]): QuoteLineItem[] => {
    if (!searchQuery.trim()) return items;
    
    const query = searchQuery.toLowerCase().trim();
    
    // Helper function to check if an item or any of its descendants match the search
    const matchesSearch = (item: QuoteLineItem): boolean => {
      const itemMatches = 
        item.designation.toLowerCase().includes(query) ||
        item.observations?.toLowerCase().includes(query);
      
      if (itemMatches) return true;
      
      if (item.children && item.children.length > 0) {
        return item.children.some(child => matchesSearch(child));
      }
      
      return false;
    };
    
    return items.filter(matchesSearch);
  };

  // Create hierarchical structure from flat list
  const hierarchicalItems = processHierarchy(lineItems);
  
  // Sort and filter root items
  const processedRootItems = sortItems(filterItems(hierarchicalItems));

  // Fonction pour changer le tri
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Calcul du total global
  const calculateTotalAmount = (items: QuoteLineItem[]): number => {
    let total = 0;
    
    items.forEach(item => {
      // Only add leaf nodes or parent nodes without children to avoid double counting
      if (!item.children || item.children.length === 0) {
        total += item.totalPrice;
      }
    });
    
    return total;
  };
  
  const totalAmount = calculateTotalAmount(lineItems);

  // Rendu du composant de tri
  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  // Toggle expand/collapse for an item
  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Composant pour l'annotation d'une ligne
  const handleAddAnnotation = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  // Render a line item row with proper indentation based on level
  const renderLineItem = (item: QuoteLineItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.id] !== false; // Default to expanded
    
    return (
      <React.Fragment key={item.id}>
        <TableRow className={level > 0 ? `pl-${level * 4}` : ''}>
          <TableCell>
            <div className="flex items-center">
              {hasChildren && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mr-1 p-0 h-6 w-6"
                  onClick={() => toggleExpand(item.id)}
                >
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              )}
              <div className={`${level > 0 ? `ml-${level * 4}` : ''}`}>
                <span className={hasChildren ? 'font-semibold' : ''}>
                  {item.designation}
                </span>
                {item.discount && (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    Remise {item.discount}%
                  </span>
                )}
              </div>
            </div>
          </TableCell>
          <TableCell className="text-right">{item.quantity}</TableCell>
          <TableCell>{item.unit}</TableCell>
          <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
          <TableCell className="text-right font-medium">{formatCurrency(item.totalPrice)}</TableCell>
          <TableCell className="max-w-xs">
            {item.observations && (
              <div className="text-sm text-muted-foreground truncate" title={item.observations}>
                {item.observations}
              </div>
            )}
            {item.annotations && item.annotations.length > 0 && (
              <div className="mt-1 flex items-center text-xs text-primary">
                <MessageSquare className="h-3 w-3 mr-1" />
                {item.annotations.length} annotation(s)
              </div>
            )}
          </TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAddAnnotation(item.id)}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <PenLine className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
        
        {/* Render children if expanded */}
        {hasChildren && isExpanded && item.children?.map(child => renderLineItem(child, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Détail des postes ({lineItems.length})</h2>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher un poste..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('designation')}
                >
                  <div className="flex items-center">
                    Désignation
                    {renderSortIcon('designation')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 text-right"
                  onClick={() => handleSort('quantity')}
                >
                  <div className="flex items-center justify-end">
                    Quantité
                    {renderSortIcon('quantity')}
                  </div>
                </TableHead>
                <TableHead>Unité</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 text-right"
                  onClick={() => handleSort('unitPrice')}
                >
                  <div className="flex items-center justify-end">
                    Prix unitaire HT
                    {renderSortIcon('unitPrice')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 text-right"
                  onClick={() => handleSort('totalPrice')}
                >
                  <div className="flex items-center justify-end">
                    Prix total HT
                    {renderSortIcon('totalPrice')}
                  </div>
                </TableHead>
                <TableHead>Observations</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedRootItems.length > 0 ? (
                <>
                  {processedRootItems.map(item => renderLineItem(item))}
                  <TableRow>
                    <TableCell colSpan={4} className="text-right font-bold">
                      Total HT
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(totalAmount)}
                    </TableCell>
                    <TableCell colSpan={2}></TableCell>
                  </TableRow>
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    Aucun poste trouvé avec les critères actuels.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {selectedItemId && (
          <QuoteLineItemAnnotationDialog
            itemId={selectedItemId}
            onClose={() => setSelectedItemId(null)}
            onSave={(annotation) => {
              console.log('Annotation saved:', annotation);
              setSelectedItemId(null);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
