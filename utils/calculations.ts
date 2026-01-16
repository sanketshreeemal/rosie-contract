import { PricingState, CalculationResult } from '../types';

export const calculatePricing = (state: PricingState): CalculationResult => {
  const {
    reportsPerDay,
    activeTimePerReport,
    standbyTimePerReport,
    hourlyWage,
    contractDurationMonths,
  } = state;

  const totalMinutesPerReport = activeTimePerReport + standbyTimePerReport;
  const totalDailyMinutes = totalMinutesPerReport * reportsPerDay;
  const totalHoursPerDay = totalDailyMinutes / 60;

  const dailyPay = totalHoursPerDay * hourlyWage;
  const weeklyPay = dailyPay * 5; // Standard 5-day work week
  
  // Using 52 weeks / 12 months = ~4.333 weeks per month
  const monthlyPay = weeklyPay * 4.3333; 
  const totalContractPay = monthlyPay * contractDurationMonths;

  return {
    dailyPay,
    weeklyPay,
    monthlyPay,
    totalContractPay,
    totalHoursPerDay
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
};