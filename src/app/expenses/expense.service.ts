import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Expense } from './expense.model';
import { catchError, Observable, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
@Injectable({ providedIn: 'root' })
export class ExpenseService {
  constructor(private store: Store) {}
  private http = inject(HttpClient);
  private expenseUrl = 'http://localhost:3000/expenses';

  //   getexpense
  getExpenses() {
    return this.http
      .get<Expense[]>(this.expenseUrl)
      .pipe(catchError(this.handleError));
  }
  // addexpense
  addExpense(expenseData: Omit<Expense, 'id'>): Observable<Expense> {
    const newExpense: Expense = {
      id: uuidv4(),
      ...expenseData,
    };
    return this.http
      .post<Expense>(this.expenseUrl, newExpense)
      .pipe(catchError(this.handleError));
  }
  // updateexpense
  updateExpense(expense: Expense): Observable<Expense> {
    return this.http
      .patch<Expense>(`${this.expenseUrl}/${expense.id}`, expense)
      .pipe(catchError(this.handleError));
  }
  // deleteexpense
  deleteExpense(expenseId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.expenseUrl}/${expenseId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Service error:', error);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
