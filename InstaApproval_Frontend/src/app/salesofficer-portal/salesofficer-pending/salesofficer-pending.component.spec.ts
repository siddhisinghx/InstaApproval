import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesofficerPendingComponent } from './salesofficer-pending.component';

describe('SalesofficerPendingComponent', () => {
  let component: SalesofficerPendingComponent;
  let fixture: ComponentFixture<SalesofficerPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesofficerPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesofficerPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
