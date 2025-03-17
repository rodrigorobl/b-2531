
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface DashboardKPIProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  linkTo: string;
}

export default function DashboardKPI({ title, value, icon, color, linkTo }: DashboardKPIProps) {
  return (
    <Link to={linkTo} className="block">
      <Card className="transition-shadow hover:shadow-md">
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
    </Link>
  );
}
