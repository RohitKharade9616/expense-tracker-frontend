import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CommonServices } from '../../../../shared/services/common-services';

@Component({
  selector: 'app-add-deduction',
  standalone: true,
  templateUrl: './add-deduction.html',
  styleUrl: './add-deduction.css',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class AddDeduction implements OnInit {
  deductionForm!: FormGroup;
  sections: any[] = [];
  isLoading = false;
  currentFinancialYear: string = '';
  readonly dialogRef = inject(MatDialogRef<AddDeduction>);

  constructor(private fb: FormBuilder, private commonService: CommonServices) {}

  ngOnInit(): void {
    this.currentFinancialYear = this.getCurrentFinancialYear();
    this.deductionForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(200)]],
      sectionCode: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      financialYear: [this.currentFinancialYear, Validators.required],
    });

    this.loadSections();
  }

  loadSections(): void {
    this.sections = [
      { code: '80C', name: 'Section 80C - LIC/Mutual Funds' },
      { code: '80D', name: 'Section 80D - Medical Insurance' },
      { code: '80E', name: 'Section 80E - Education Loan' },
      { code: '80G', name: 'Section 80G - Donations' },
      { code: 'HRA', name: 'Section 10(13A) - HRA Exemption' },
      { code: 'NPS', name: 'Section 80CCD(1B) - NPS Contribution' },
    ];
  }

  onSubmit(): void {
    if (this.deductionForm.invalid) {
      this.deductionForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = {
      description: this.deductionForm.value.description,
      sectionCode: this.deductionForm.value.sectionCode,
      amount: this.deductionForm.value.amount,
      financialYear: this.deductionForm.value.financialYear,
      userId: this.getUserId(), // Get from user context
    };

    this.commonService.addDeduction(formData).subscribe(
      (res) => {
        console.log('Deduction added successfully', res);
        this.isLoading = false;
        this.dialogRef.close(true); // Notify caller to refresh
      },
      (error) => {
        console.error('Error adding deduction:', error);
        this.isLoading = false;
        alert('Failed to add deduction. Please try again.');
      }
    );
  }

  getUserId(): number {
    // Get userId from localStorage, session, or user service
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : 0;
  }

  getCurrentFinancialYear(): string {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    // Financial year starts from April
    if (currentMonth >= 3) {
      return `${currentYear}-${String(currentYear + 1).slice(-2)}`;
    } else {
      return `${currentYear - 1}-${String(currentYear).slice(-2)}`;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  get description() {
    return this.deductionForm.get('description');
  }

  get sectionCode() {
    return this.deductionForm.get('sectionCode');
  }

  get amount() {
    return this.deductionForm.get('amount');
  }

  get financialYear() {
    return this.deductionForm.get('financialYear');
  }
}
