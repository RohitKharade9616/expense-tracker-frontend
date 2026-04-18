import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CommonServices } from '../../../../shared/services/common-services';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class AddExpense implements OnInit {
  expenseForm!: FormGroup;
  categories: any[] = [];
  readonly dialogRef = inject(MatDialogRef<AddExpense>);

  constructor(private fb: FormBuilder, private commonService: CommonServices) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      categoryId: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      expenseDate: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
    });

    this.commonService.getAllCategories().subscribe((res) => {
      this.categories = res as any[];
    });
  }

  onSubmit(): void {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }

    const formData = this.expenseForm.value;
    this.commonService.addExpense(formData).subscribe((res) => {
      console.log('expense added successfully', res);
      this.dialogRef.close(true); // notify caller to refresh
    });
  }

  selectCategory(id: number) {
    this.expenseForm.get('categoryId')?.setValue(id);
  }

  trackById(index: number, item: any) {
    return item && item.id ? item.id : index;
  }

  get categoryId() {
    return this.expenseForm.get('categoryId');
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
