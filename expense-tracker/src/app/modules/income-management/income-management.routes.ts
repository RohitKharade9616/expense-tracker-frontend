import { Routes } from '@angular/router';
import { EditIncome } from './components/edit-income/edit-income';
import { AddIncome } from './components/add-income/add-income';
import { IncomeManagement } from './components/income-management/income-management';

export const routes: Routes = [
  {
    path:'',
    component:IncomeManagement
  },
  {
    path:'add-income',
    component:AddIncome
  },
   {
    path:'edit-income',
    component:EditIncome
  }
]
