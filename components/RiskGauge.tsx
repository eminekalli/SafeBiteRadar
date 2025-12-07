import React from 'react';
import { RiskLevel } from '../types';

interface RiskGaugeProps {
  score: number;
  level: RiskLevel;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ score, level }) => {
  let colorClass = 'text-risk-low border-risk-low shadow-risk-low/20';
  let bgClass = 'bg-risk-low';

  if (level === RiskLevel.MEDIUM) {
    colorClass = 'text-risk-medium border-risk-medium shadow-risk-medium/20';
    bgClass = 'bg-risk-medium';
  } else if (level === RiskLevel.HIGH) {
    colorClass = 'text-risk-high border-risk-high shadow-risk-high/20';
    bgClass = 'bg-risk-high';
  }

  // Calculate circumference for SVG circle
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-40 h-40">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-800"
          />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${level === RiskLevel.LOW ? 'text-emerald-500' : level === RiskLevel.MEDIUM ? 'text-amber-500' : 'text-red-500'} transition-all duration-1000 ease-out`}
          />
        </svg>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-mono font-bold ${level === RiskLevel.LOW ? 'text-emerald-500' : level === RiskLevel.MEDIUM ? 'text-amber-500' : 'text-red-500'}`}>
            {score}
          </span>
          <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">
            RISK SCORE
          </span>
        </div>
      </div>
      
      <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold border ${colorClass} bg-opacity-10`}>
        {level} RISK DETECTED
      </div>
    </div>
  );
};

export default RiskGauge;