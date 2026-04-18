import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect } from "@angular/material/select";
import { MatDialogRef } from "@angular/material/dialog";
import { CommonModule } from '@angular/common';
import { CommonServices } from '../../../../shared/services/common-services';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.html',
  styleUrl: './add-income.css',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule, // ✅ REQUIRED
    MatDatepickerModule,
    MatNativeDateModule, // ✅ REQUIRED
    MatButtonModule // ✅ REQUIRED
    ,
    MatSelect,
    MatOption,
    CommonModule
]
})
export class AddIncome implements OnInit {

  incomeForm!: FormGroup;
//  categories: any[] = [
//   { id: 1, icon: 'work', label: 'Salary' },
//   { id: 2, icon: 'attach_money', label: 'Freelance' },
//   { id: 3, icon: 'home', label: 'Rent' },
//   { id: 4, icon: 'trending_up', label: 'Investment' }
// ];
categories:any

  paymentModes:any=[{id:1,name:"Cash",value:"cash"},
    {id:2,name:"Card",value:"card"},
    {id:3,name:"UPI",value:"upi"},
  ]
    readonly dialogRef = inject(MatDialogRef<AddIncome>);

  constructor(private fb: FormBuilder,private commonService:CommonServices) {}

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      categoryId: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(10)]],
      incomeDate: [null, Validators.required],
      source: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      paymentMode: ['', Validators.required],
    });
    this.commonService.getAllCategories().subscribe(res=>
    {
              console.log("res data",res)
        this.categories=res
        // this.categories=res
    }
    )
  }

  onSubmit(): void {
    if (this.incomeForm.invalid) {
      this.incomeForm.markAllAsTouched();
      return;
    }


    console.log('Form Data:', this.incomeForm.value);
    const formData=this.incomeForm.value
    this.commonService.addIncome(formData).subscribe(res=>
      console.log("income added successfulyy",formData)
    )
    this.incomeForm.reset();
  }
   selectCategory(id: number) {
    this.incomeForm.get('categoryId')?.setValue(id);
  }

   selectPaymentmode(id: number) {
    this.incomeForm.get('paymentMode')?.setValue(id);
  }


  get categoryId() {
    return this.incomeForm.get('categoryId');
  }
 onClose(): void {
    this.dialogRef.close();
  }


}
