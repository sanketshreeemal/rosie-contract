import React, { useState, useMemo } from 'react';
import { Clock } from 'lucide-react';
import { calculatePricing } from './utils/calculations';
import { PricingState } from './types';
import { Slider } from './components/ui/Slider';
import { SelectCard } from './components/ui/SelectCard';
import { AnimatedCounter } from './components/AnimatedCounter';

const App: React.FC = () => {
  const [state, setState] = useState<PricingState>({
    reportsPerDay: 5,
    activeTimePerReport: 20, // Default 20
    standbyTimePerReport: 60, // Default 60
    hourlyWage: 25,
    contractDurationMonths: 6,
  });

  const updateState = (key: keyof PricingState, value: number) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const results = useMemo(() => calculatePricing(state), [state]);

  const getWeeksText = (months: number) => {
    // 4.3333 weeks per month approximation
    const weeks = Math.round(months * 4.3333);
    return `Over ${weeks} weeks`;
  };

  // Calculate hours and minutes for Total Commitment display
  const totalMinutes = results.totalHoursPerDay * 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-500/30 selection:text-red-900 flex flex-col font-sans overflow-x-hidden justify-center items-center">
      
      {/* Main Single Viewport Content */}
      <main className="w-full flex items-center justify-center p-2 sm:p-6 lg:p-4">
        {/* Changed max-w-5xl to max-w-3xl to ensure consistent tablet-like layout on desktop */}
        <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl px-4 py-6 sm:p-8 shadow-xl relative overflow-hidden">
          
          {/* Decorative glow (Subtle Red) */}
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Section 1: Contract Assumptions */}
          <div className="relative z-10 mb-6 sm:mb-6">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800 uppercase tracking-widest mb-6 sm:mb-6 flex items-center gap-4">
               Contract Assumptions
               <span className="h-px bg-slate-200 flex-1"></span>
            </h3>
            
            {/* Removed grid layout to enforce vertical stacking consistent with preview */}
            <div className="flex flex-col space-y-8 sm:space-y-9">
              
              {/* Reports Slider */}
              <Slider
                label="Reports"
                value={state.reportsPerDay}
                min={1}
                max={8}
                onChange={(val) => updateState('reportsPerDay', val)}
                unit="/ day"
                description="Average Daily Reports"
              />

              {/* Active & Standby Time Group */}
              <div className="flex items-center gap-4 sm:gap-8">
                <div className="flex-1 space-y-8 sm:space-y-9">
                  <Slider
                      label="Active Time"
                      value={state.activeTimePerReport}
                      min={1}
                      max={100}
                      onChange={(val) => updateState('activeTimePerReport', val)}
                      unit="min"
                      description="Hands-on time per report"
                    />
                    <Slider
                      label="Standby Time"
                      value={state.standbyTimePerReport}
                      min={1}
                      max={100}
                      step={1}
                      onChange={(val) => updateState('standbyTimePerReport', val)}
                      unit="min"
                      description="Availability window"
                    />
                </div>
                
                {/* Vertical Divider (Desktop) */}
                <div className="w-px h-32 bg-slate-200 hidden sm:block"></div>

                {/* Centered Total Commitment (Desktop) */}
                <div className="hidden sm:flex flex-col items-center justify-center shrink-0 w-24">
                     <Clock className="w-6 h-6 text-red-600 mb-3" />
                     <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-slate-900 leading-none">{hours}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-0.5">Hours</span>
                     </div>
                     <div className="w-8 h-px bg-slate-200 my-2"></div>
                     <div className="flex flex-col items-center">
                        <span className="text-xl font-bold text-slate-600 leading-none">{minutes.toString().padStart(2, '0')}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-0.5">Mins</span>
                     </div>
                     <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider mt-3 text-center">Daily<br/>Load</span>
                </div>

                {/* Mobile Total Commitment (Fallback: Right of sliders) */}
                 <div className="sm:hidden flex flex-col items-center justify-center shrink-0 w-16 pt-2">
                      <Clock className="w-4 h-4 text-red-600 mb-2" />
                      <div className="flex flex-col items-center">
                         <span className="text-xl font-bold text-slate-900 leading-none">{hours}</span>
                         <span className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Hr</span>
                      </div>
                      <div className="w-6 h-px bg-slate-200 my-1"></div>
                      <div className="flex flex-col items-center">
                         <span className="text-lg font-bold text-slate-600 leading-none">{minutes}</span>
                         <span className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Min</span>
                      </div>
                  </div>
              </div>

              {/* Hourly Rate Slider */}
               <Slider
                label="Hourly Rate"
                value={state.hourlyWage}
                min={20}
                max={40}
                onChange={(val) => updateState('hourlyWage', val)}
                unit="$/hr"
              />

              {/* Contract Length */}
              <div className="pt-2">
                <SelectCard 
                  label="Contract Length"
                  options={[3, 6, 9]}
                  selected={state.contractDurationMonths}
                  onSelect={(val) => updateState('contractDurationMonths', val)}
                />
              </div>

            </div>
          </div>

          {/* Section 2: Estimated Compensation */}
          <div className="relative z-10 pt-6 sm:pt-6 border-t border-slate-100">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800 uppercase tracking-widest mb-4 sm:mb-4 flex items-center gap-4">
               Estimated Compensation
               <span className="h-px bg-slate-200 flex-1"></span>
            </h3>
            {/* Grid forced to 3 columns on all screens to keep inline on mobile */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <AnimatedCounter 
                label="Daily" 
                value={results.dailyPay} 
                subLabel={`${results.totalHoursPerDay.toFixed(1)} hrs`}
              />
              <AnimatedCounter 
                label="Weekly" 
                value={results.weeklyPay} 
                subLabel="5 days"
              />
              <AnimatedCounter 
                label="Total" 
                value={results.totalContractPay} 
                subLabel={getWeeksText(state.contractDurationMonths)}
                highlight
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;