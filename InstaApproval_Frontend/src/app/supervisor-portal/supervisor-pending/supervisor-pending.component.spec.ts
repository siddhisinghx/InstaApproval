import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorPendingComponent } from './supervisor-pending.component';

describe('SupervisorPendingComponent', () => {
  let component: SupervisorPendingComponent;
  let fixture: ComponentFixture<SupervisorPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
