import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionManagement } from './deduction-management';

describe('DeductionManagement', () => {
  let component: DeductionManagement;
  let fixture: ComponentFixture<DeductionManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeductionManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeductionManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
