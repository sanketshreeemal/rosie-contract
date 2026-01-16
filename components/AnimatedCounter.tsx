import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../utils/calculations';

interface AnimatedCounterProps {
  value: number;
  label: string;
  subLabel?: string;
  isCurrency?: boolean;
  highlight?: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  label, 
  subLabel,
  isCurrency = true,
  highlight = false 
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    setDisplayValue(value);
    setBump(true);
    const t = setTimeout(() => setBump(false), 200);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className={`p-2 sm:p-4 rounded-xl border flex flex-col justify-center h-full transition-colors duration-300 ${
      highlight 
        ? 'bg-red-50 border-red-100 shadow-[0_2px_10px_rgba(220,38,38,0.05)]' 
        : 'bg-white border-slate-200 shadow-sm'
    }`}>
      <div className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mb-1 truncate">
        {label}
      </div>
      <div className={`text-base sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 transition-transform duration-200 origin-left ${bump ? 'scale-105' : 'scale-100'}`}>
        {isCurrency ? formatCurrency(displayValue) : displayValue}
      </div>
      {subLabel && (
        <div className="mt-1 text-[9px] sm:text-xs text-slate-400 font-medium truncate">
          {subLabel}
        </div>
      )}
    </div>
  );
};