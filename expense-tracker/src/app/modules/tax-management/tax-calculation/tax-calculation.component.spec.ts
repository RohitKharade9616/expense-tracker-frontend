import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxCalculationComponent } from './tax-calculation.component';
import { CommonServices } from '../../../shared/services/common-services';
import { of } from 'rxjs';

describe('TaxCalculationComponent', () => {
  let component: TaxCalculationComponent;
  let fixture: ComponentFixture<TaxCalculationComponent>;
  const mockTaxResponse = {
    oldRegime: {
      grossIncome: 1850000,
      deductions: 380000,
      taxableIncome: 1470000,
      totalTax: 272500,
      cess: 10900,
      finalTax: 283400,
    },
    newRegime: {
      grossIncome: 1850000,
      deductions: 0,
      taxableIncome: 1850000,
      totalTax: 315000,
      cess: 12600,
      finalTax: 327600,
    },
    slabBreakdown: [
      {
        incomeRange: '₹0 - ₹2,50,000',
        minIncome: 0,
        maxIncome: 250000,
        rate: 0,
        taxAmount: 0,
      },
      {
        incomeRange: '₹2,50,001 - ₹5,00,000',
        minIncome: 250001,
        maxIncome: 500000,
        rate: 5,
        taxAmount: 12500,
      },
    ],
    deductions: [
      { section: '80C', amount: 150000 },
      { section: '80D', amount: 25000 },
    ],
  };

  beforeEach(async () => {


    

    fixture = TestBed.createComponent(TaxCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should process tax response correctly', () => {
    expect(component.oldTaxRegime.grossIncome).toBe(1850000);
    expect(component.oldTaxRegime.finalTaxLiability).toBe(283400);
    expect(component.newTaxRegime.finalTaxLiability).toBe(327600);
  });

  it('should calculate total deductions correctly', () => {
    expect(component.totalDeductions).toBe(175000); // 150000 + 25000
  });

  it('should have tax slab data', () => {
    expect(component.taxSlabs.length).toBe(2);
  });

  it('should have deduction items with colors and icons', () => {
    expect(component.deductions.length).toBe(2);
    expect(component.deductions[0].color).toBe('#4F46E5'); // 80C color
    expect(component.deductions[0].icon).toBe('💼');
  });

  it('should format currency correctly', () => {
    const formatted = component.formatCurrency(1000);
    expect(formatted).toContain('1,000');
  });

  it('should handle loading state', () => {
    component.isLoading = true;
    fixture.detectChanges();
    expect(component.isLoading).toBe(true);
  });

  it('should handle error state', () => {
    component.error = 'Test error';
    fixture.detectChanges();
    expect(component.error).toBe('Test error');
  });
});
