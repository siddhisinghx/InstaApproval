import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesofficerApprovedComponent } from './salesofficer-approved.component';

describe('SalesofficerApprovedComponent', () => {
  let component: SalesofficerApprovedComponent;
  let fixture: ComponentFixture<SalesofficerApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesofficerApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesofficerApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
