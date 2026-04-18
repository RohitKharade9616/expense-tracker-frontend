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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CommonServices } from '../../../../shared/services/common-services';

interface ExpenseData {
  expense: any;
}

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  templateUrl: './edit-expense.html',
  styleUrl: './edit-expense.css',
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
export class EditExpense implements OnInit {
  expenseForm!: FormGroup;
  categories: any[] = [];
  readonly dialogRef = inject(MatDialogRef<EditExpense>);
  private data = inject<ExpenseData>(MAT_DIALOG_DATA);

  constructor(private fb: FormBuilder, private commonService: CommonServices) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      categoryId: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      expenseDate: [null, Validators.required],
      source: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
    });

    this.commonService.getAllCategories().subscribe((res) => {
      this.categories = res as any[];
    });

    if (this.data && this.data.expense) {
      this.expenseForm.patchValue({
        categoryId: this.data.expense.categoryId,
        description: this.data.expense.description,
        expenseDate: new Date(this.data.expense.expenseDate),
        source: this.data.expense.source,
        amount: this.data.expense.amount,
      });
    }
  }

  onSubmit(): void {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }

    const formData = this.expenseForm.value;
    const id = this.data?.expense?.expenseId;
    if (id) {
      this.commonService.updateExpense(id, formData).subscribe((res) => {
        console.log('expense updated', res);
        this.dialogRef.close(true);
      });
    }
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
