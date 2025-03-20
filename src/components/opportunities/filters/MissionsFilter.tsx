
import React from 'react';
import { Briefcase } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

export function MissionsFilter() {
  const missions = [
    { id: 'moe', label: 'Maîtrise d\'Œuvre' },
    { id: 'conception', label: 'Conception architecturale' },
    { id: 'controle', label: 'Contrôle technique' },
    { id: 'bet-structure', label: 'BET Structure' },
    { id: 'bet-fluides', label: 'BET Fluides' },
    { id: 'bet-acoustique', label: 'BET Acoustique' },
    { id: 'opc', label: 'OPC' },
    { id: 'economiste', label: 'Économiste' },
    { id: 'paysagiste', label: 'Paysagiste' },
    { id: 'vrd', label: 'VRD' },
    { id: 'thermique', label: 'Thermique' },
    { id: 'securite', label: 'Sécurité incendie' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Briefcase size={16} className="text-muted-foreground" />
        <Label>Missions recherchées</Label>
      </div>
      <ScrollArea className="h-40 w-full border rounded-md p-2">
        <div className="space-y-2">
          {missions.map((mission) => (
            <div key={mission.id} className="flex items-center space-x-2">
              <Checkbox id={`mission-${mission.id}`} />
              <Label htmlFor={`mission-${mission.id}`} className="text-sm">
                {mission.label}
              </Label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
