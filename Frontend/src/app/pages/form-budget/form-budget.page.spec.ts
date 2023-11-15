import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBudgetPage } from './form-budget.page';

describe('FormBudgetPage', () => {
  let component: FormBudgetPage;
  let fixture: ComponentFixture<FormBudgetPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(FormBudgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
