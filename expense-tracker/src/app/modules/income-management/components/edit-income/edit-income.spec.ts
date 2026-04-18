import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncome } from './edit-income';

describe('EditIncome', () => {
  let component: EditIncome;
  let fixture: ComponentFixture<EditIncome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIncome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIncome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
