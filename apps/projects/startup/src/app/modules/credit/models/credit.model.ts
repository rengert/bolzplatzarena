export interface Credit {
  name: string;
  originalAmount: number;
  amount: number;
  costPerMonth: number;
  months: number;
  interestRate: number;
}
