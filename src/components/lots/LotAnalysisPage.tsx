
import React from 'react';
import { useParams } from 'react-router-dom';
import LotAnalysis from '@/pages/LotAnalysis';

export function LotAnalysisPage() {
  const { tenderId, lotId } = useParams<{ tenderId: string; lotId: string }>();
  
  return <LotAnalysis />;
}
