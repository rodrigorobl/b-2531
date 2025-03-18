
import React from 'react';

interface CircleProgressProps {
  percentage: number;
  isPositive: boolean;
  size?: number;
  strokeWidth?: number;
}

export const CircleProgress: React.FC<CircleProgressProps> = ({
  percentage,
  isPositive,
  size = 120,
  strokeWidth = 12
}) => {
  const normalizedPercentage = percentage > 100 ? 100 : percentage;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (normalizedPercentage / 100) * circumference;
  
  const color = isPositive ? '#16a34a' : '#dc2626'; // green-600 ou red-600
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb" // gray-200
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-xl font-bold">
        <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
          {percentage.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};
