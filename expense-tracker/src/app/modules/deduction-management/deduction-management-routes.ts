import { Routes } from '@angular/router';
import { AddDeduction } from './components/add-deduction/add-deduction';
import { EditDeduction } from './components/edit-deduction/edit-deduction';
import { DeductionManagement } from './components/deduction-management/deduction-management';
// import { DeductionManagement } from './components/deduction-management/deduction-management';


export const routes: Routes = [
 
  {
      path:'add-deduction',
      component:AddDeduction  },
     {
      path:'edit-deduction',
      component:EditDeduction
    },
     {
      path:'',
      component:DeductionManagement
    }
]
