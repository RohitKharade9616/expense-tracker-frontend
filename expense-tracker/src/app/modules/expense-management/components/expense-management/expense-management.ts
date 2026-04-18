import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AddExpense } from '../add-expense/add-expense';
import { EditExpense } from '../edit-expense/edit-expense';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ExpenseList } from "../expense-list/expense-list";
import { CommonServices } from '../../../../shared/services/common-services';
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  selector: 'app-expense-management',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, CommonModule, MatInputModule, ExpenseList, MatTooltip],
  templateUrl: './expense-management.html',
  styleUrl: './expense-management.css',
})

export class ExpenseManagement implements OnInit {
  searchValue: any = new FormControl('');
  categories: any[] = []; // always initialize as array to avoid template errors
  totalExpense: any;
  currentMonthExpense: any;
  dailyAverage: any;
  budgetLeft: any;
  expenseList: any;
  constructor(private dialog: MatDialog, private commonService: CommonServices, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getAllCategories();
    this.getExpenseKPIS();
    this.getExpenseList();

  }
  addExpense() {
    const dialogRef = this.dialog.open(AddExpense, {
      width: '500px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // refresh list and KPIs when a new expense added
        this.getExpenseList();
        this.getExpenseKPIS();
      }
    });
  }

  editExpense(entry: any) {
    const dialogRef = this.dialog.open(EditExpense, {
      width: '500px',
      height: '600px',
      data: { expense: entry },
    });

    dialogRef.afterClosed().subscribe((updated) => {
      if (updated) {
        this.getExpenseList();
        this.getExpenseKPIS();
      }
    });
  }
  getExpenseKPIS() {
    this.commonService.getExpenseKPIS().subscribe((res: any) => {
      if (res) {
        this.totalExpense = res.totalExpense;
        this.currentMonthExpense = res.currentMonthExpense;
        this.dailyAverage = res.dailyAverage;
        this.budgetLeft = res.budgetLeft;
        this.cdr.markForCheck();
      }
    });
  }

  getAllCategories() {
    this.commonService.getAllCategories().subscribe(res => {
      this.categories = res as any[];
      this.cdr.markForCheck();
    });
  }

   getExpenseList() {
    this.commonService.getExpenses().subscribe(res => {
      if (res) {
        this.expenseList = res;
        this.cdr.markForCheck();
      }
    });
  }
   filterByCategory(categoryId: any) {
    this.commonService.getExpensesByCategory(categoryId).subscribe((res: any) => {
      if (res) {
        this.expenseList = res;
        this.cdr.markForCheck();
      }
    });
  }

  onDeleted(id: any) {
    // simply refresh already filtered list or reload everything
    this.getExpenseList();
    this.getExpenseKPIS();
  }

  /**
   * trackBy function speeds up *ngFor rendering when working with arrays from API
   */
  trackById(index: number, item: any) {
    return item && item.id ? item.id : index;
  }
  downloadReport() {
    this.commonService.downloadExpenseReport().subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');  
      a.href = url;
      a.download = 'expense-report.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); 
      window.URL.revokeObjectURL(url);
    });
  }
   searchbyCategory() {
  const searchValue = this.searchValue.value?.trim();

  if (!searchValue) {
    this.getExpenseList();
    return;
  }

  const category = this.categories.find(cat =>
    cat.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (category) {
    this.filterByCategory(category.id);
  } else {
    this.getExpenseList();
  }
}
onFileSelected(event: any) {
  const file = event.target.files[0];

  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  this.commonService.importExpenses(file).subscribe({
    next: (res) => {
      this.getExpenseList(); // refresh table
      this.getExpenseKPIS(); // refresh KPIs
    },
      error: (err) => {
        console.error('Import failed', err);
      }
    });
}
}
