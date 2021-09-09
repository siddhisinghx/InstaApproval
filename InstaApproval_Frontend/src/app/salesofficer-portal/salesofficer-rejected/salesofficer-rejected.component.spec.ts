import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesofficerRejectedComponent } from './salesofficer-rejected.component';

describe('SalesofficerRejectedComponent', () => {
  let component: SalesofficerRejectedComponent;
  let fixture: ComponentFixture<SalesofficerRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesofficerRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesofficerRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
