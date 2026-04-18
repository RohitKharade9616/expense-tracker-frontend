import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeduction } from './edit-deduction';

describe('EditDeduction', () => {
  let component: EditDeduction;
  let fixture: ComponentFixture<EditDeduction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDeduction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeduction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
