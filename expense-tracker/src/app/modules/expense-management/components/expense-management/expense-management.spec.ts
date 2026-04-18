import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseManagement } from './expense-management';

describe('ExpenseManagement', () => {
  let component: ExpenseManagement;
  let fixture: ComponentFixture<ExpenseManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
