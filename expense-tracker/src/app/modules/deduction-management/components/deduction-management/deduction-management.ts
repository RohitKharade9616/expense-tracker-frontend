import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ExpenseList } from '../../../expense-management/components/expense-list/expense-list';
import { MatTooltip } from '@angular/material/tooltip';
import { CommonServices } from '../../../../shared/services/common-services';
import { MatDialog } from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button';
import { AddDeduction } from '../add-deduction/add-deduction';
import { EditDeduction } from '../edit-deduction/edit-deduction';
@Component({
  selector: 'app-deduction-management',
  imports:[MatButtonModule,MatListModule,MatDividerModule,MatProgressBarModule,MatCardModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, CommonModule, MatInputModule, ExpenseList, MatTooltip],
  templateUrl: './deduction-management.html',
  styleUrl: './deduction-management.css',
})
export class DeductionManagement implements OnInit{
totalDeduction: any;
estimatedTaxSavings: any;
availableToClaim: any;
sectionsUsed: any;
  taxRate: any;
  searchValue:any=new FormControl('')
 taxSections: any[] = ["All Sections","80C","80D","HRA","80E","NPS","80G"];
 selectedSection: string = "All Sections";
 deductionSections: any = {
   "All Sections": {
     title: "All Sections",
     code: "ALL",
     claimed: 0,
     limit: 0,
     utilization: 0,
     items: []
   },
   "80C": {
     title: "Section 80C - Investments & Insurance",
     code: "80C",
     claimed: 150000,
     limit: 150000,
     utilization: 100,
     canClaim: 0,
     items: [
       { name: "Public Provident Fund (PPF)", category: "PPF Statement", amount: 50000 },
       { name: "ELSS Mutual Funds", category: "Investment Certificate", amount: 50000 },
       { name: "Life Insurance Premium", category: "Policy Document", amount: 50000 }
     ],
     tips: []
   },
   "80D": {
     title: "Section 80D - Health Insurance",
     code: "80D",
     claimed: 25000,
     limit: 50000,
     utilization: 50,
     canClaim: 25000,
     items: [
       { name: "Self & Family Health Insurance", category: "Policy Document", amount: 15000 },
       { name: "Preventive Health Checkup", category: "Medical Bills", amount: 5000 },
       { name: "Parents Health Insurance", category: "Policy Document", amount: 5000 }
     ],
     tips: [
       "You can claim up to ₹55,000 more under Section 80D for parents' health insurance (above 60 years)"
     ]
   },
   "HRA": {
     title: "Section 10(13A) - HRA Exemption",
     code: "HRA",
     claimed: 0,
     limit: 0,
     utilization: 0,
     canClaim: 0,
     items: [],
     tips: []
   },
   "80E": {
     title: "Section 80E - Education Loan Interest",
     code: "80E",
     claimed: 0,
     limit: 0,
     utilization: 0,
     canClaim: 0,
     items: [],
     tips: []
   },
   "NPS": {
     title: "Section 80CCD(1B) - NPS Contribution",
     code: "NPS",
     claimed: 0,
     limit: 50000,
     utilization: 0,
     canClaim: 50000,
     items: [],
     tips: [
       "Consider investing in NPS to get an additional ₹50,000 deduction under Section 80CCD(1B)"
     ]
   },
   "80G": {
     title: "Section 80G - Charitable Donations",
     code: "80G",
     claimed: 0,
     limit: 0,
     utilization: 0,
     canClaim: 0,
     items: [],
     tips: []
   }
 };

 allTips: string[] = [
   "You can claim up to ₹55,000 more under Section 80D for parents' health insurance (above 60 years)",
   "Consider investing in NPS to get an additional ₹50,000 deduction under Section 80CCD(1B)",
   "Home loan interest up to ₹2,00,000 can be claimed under Section 24(b)",
   "Keep all investment proofs and receipts ready for tax filing"
 ];
 
constructor(private commonService:CommonServices,private dialog:MatDialog) {
 
}
ngOnInit()
{
  this.getDeductionKPIS();
  this.getDeductionByCategories();
}
addDeduction()
{
  this.dialog.open(AddDeduction, {
    width: '500px',
    height:'600px',
    data: { message: 'Hello' }
  });

}
getDeductionKPIS()
{
  this.commonService.getDeductionKPIS('2024-2025',0).subscribe((res: any)=>  
  {
    if(res)
    {
      this.totalDeduction = res.totalDeductionsClaimed;
      this.estimatedTaxSavings = res.estimatedTaxSavings;
      this.availableToClaim = res.availableToClaim;
      this.sectionsUsed = res.totalSectionsUsed;
      this.taxRate= res.taxRate;
    }
  })
}

selectSection(section: string): void {
  this.selectedSection = section;
  if (section !== 'All Sections') {
    this.getDeductionBySection(section);
  }
}

get currentSection(): any {
  return this.deductionSections[this.selectedSection];
}

deductionByCategory: any[] = [];
financialYear: string = '2024-2025';
userId: number = 0;

getDeductionBySection(sectionCode: string): void {
  this.commonService.getDeductionBySectionCode(sectionCode, this.financialYear, this.userId).subscribe(
    (res: any) => {
      if (res && res.length > 0) {
        // Update the deductionSections with API data
        const sectionKey = this.getSectionKey(sectionCode);
        
        // Calculate totals
        const totalAmount = res.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
        const sectionLimit = this.getSectionLimit(sectionCode);
        const utilization = sectionLimit > 0 ? Math.round((totalAmount / sectionLimit) * 100) : 0;
        
        this.deductionSections[sectionKey] = {
          ...this.deductionSections[sectionKey],
          claimed: totalAmount,
          utilization: utilization,
          canClaim: Math.max(0, sectionLimit - totalAmount),
          items: res.map((item: any) => ({
            name: item.description || item.name || 'Item',
            category: item.category || 'Document',
            amount: item.amount || 0,
            id: item.id
          }))
        };
      }
    },
    (error: any) => {
      console.error('Error fetching deductions by section:', error);
    }
  );
}

getDeductionByCategories(): void {
  // Load deductions for all sections with correct codes
  const sections = ['80C', '80D', 'HRA', '80E', 'NPS', '80G'];
  sections.forEach((sectionCode: string) => {
    this.getDeductionBySection(sectionCode);
  });
}

getSectionKey(sectionCode: string): string {
  const codeMap: any = {
    '80C': '80C',
    '80D': '80D',
    'HRA': 'HRA',
    '80E': '80E',
    'NPS': 'NPS',
    '80G': '80G'
  };
  return codeMap[sectionCode] || sectionCode;
}

getSectionLimit(sectionCode: string): number {
  const limitMap: any = {
    '80C': 150000,
    '80D': 50000,
    'HRA': 0,
    '80E': 0,
    'NPS': 50000,
    '80G': 0
  };
  return limitMap[sectionCode] || 0;
}

onEdit(item: any): void {
  const dialogRef = this.dialog.open(EditDeduction, {
    width: '500px',
    height: '600px',
    data: {
      id: item.id,
      deduction: {
        description: item.name,
        category: item.category,
        amount: item.amount,
        sectionCode: this.selectedSection
      }
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Refresh the deductions for the current section
      this.getDeductionBySection(this.selectedSection);
      // Also refresh KPIs
      this.getDeductionKPIS();
    }
  });
}
}
