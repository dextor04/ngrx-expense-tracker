import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Expense, ExpenseCategory } from '../expenses/expense.model';
import * as ExpenseActions from '../expenses/expense.action';
import * as ExpenseSelectors from '../expenses/expense.selectors';
import { ExpenseData } from '../expenses/expense.action';

@Component({
  selector: 'app-expense-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.css'],
})
export class ExpenseTrackerComponent implements OnInit {
  private store = inject(Store);

  // Observables for the template
  allExpenses$: Observable<Expense[]>;
  isLoading$: Observable<boolean>;
  totalIncome$: Observable<number>;
  totalExpenses$: Observable<number>;
  netBalance$: Observable<number>;

  // Form properties
  isEditing = false;
  expenseCategories: ExpenseCategory[] = [
    'Food',
    'Transport',
    'Shopping',
    'Utilities',
    'Income',
    'Other',
  ];
  formModel: Omit<Expense, 'id'> & { id?: string } = {
    description: '',
    amount: 0,
    category: 'Food',
    date: new Date().toISOString().split('T')[0], // Default to today
  };

  constructor() {
    // Select all the data slices we need for our UI
    this.allExpenses$ = this.store.select(ExpenseSelectors.selectAllExpenses);
    this.isLoading$ = this.store.select(ExpenseSelectors.selectExpenseLoading);
    this.totalIncome$ = this.store.select(ExpenseSelectors.selectTotalIncome);
    this.totalExpenses$ = this.store.select(
      ExpenseSelectors.selectTotalExpense
    );
    this.netBalance$ = this.store.select(ExpenseSelectors.selectBalance);
  }

  ngOnInit(): void {
    this.store.dispatch(ExpenseActions.loadExpenses());
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    if (this.isEditing && this.formModel.id) {
      // Dispatch update action
      this.store.dispatch(
        ExpenseActions.updateExpense({ expense: this.formModel as Expense })
      );
    } else {
      // Dispatch add action
      const expenseData: ExpenseData = {
        description: this.formModel.description,
        amount: this.formModel.amount,
        category: this.formModel.category,
        date: new Date(this.formModel.date).toISOString(),
      };
      this.store.dispatch(ExpenseActions.addExpense({ expenseData }));
    }
    form.resetForm();
    this.resetForm();
  }

  onEdit(expense: Expense): void {
    this.isEditing = true;
    this.formModel = {
      ...expense,
      date: new Date(expense.date).toISOString().split('T')[0],
    };
    window.scrollTo(0, 0);
  }

  onDelete(expenseId: string): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.store.dispatch(ExpenseActions.deleteExpense({ expenseId }));
    }
  }

  onCancelEdit(form: NgForm): void {
    form.resetForm();
    this.resetForm();
  }

  private resetForm(): void {
    this.isEditing = false;
    this.formModel = {
      description: '',
      amount: 0,
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
    };
  }
}
