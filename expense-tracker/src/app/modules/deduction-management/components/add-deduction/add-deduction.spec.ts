import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeduction } from './add-deduction';

describe('AddDeduction', () => {
  let component: AddDeduction;
  let fixture: ComponentFixture<AddDeduction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDeduction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeduction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
