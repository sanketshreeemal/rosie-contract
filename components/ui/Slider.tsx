import React from 'react';
import { motion } from 'framer-motion';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  unit?: string;
  description?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit = '',
  description
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full pb-5"> 
      {/* Header Row */}
      <div className="flex items-baseline space-x-2 sm:space-x-3 mb-1.5 sm:mb-2">
        <label className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide uppercase">{label}</label>
        {description && (
          <span className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">{description}</span>
        )}
      </div>
      
      {/* Slider Track Container */}
      <div className="relative w-full h-2 flex items-center select-none touch-none">
        {/* Track Background */}
        <div className="absolute w-full h-full bg-slate-200 rounded-full overflow-hidden border border-slate-300">
           {/* Filled Track */}
           <motion.div 
             className="h-full bg-gradient-to-r from-red-600 to-red-500"
             initial={{ width: 0 }}
             animate={{ width: `${percentage}%` }}
             transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
           />
        </div>

        {/* The actual input - functionality */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-20"
        />

        {/* Visual Thumb */}
        <motion.div
            className="absolute h-5 w-5 bg-white rounded-full shadow-[0_2px_8px_rgba(220,38,38,0.3)] border-2 border-red-600 pointer-events-none z-10"
            style={{ left: `${percentage}%` }}
            initial={false}
            animate={{ left: `${percentage}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
            // Center the thumb
            transformTemplate={(_, generated) => `translateX(-50%) ${generated}`}
        />

        {/* Moving Value Label */}
        <motion.div 
           className="absolute top-5 flex flex-col items-center pointer-events-none z-10"
           style={{ left: `${percentage}%` }}
           initial={false}
           animate={{ left: `${percentage}%` }}
           transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
           transformTemplate={(_, generated) => `translateX(-50%) ${generated}`}
        >
           <span className="text-xs sm:text-sm font-bold text-slate-900 tabular-nums leading-none">{value}</span>
           {unit && <span className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5">{unit}</span>}
        </motion.div>
      </div>
    </div>
  );
};