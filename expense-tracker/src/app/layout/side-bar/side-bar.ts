import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-side-bar',
  imports: [RouterModule, MatIconModule,MatCardModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})

export class SideBar {

 
menuItems :any= [
  { labelKey: 'Dashboard', route: 'dashboard',icon:'dashboard' },
  { labelKey: 'Income', route: 'income-management' ,icon:'calculate'},
  { labelKey: 'Expenses', route: 'expense-management',icon:'shopping_cart' },
  { labelKey: 'Deductions', route: 'tax-deduction',icon:'calculate' },
  { labelKey: 'Tax Calculation', route: 'tax-calculation',icon:'calculate' },
  { labelKey: 'ITR Prep', route: 'stc/covid-19',icon:'calculate' },
  { labelKey: 'Reports', route: 'stc/contact-us',icon:'reports'},
];

}
