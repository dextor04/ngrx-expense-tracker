import { createAction, props } from '@ngrx/store';
import { Expense } from './expense.model';

export type ExpenseData = Omit<Expense, 'id'>;
// Load

export const loadExpenses = createAction('[Expense Page] Load Expenses');
export const loadExpensesSuccess = createAction(
  '[Expense API] Load Expenses Success',
  props<{ expenses: Expense[] }>()
);
export const loadExpensesFailure = createAction(
  '[Expense API] Load Expenses Failure',
  props<{ error: any }>()
);
// Add
export const addExpense = createAction(
  '[Expenses Page] Add Expense',
  props<{ expenseData: ExpenseData }>()
);

export const addExpenseSuccess = createAction(
  '[Expenses API] Add Expense Success',
  props<{ expense: Expense }>()
);

export const addExpenseFailure = createAction(
  '[Expenses API] Add Expense Failure',
  props<{ error: any }>()
);

// Update
export const updateExpense = createAction(
  '[Expenses Page] Update Expense',
  props<{ expense: Expense }>()
);

export const updateExpenseSuccess = createAction(
  '[Expenses API] Update Expense Success',
  props<{ expense: Expense }>()
);

export const updateExpenseFailure = createAction(
  '[Expenses API] Update Expense Failure',
  props<{ error: any }>()
);

// Delete
export const deleteExpense = createAction(
  '[Expenses Page] Delete Expense',
  props<{ expenseId: string }>()
);

export const deleteExpenseSuccess = createAction(
  '[Expenses API] Delete Expense Success',
  props<{ expenseId: string }>()
);

export const deleteExpenseFailure = createAction(
  '[Expenses API] Delete Expense Failure',
  props<{ error: any }>()
);
