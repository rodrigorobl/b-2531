
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TenderFormValues } from '@/pages/CreateTender';
import ConstructionBaseInfo from './construction/ConstructionBaseInfo';
import ProjectUsageSelector from './construction/ProjectUsageSelector';
import BuildingManager from './construction/BuildingManager';

interface ConstructionTenderFormProps {
  form: UseFormReturn<TenderFormValues>;
}

const ConstructionTenderForm: React.FC<ConstructionTenderFormProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <ConstructionBaseInfo form={form} />
      
      <ProjectUsageSelector form={form} />
      
      <BuildingManager form={form} />
    </div>
  );
};

export default ConstructionTenderForm;
