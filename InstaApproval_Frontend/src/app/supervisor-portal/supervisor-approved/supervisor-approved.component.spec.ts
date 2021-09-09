import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorApprovedComponent } from './supervisor-approved.component';

describe('SupervisorApprovedComponent', () => {
  let component: SupervisorApprovedComponent;
  let fixture: ComponentFixture<SupervisorApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
