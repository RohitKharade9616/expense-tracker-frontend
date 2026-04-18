import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IncomeList } from "../income-list/income-list";
import { AddIncome } from '../add-income/add-income';
import { MatDialog } from '@angular/material/dialog';
import { CommonServices } from '../../../../shared/services/common-services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-income-management',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, CommonModule, MatInputModule, MatIconModule, IncomeList],

  templateUrl: './income-management.html',
  styleUrl: './income-management.css',
})
export class IncomeManagement implements OnInit {
  searchValue: any = new FormControl('');
  incomeList: any[] = [];
  totalIncome: any;
  currentMonthIncome: any;
  averageIncome: any;
  categories: any[] = [];
  constructor(private dialog: MatDialog, private commonService: CommonServices, private cdr: ChangeDetectorRef,private snackBar: MatSnackBar) {
  }
  ngOnInit() {
    this.getIncomeList();
    this.getIncomeKPIS();
    this.getAllCategories();
  }
  addIncome() {
    this.dialog.open(AddIncome, {
      width: '500px',
      height: '600px',
      data: { message: 'Hello' }
    });

  }
  getIncomeList() {
    this.commonService.getIncomes().subscribe(res => {
      if (res) {
        this.incomeList = res as any[];
        this.cdr.markForCheck();
      }
    });
  }

  getIncomeKPIS() {
    this.commonService.getIncomeKPIS().subscribe((res: any) => {
      if (res) {
        this.totalIncome = res.totalIncome;
        this.currentMonthIncome = res.currentMonthIncome;
        this.averageIncome = res.averageIncome;
        this.cdr.markForCheck();
      }
    });
  }

  filterByCategory(categoryId: any) {
    this.commonService.getIncomesByCategory(categoryId).subscribe((res: any) => {
      if (res.data && res.data.length > 0) {
        this.incomeList = res.data as any[];
        this.cdr.markForCheck();
      }
      else
      {
        this.snackBar.open('No income entries found for this category', 'Close', {
          duration: 3000,
        });
        this.getIncomeList();
      }
    });
  }
  getAllCategories() {
    this.commonService.getAllCategories().subscribe(res => {
      this.categories = res as any[];
      this.cdr.markForCheck();
    });
  }

  trackById(index: number, item: any) {
    return item && item.id ? item.id : index;
  }

  searchbyCategory() {
  const searchValue = this.searchValue.value?.trim();

  if (!searchValue) {
    this.getIncomeList();
    return;
  }

  const category = this.categories.find(cat =>
    cat.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (category) {
    this.filterByCategory(category.id);
  } else {
    this.getIncomeList();
  }
}
}

