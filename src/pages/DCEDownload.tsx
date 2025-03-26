
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileTree } from '@/components/dce-download/FileTree';
import { FeaturedDocuments } from '@/components/dce-download/FeaturedDocuments';
import { RevisionHistory } from '@/components/dce-download/RevisionHistory';
import { FileSearch } from '@/components/dce-download/FileSearch';
import { Download, Search, Archive, Clock, FileText } from 'lucide-react';

export default function DCEDownload() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const [totalSelectedSize, setTotalSelectedSize] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // This would typically come from API based on the ID
  const projectName = "Centre Commercial Riviera";

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="container py-6 space-y-6 max-w-7xl">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Téléchargement du DCE</h1>
            <p className="text-muted-foreground">
              Projet: {projectName} {projectId && `(${projectId})`}
            </p>
          </div>

          {/* Download all DCE button */}
          <Card>
            <CardContent className="flex justify-between items-center p-4">
              <div className="flex flex-col">
                <h2 className="text-lg font-medium">Télécharger le DCE complet</h2>
                <p className="text-sm text-muted-foreground">Inclut tous les documents et plans - 128 Mo</p>
              </div>
              <Button size="lg" className="gap-2">
                <Download className="h-4 w-4" />
                <span>Télécharger tout</span>
              </Button>
            </CardContent>
          </Card>

          {/* Featured documents */}
          <FeaturedDocuments />

          <Tabs defaultValue="files" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="files" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Rechercher
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Historique
              </TabsTrigger>
            </TabsList>

            <TabsContent value="files" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Documents du DCE</CardTitle>
                    {totalSelectedSize > 0 && (
                      <Button className="gap-2">
                        <Download className="h-4 w-4" />
                        <span>Télécharger la sélection ({(totalSelectedSize / 1024 / 1024).toFixed(1)} Mo)</span>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <FileTree onSelectionChange={setTotalSelectedSize} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="search">
              <FileSearch />
            </TabsContent>

            <TabsContent value="history">
              <RevisionHistory />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
