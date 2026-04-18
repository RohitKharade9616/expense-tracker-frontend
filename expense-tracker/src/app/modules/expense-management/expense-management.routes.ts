import { Routes } from '@angular/router';
// import { AddExpense } from './components/add-expense/add-expense';
import { EditExpense } from './components/edit-expense/edit-expense';
import { ExpenseManagement } from './components/expense-management/expense-management';
import { AddExpense } from './components/add-expense/add-expense';

export const routes: Routes = [
  {
    path:'add-expense',
    component:AddExpense  },
   {
    path:'edit-expense',
    component:EditExpense
  },
   {
    path:'',
    component:ExpenseManagement
  }
]
