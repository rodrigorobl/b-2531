
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronDown, Folder, FileText, Download, Eye } from 'lucide-react';

interface FileTreeItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number; // in bytes
  children?: FileTreeItem[];
  format?: string;
  lastModified?: string;
}

interface FileTreeProps {
  onSelectionChange: (totalSize: number) => void;
}

export function FileTree({ onSelectionChange }: FileTreeProps) {
  // Mock data for the file tree
  const initialData: FileTreeItem[] = [
    {
      id: 'folder-1',
      name: '01_Plans',
      type: 'folder',
      size: 0,
      children: [
        {
          id: 'folder-1-1',
          name: 'Plans Architecte',
          type: 'folder',
          size: 0,
          children: [
            { id: 'file-1-1-1', name: 'Plan_RDC.pdf', type: 'file', size: 2500000, format: 'pdf', lastModified: '15/04/2023' },
            { id: 'file-1-1-2', name: 'Plan_R+1.pdf', type: 'file', size: 2200000, format: 'pdf', lastModified: '15/04/2023' },
            { id: 'file-1-1-3', name: 'Plan_R+2.pdf', type: 'file', size: 2300000, format: 'pdf', lastModified: '15/04/2023' },
            { id: 'file-1-1-4', name: 'Coupes.pdf', type: 'file', size: 3100000, format: 'pdf', lastModified: '15/04/2023' },
            { id: 'file-1-1-5', name: 'Façades.pdf', type: 'file', size: 2800000, format: 'pdf', lastModified: '17/04/2023' },
          ]
        },
        {
          id: 'folder-1-2',
          name: 'Plans Structure',
          type: 'folder',
          size: 0,
          children: [
            { id: 'file-1-2-1', name: 'Plan_fondations.pdf', type: 'file', size: 3500000, format: 'pdf', lastModified: '18/04/2023' },
            { id: 'file-1-2-2', name: 'Plan_charpente.pdf', type: 'file', size: 4200000, format: 'pdf', lastModified: '18/04/2023' },
          ]
        }
      ]
    },
    {
      id: 'folder-2',
      name: '02_CCTP',
      type: 'folder',
      size: 0,
      children: [
        { id: 'file-2-1', name: 'CCTP_Lot1_Gros_oeuvre.pdf', type: 'file', size: 1500000, format: 'pdf', lastModified: '20/04/2023' },
        { id: 'file-2-2', name: 'CCTP_Lot2_Menuiseries.pdf', type: 'file', size: 1200000, format: 'pdf', lastModified: '20/04/2023' },
        { id: 'file-2-3', name: 'CCTP_Lot3_Electricité.pdf', type: 'file', size: 1800000, format: 'pdf', lastModified: '21/04/2023' },
        { id: 'file-2-4', name: 'CCTP_Lot4_Plomberie.pdf', type: 'file', size: 1600000, format: 'pdf', lastModified: '21/04/2023' },
      ]
    },
    {
      id: 'folder-3',
      name: '03_DPGF',
      type: 'folder',
      size: 0,
      children: [
        { id: 'file-3-1', name: 'DPGF_Lot1.xlsx', type: 'file', size: 500000, format: 'xlsx', lastModified: '22/04/2023' },
        { id: 'file-3-2', name: 'DPGF_Lot2.xlsx', type: 'file', size: 450000, format: 'xlsx', lastModified: '22/04/2023' },
        { id: 'file-3-3', name: 'DPGF_Lot3.xlsx', type: 'file', size: 480000, format: 'xlsx', lastModified: '23/04/2023' },
        { id: 'file-3-4', name: 'DPGF_Lot4.xlsx', type: 'file', size: 520000, format: 'xlsx', lastModified: '23/04/2023' },
      ]
    },
    {
      id: 'folder-4',
      name: '04_Etudes',
      type: 'folder',
      size: 0,
      children: [
        { id: 'file-4-1', name: 'Etude_Thermique.pdf', type: 'file', size: 8500000, format: 'pdf', lastModified: '10/04/2023' },
        { id: 'file-4-2', name: 'Etude_Sol.pdf', type: 'file', size: 12000000, format: 'pdf', lastModified: '05/04/2023' },
        { id: 'file-4-3', name: 'Note_Calcul_Structure.pdf', type: 'file', size: 7500000, format: 'pdf', lastModified: '12/04/2023' },
      ]
    },
  ];

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'folder-1': true,
    'folder-2': true
  });
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  // Calculate the display size of files
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  // Toggle folder expansion
  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  // Calculate the size of all selected items
  const calculateSelectionSize = (selections: Record<string, boolean>) => {
    let total = 0;
    
    const calculateItemSize = (items: FileTreeItem[]) => {
      for (const item of items) {
        if (selections[item.id]) {
          if (item.type === 'file') {
            total += item.size;
          } else if (item.children) {
            calculateItemSize(item.children);
          }
        } else if (item.type === 'folder' && item.children) {
          calculateItemSize(item.children);
        }
      }
    };
    
    calculateItemSize(initialData);
    return total;
  };

  // Handle checkbox change
  const handleCheckboxChange = (itemId: string, checked: boolean, item: FileTreeItem) => {
    const newSelections = { ...selectedItems, [itemId]: checked };
    
    // If it's a folder, select/deselect all children
    const selectChildren = (items: FileTreeItem[], selected: boolean) => {
      const selections = { ...newSelections };
      items.forEach(child => {
        selections[child.id] = selected;
        if (child.type === 'folder' && child.children) {
          Object.assign(selections, selectChildren(child.children, selected));
        }
      });
      return selections;
    };
    
    if (item.type === 'folder' && item.children) {
      const childSelections = selectChildren(item.children, checked);
      Object.assign(newSelections, childSelections);
    }
    
    setSelectedItems(newSelections);
    onSelectionChange(calculateSelectionSize(newSelections));
  };

  // Preview document
  const handlePreview = (file: FileTreeItem) => {
    // In a real implementation, this would open a modal with a PDF viewer
    console.log(`Previewing ${file.name}`);
    alert(`Prévisualisation de ${file.name} (Fonctionnalité simulée)`);
  };

  // Render a file tree item
  const renderItem = (item: FileTreeItem, level = 0) => {
    const isFolder = item.type === 'folder';
    const isExpanded = expandedFolders[item.id];
    const isSelected = selectedItems[item.id] || false;
    
    return (
      <div key={item.id} className="file-tree-item">
        <div 
          className="flex items-center py-2 hover:bg-accent/50 rounded px-2"
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          <Checkbox 
            checked={isSelected}
            onCheckedChange={(checked) => handleCheckboxChange(item.id, checked === true, item)}
            className="mr-2"
            id={`checkbox-${item.id}`}
          />
          
          {isFolder ? (
            <div 
              className="flex items-center flex-1 cursor-pointer"
              onClick={() => toggleFolder(item.id)}
            >
              <span className="mr-1">
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </span>
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              <span className="font-medium flex-1">{item.name}</span>
            </div>
          ) : (
            <div className="flex items-center flex-1">
              <FileText className="h-4 w-4 mr-2 text-gray-500" />
              <span className="flex-1">{item.name}</span>
              <Badge variant="outline" className="mr-2">{formatSize(item.size)}</Badge>
              {item.format === 'pdf' && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handlePreview(item)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {isFolder && isExpanded && item.children && (
          <div className="folder-children">
            {item.children.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <ScrollArea className="h-[500px]">
      <div className="file-tree">
        {initialData.map(item => renderItem(item))}
      </div>
    </ScrollArea>
  );
}
