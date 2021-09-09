import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesofficerMainComponent } from './salesofficer-main.component';

describe('SalesofficerMainComponent', () => {
  let component: SalesofficerMainComponent;
  let fixture: ComponentFixture<SalesofficerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesofficerMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesofficerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
