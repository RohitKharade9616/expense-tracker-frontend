import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonServices } from '../../../shared/services/common-services';

interface TaxRegimeData {
  grossIncome: number;
  deductions: number;
  taxableIncome: number;
  totalTax: number;
  cess: number;
  finalTaxLiability: number;
}

interface TaxSlab {
  incomeRange: string;
  minIncome: number;
  maxIncome: number;
  rate: number;
  taxAmount: number;
}

interface ApiDeduction {
  section: string;
  amount: number;
}

interface TaxCalculationResponse {
  oldRegime: TaxRegimeData & { finalTax: number };
  newRegime: TaxRegimeData & { finalTax: number };
  slabBreakdown: TaxSlab[];
  deductions: ApiDeduction[];
}

interface DeductionItem {
  section: string;
  description: string;
  amount: number;
  color: string;
  icon: string;
}

interface DeductionColorMap {
  [key: string]: { color: string; description: string; icon: string };
}

@Component({
  selector: 'app-tax-calculation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tax-calculation.component.html',
  styleUrl: './tax-calculation.component.css',
})
export class TaxCalculationComponent implements OnInit {
  isLoading: boolean = true;
  error: string | null = null;

  private deductionColorMap: DeductionColorMap = {
    '80C': { color: '#4F46E5', description: 'PPF, ELSS, Life Insurance', icon: '💼' },
    '80D': { color: '#E11D48', description: 'Health Insurance', icon: '🏥' },
    'HRA': { color: '#7C3AED', description: 'House Rent Allowance', icon: '🏠' },
    '80E': { color: '#10B981', description: 'Education Loan Interest', icon: '📚' },
    'NPS': { color: '#F59E0B', description: 'National Pension Scheme', icon: '💰' },
  };

  constructor(private commonServices: CommonServices) {}

  // Old Tax Regime Data
  oldTaxRegime: TaxRegimeData = {
    grossIncome: 0,
    deductions: 0,
    taxableIncome: 0,
    totalTax: 0,
    cess: 0,
    finalTaxLiability: 0,
  };

  // New Tax Regime Data
  newTaxRegime: TaxRegimeData = {
    grossIncome: 0,
    deductions: 0,
    taxableIncome: 0,
    totalTax: 0,
    cess: 0,
    finalTaxLiability: 0,
  };

  // Tax Slab Data for Old Regime
  taxSlabs: TaxSlab[] = [];

  // Deduction Items (Old Regime)
  deductions: DeductionItem[] = [];

  totalDeductions: number = 0;

  ngOnInit(): void {
    this.loadTaxCalculation();
  }

  loadTaxCalculation(): void {
    this.isLoading = true;
    this.error = null;

    // Call the API with financial year and userId
    const fy = '2024-2025';
    const userId = 0; // Replace with actual user ID from auth service

    this.commonServices
      .calculateTax(fy, userId)
      .pipe()
      .subscribe({
        next: (response: TaxCalculationResponse) => {
          this.processTaxResponse(response);
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error loading tax calculation:', error);
          this.error = 'Failed to load tax calculation. Please try again.';
          this.isLoading = false;
        },
      });
  }

  processTaxResponse(response: TaxCalculationResponse): void {
    // Map Old Regime
    this.oldTaxRegime = {
      grossIncome: response.oldRegime.grossIncome,
      deductions: response.oldRegime.deductions,
      taxableIncome: response.oldRegime.taxableIncome,
      totalTax: response.oldRegime.totalTax,
      cess: response.oldRegime.cess,
      finalTaxLiability: response.oldRegime.finalTax,
    };

    // Map New Regime
    this.newTaxRegime = {
      grossIncome: response.newRegime.grossIncome,
      deductions: response.newRegime.deductions,
      taxableIncome: response.newRegime.taxableIncome,
      totalTax: response.newRegime.totalTax,
      cess: response.newRegime.cess,
      finalTaxLiability: response.newRegime.finalTax,
    };

    // Map Tax Slabs
    this.taxSlabs = response.slabBreakdown;

    // Map Deductions with colors and icons
    this.deductions = response.deductions.map((deduction: ApiDeduction) => ({
      section: deduction.section,
      amount: deduction.amount,
      color: this.deductionColorMap[deduction.section]?.color || '#6B7280',
      description: this.deductionColorMap[deduction.section]?.description || '',
      icon: this.deductionColorMap[deduction.section]?.icon || '📋',
    }));

    // Calculate totals
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totalDeductions = this.deductions.reduce(
      (sum, item) => sum + item.amount,
      0
    );
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  onViewTaxSummary(): void {
    console.log('Navigating to ITR preparation');
    // TODO: Navigate to ITR preparation page
  }
}
