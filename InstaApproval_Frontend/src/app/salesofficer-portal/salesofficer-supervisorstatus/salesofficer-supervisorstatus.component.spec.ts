import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesofficerSupervisorstatusComponent } from './salesofficer-supervisorstatus.component';

describe('SalesofficerSupervisorstatusComponent', () => {
  let component: SalesofficerSupervisorstatusComponent;
  let fixture: ComponentFixture<SalesofficerSupervisorstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesofficerSupervisorstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesofficerSupervisorstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
