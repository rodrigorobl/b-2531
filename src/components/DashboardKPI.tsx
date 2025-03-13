
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface DashboardKPIProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export default function DashboardKPI({ title, value, icon, color }: DashboardKPIProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
