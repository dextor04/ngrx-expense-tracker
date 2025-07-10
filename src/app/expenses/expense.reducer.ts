import { createReducer, on } from '@ngrx/store';
import { ExpenseState } from './expense.model';
import * as ExpenseActions from './expense.action';
export const expensesFeatureKey = 'expenses';
export const initialState: ExpenseState = {
  items: [],
  loading: false,
  error: null,
};
export const expenseReducer = createReducer(
  initialState,
  on(ExpenseActions.loadExpenses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ExpenseActions.loadExpensesSuccess, (state, { expenses }) => ({
    ...state,
    items: expenses,
    loading: false,
  })),
  on(ExpenseActions.loadExpensesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message,
  })),
  on(ExpenseActions.addExpense, (state) => ({
    ...state,
    loading: true,
  })),
  on(ExpenseActions.addExpenseSuccess, (state, { expense }) => ({
    ...state,
    items: [...state.items, expense],
    loading: false,
  })),
  on(ExpenseActions.addExpenseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message,
  })),
  on(ExpenseActions.updateExpense, (state) => ({
    ...state,
    loading: true,
  })),
  on(ExpenseActions.updateExpenseSuccess, (state, { expense }) => ({
    ...state,
    items: state.items.map((item) => (item.id === expense.id ? expense : item)),
    loading: false,
  })),
  on(ExpenseActions.updateExpenseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message,
  })),
  on(ExpenseActions.deleteExpense, (state) => ({
    ...state,
    loading: true,
  })),
  on(ExpenseActions.deleteExpenseSuccess, (state, { expenseId }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== expenseId),
    loading: false,
  })),
  on(ExpenseActions.deleteExpenseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message,
  }))
);
