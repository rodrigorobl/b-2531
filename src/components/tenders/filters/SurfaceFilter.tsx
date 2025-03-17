
import React from 'react';
import { Maximize } from 'lucide-react';
import { RangeSliderFilter } from './RangeSliderFilter';

interface SurfaceFilterProps {
  surfaceRange: number[];
  setSurfaceRange: (value: number[]) => void;
}

export function SurfaceFilter({ surfaceRange, setSurfaceRange }: SurfaceFilterProps) {
  const formatSurface = (value: number) => {
    return `${value} m²`;
  };

  return (
    <RangeSliderFilter
      icon={Maximize}
      label="Surface du projet"
      value={surfaceRange}
      min={0}
      max={30000}
      step={500}
      onChange={setSurfaceRange}
      formatValue={formatSurface}
    />
  );
}
