import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesofficerSidebarComponent } from './salesofficer-sidebar.component';

describe('SalesofficerComponent', () => {
  let component: SalesofficerSidebarComponent;
  let fixture: ComponentFixture<SalesofficerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesofficerSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesofficerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
