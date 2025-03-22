
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProjectsEvolutionChartProps {
  region: string;
  timeRange: string;
  projectType: string;
  showBySize?: boolean;
}

const ProjectsEvolutionChart = ({ region, timeRange, projectType, showBySize = false }: ProjectsEvolutionChartProps) => {
  // Mock data - would be fetched from API in a real scenario
  const timeSeriesData = [
    {
      name: 'Jan 2023',
      'Votre entreprise': 4,
      'Concurrent A': 3,
      'Concurrent B': 2,
      'Concurrent C': 5,
    },
    {
      name: 'Fév 2023',
      'Votre entreprise': 3,
      'Concurrent A': 4,
      'Concurrent B': 3,
      'Concurrent C': 4,
    },
    {
      name: 'Mar 2023',
      'Votre entreprise': 5,
      'Concurrent A': 3,
      'Concurrent B': 4,
      'Concurrent C': 3,
    },
    {
      name: 'Avr 2023',
      'Votre entreprise': 6,
      'Concurrent A': 4,
      'Concurrent B': 3,
      'Concurrent C': 2,
    },
    {
      name: 'Mai 2023',
      'Votre entreprise': 4,
      'Concurrent A': 5,
      'Concurrent B': 4,
      'Concurrent C': 3,
    },
    {
      name: 'Juin 2023',
      'Votre entreprise': 7,
      'Concurrent A': 4,
      'Concurrent B': 5,
      'Concurrent C': 4,
    },
    {
      name: 'Juil 2023',
      'Votre entreprise': 8,
      'Concurrent A': 6,
      'Concurrent B': 5,
      'Concurrent C': 3,
    },
    {
      name: 'Août 2023',
      'Votre entreprise': 6,
      'Concurrent A': 5,
      'Concurrent B': 4,
      'Concurrent C': 4,
    },
    {
      name: 'Sep 2023',
      'Votre entreprise': 9,
      'Concurrent A': 7,
      'Concurrent B': 6,
      'Concurrent C': 5,
    },
    {
      name: 'Oct 2023',
      'Votre entreprise': 8,
      'Concurrent A': 6,
      'Concurrent B': 7,
      'Concurrent C': 6,
    },
    {
      name: 'Nov 2023',
      'Votre entreprise': 10,
      'Concurrent A': 8,
      'Concurrent B': 7,
      'Concurrent C': 7,
    },
    {
      name: 'Déc 2023',
      'Votre entreprise': 11,
      'Concurrent A': 9,
      'Concurrent B': 8,
      'Concurrent C': 6,
    },
  ];

  const sizeData = [
    {
      name: 'Jan 2023',
      'Grands projets': 2,
      'Projets moyens': 5,
      'Petits projets': 8,
    },
    {
      name: 'Fév 2023',
      'Grands projets': 1,
      'Projets moyens': 6,
      'Petits projets': 7,
    },
    {
      name: 'Mar 2023',
      'Grands projets': 3,
      'Projets moyens': 4,
      'Petits projets': 9,
    },
    {
      name: 'Avr 2023',
      'Grands projets': 2,
      'Projets moyens': 7,
      'Petits projets': 10,
    },
    {
      name: 'Mai 2023',
      'Grands projets': 4,
      'Projets moyens': 5,
      'Petits projets': 8,
    },
    {
      name: 'Juin 2023',
      'Grands projets': 3,
      'Projets moyens': 8,
      'Petits projets': 11,
    },
    {
      name: 'Juil 2023',
      'Grands projets': 5,
      'Projets moyens': 7,
      'Petits projets': 9,
    },
    {
      name: 'Août 2023',
      'Grands projets': 4,
      'Projets moyens': 6,
      'Petits projets': 8,
    },
    {
      name: 'Sep 2023',
      'Grands projets': 6,
      'Projets moyens': 9,
      'Petits projets': 12,
    },
    {
      name: 'Oct 2023',
      'Grands projets': 5,
      'Projets moyens': 8,
      'Petits projets': 10,
    },
    {
      name: 'Nov 2023',
      'Grands projets': 7,
      'Projets moyens': 10,
      'Petits projets': 13,
    },
    {
      name: 'Déc 2023',
      'Grands projets': 6,
      'Projets moyens': 11,
      'Petits projets': 14,
    },
  ];

  const data = showBySize ? sizeData : timeSeriesData;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {showBySize ? (
          <>
            <Line type="monotone" dataKey="Grands projets" stroke="#0ea5e9" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Projets moyens" stroke="#8b5cf6" />
            <Line type="monotone" dataKey="Petits projets" stroke="#10b981" />
          </>
        ) : (
          <>
            <Line type="monotone" dataKey="Votre entreprise" stroke="#0ea5e9" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Concurrent A" stroke="#f43f5e" />
            <Line type="monotone" dataKey="Concurrent B" stroke="#8b5cf6" />
            <Line type="monotone" dataKey="Concurrent C" stroke="#10b981" />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProjectsEvolutionChart;
