export interface Credit {
  id: string;
  name: string;
  originalAmount: number;
  amount: number;
  costPerMonth: number;
  months: number;
  interestRate: number;
}
