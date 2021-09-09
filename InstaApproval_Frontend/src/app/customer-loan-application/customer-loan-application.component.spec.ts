import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoanApplicationComponent } from './customer-loan-application.component';

describe('CustomerLoanApplicationComponent', () => {
  let component: CustomerLoanApplicationComponent;
  let fixture: ComponentFixture<CustomerLoanApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerLoanApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLoanApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
