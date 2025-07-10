import { Component } from '@angular/core';
import { ExpenseTrackerComponent } from './expense-tracker/expense-tracker.component';

@Component({
  selector: 'app-root',
  imports: [ExpenseTrackerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-ngrx-expense-tracker';
}
