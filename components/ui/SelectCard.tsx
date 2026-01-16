import React from 'react';
import { motion } from 'framer-motion';

interface SelectCardProps {
  options: number[];
  selected: number;
  onSelect: (val: number) => void;
  label: string;
}

export const SelectCard: React.FC<SelectCardProps> = ({ options, selected, onSelect, label }) => {
  return (
    <div className="w-full">
      <label className="block text-xs sm:text-sm font-bold text-slate-700 tracking-wide uppercase mb-2 sm:mb-3">{label}</label>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {options.map((option) => {
          const isSelected = selected === option;
          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`relative px-1 py-2 sm:px-2 sm:py-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all duration-200 outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white ${
                isSelected
                  ? 'bg-red-50 border-red-500 text-red-700 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {option} Months
              {isSelected && (
                 <motion.div
                    layoutId="outline"
                    className="absolute inset-0 border-2 border-red-500 rounded-lg pointer-events-none"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                 />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};