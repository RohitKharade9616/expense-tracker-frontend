import { Component, inject, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CommonServices } from '../../../../shared/services/common-services';

@Component({
  selector: 'app-edit-deduction',
  standalone: true,
  templateUrl: './edit-deduction.html',
  styleUrl: './edit-deduction.css',
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
export class EditDeduction implements OnInit {
  deductionForm!: FormGroup;
  sections: any[] = [];
  isLoading = false;
  deductionId: number = 0;
  currentFinancialYear: string = '';
  readonly dialogRef = inject(MatDialogRef<EditDeduction>);

  constructor(
    private fb: FormBuilder,
    private commonService: CommonServices,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.deductionId = data?.id || 0;
  }

  ngOnInit(): void {
    this.currentFinancialYear = this.getCurrentFinancialYear();
    this.deductionForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(200)]],
      sectionCode: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      financialYear: [this.currentFinancialYear, Validators.required],
    });

    this.loadSections();
    this.loadDeductionData();
  }

  loadSections(): void {
    this.sections = [
      { code: "80C", name: 'Section 80C - LIC/Mutual Funds' },
      { code: "80D", name: 'Section 80D - Medical Insurance' },
      { code: "80E", name: 'Section 80E - Education Loan' },
      { code: "80G", name: 'Section 80G - Donations' },
      { code: "HRA", name: 'Section 10(13A) - HRA Exemption' },
      { code: "NPS", name: 'Section 80CCD(1B) - NPS Contribution' },
    ];
  }

  loadDeductionData(): void {
    if (this.data?.deduction) {
      // Patch all deduction data passed from dialog
      const deductionData = this.data.deduction;
      
      this.deductionForm.patchValue({
        description: deductionData.description || '',
        sectionCode: deductionData.sectionCode || '',
        amount: deductionData.amount || null,
        financialYear: deductionData.financialYear || this.currentFinancialYear,
      });

      console.log('Deduction data loaded:', deductionData);
    } else if (this.deductionId) {
      // Fallback: Fetch deduction by ID from API if needed
      this.commonService.getDeductionById(this.deductionId).subscribe(
        (res: any) => {
          if (res) {
            this.deductionForm.patchValue({
              description: res.description || '',
              sectionCode: res.sectionCode || '',
              amount: res.amount || null,
              financialYear: res.financialYear || this.currentFinancialYear,
            });
            console.log('Deduction loaded from API:', res);
          }
        },
        (error: any) => {
          console.error('Error loading deduction by ID:', error);
        }
      );
    }
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
      userId: this.getUserId(),
    };

    this.commonService.updateDeduction(this.deductionId, formData).subscribe(
      (res) => {
        console.log('Deduction updated successfully', res);
        this.isLoading = false;
        this.dialogRef.close(true); // Notify caller to refresh
      },
      (error) => {
        console.error('Error updating deduction:', error);
        this.isLoading = false;
        alert('Failed to update deduction. Please try again.');
      }
    );
  }

  getUserId(): number {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : 0;
  }

  getCurrentFinancialYear(): string {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

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
