export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
}
export type ExpenseCategory =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Utilities'
  | 'Income'
  | 'Other';

export interface ExpenseState {
  items: Expense[];
  loading: boolean;
  error: string | null;
}
