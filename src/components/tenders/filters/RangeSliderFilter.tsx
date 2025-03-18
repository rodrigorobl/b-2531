
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { LucideIcon } from 'lucide-react';

interface RangeSliderFilterProps {
  icon: LucideIcon;
  label: string;
  value: number[];
  min: number;
  max: number;
  step: number;
  onChange: (value: number[]) => void;
  formatValue: (value: number) => string;
}

export function RangeSliderFilter({
  icon: Icon,
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue
}: RangeSliderFilterProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-muted-foreground" />
        <Label>{label}</Label>
      </div>
      <div className="pt-5 px-2">
        <Slider 
          value={value} 
          min={min} 
          max={max} 
          step={step}
          onValueChange={onChange}
        />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{formatValue(value[0])}</span>
          <span>{formatValue(value[1])}</span>
        </div>
      </div>
    </div>
  );
}
