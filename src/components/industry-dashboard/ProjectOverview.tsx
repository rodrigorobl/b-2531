import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Clock, Building } from 'lucide-react';
interface Project {
  id: string;
  name: string;
  location: string;
  client: string;
  progress: number;
  phase: 'conception' | 'realisation';
}
interface ProjectOverviewProps {
  projects: Project[];
}
export default function ProjectOverview({
  projects
}: ProjectOverviewProps) {
  return <Card>
      
    </Card>;
}