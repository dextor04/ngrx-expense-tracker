import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ExpenseService } from './expense.service';
import * as ExpenseActions from './expense.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ExpenseEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private expenseService = inject(ExpenseService);
  // loadexpense((
  loadExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.loadExpenses),
      exhaustMap(() =>
        this.expenseService.getExpenses().pipe(
          map((expenses) => ExpenseActions.loadExpensesSuccess({ expenses })),
          catchError((error) =>
            of(ExpenseActions.loadExpensesFailure({ error }))
          )
        )
      )
    )
  );
  // addexpense
  addExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.addExpense),
      exhaustMap((action) =>
        this.expenseService.addExpense(action.expenseData).pipe(
          map((expense) => ExpenseActions.addExpenseSuccess({ expense })),
          catchError((error) => of(ExpenseActions.addExpenseFailure({ error })))
        )
      )
    )
  );

  // updateexpense
  updateExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.updateExpense),
      exhaustMap((action) =>
        this.expenseService.updateExpense(action.expense).pipe(
          map((updatedExpense) =>
            ExpenseActions.updateExpenseSuccess({ expense: updatedExpense })
          ),
          catchError((error) =>
            of(ExpenseActions.updateExpenseFailure({ error }))
          )
        )
      )
    )
  );

  // deleteexpense
  deleteExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.deleteExpense),
      exhaustMap((action) =>
        this.expenseService.deleteExpense(action.expenseId).pipe(
          map(() =>
            ExpenseActions.deleteExpenseSuccess({ expenseId: action.expenseId })
          ),
          catchError((error) =>
            of(ExpenseActions.deleteExpenseFailure({ error }))
          )
        )
      )
    )
  );
}
