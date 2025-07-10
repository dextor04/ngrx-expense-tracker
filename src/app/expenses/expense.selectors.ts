import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpenseState } from './expense.model';
import * as fromExpense from './expense.reducer';
import { filter } from 'rxjs';
export const selectExpenseState = createFeatureSelector<ExpenseState>(
  fromExpense.expensesFeatureKey
);
// basic selectors
export const selectAllExpenses = createSelector(
  selectExpenseState,
  (state: ExpenseState) => state.items
);
export const selectExpenseLoading = createSelector(
  selectExpenseState,
  (state: ExpenseState) => state.loading
);
export const selectExpenseError = createSelector(
  selectExpenseState,
  (state: ExpenseState) => state.error
);
export const selectIncomeItems = createSelector(selectAllExpenses, (expenses) =>
  expenses.filter((expense) => expense.category === 'Income')
);
export const selectExpenseItems = createSelector(
  selectAllExpenses,
  (expenses) => expenses.filter((expense) => expense.category !== 'Income')
);
export const selectTotalIncome = createSelector(
  selectIncomeItems,
  (incomeItems) => incomeItems.reduce((total, item) => total + item.amount, 0)
);
export const selectTotalExpense = createSelector(
  selectExpenseItems,
  (expenseItems) => expenseItems.reduce((total, item) => total + item.amount, 0)
);
export const selectBalance = createSelector(
  selectTotalIncome,
  selectTotalExpense,
  (totalIncome, totalExpense) => totalIncome - totalExpense
);
