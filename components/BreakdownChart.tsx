import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface BreakdownChartProps {
  activeTime: number;
  standbyTime: number;
}

export const BreakdownChart: React.FC<BreakdownChartProps> = ({ activeTime, standbyTime }) => {
  const data = [
    { name: 'Active', value: activeTime, color: '#6366f1' }, // Indigo 500
    { name: 'Standby', value: standbyTime, color: '#94a3b8' }, // Slate 400
  ];

  const total = activeTime + standbyTime;
  const activePct = Math.round((activeTime / total) * 100);

  return (
    <div className="h-48 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
            itemStyle={{ color: '#f8fafc' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold text-white">{total}m</span>
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Per Report</span>
      </div>
    </div>
  );
};