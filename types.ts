export interface PricingState {
  reportsPerDay: number;
  activeTimePerReport: number; // minutes
  standbyTimePerReport: number; // minutes
  hourlyWage: number;
  contractDurationMonths: number;
}

export interface CalculationResult {
  dailyPay: number;
  weeklyPay: number; // Based on 5 days
  monthlyPay: number; // Based on ~21.66 days or weekly * 4.33
  totalContractPay: number;
  totalHoursPerDay: number;
}
