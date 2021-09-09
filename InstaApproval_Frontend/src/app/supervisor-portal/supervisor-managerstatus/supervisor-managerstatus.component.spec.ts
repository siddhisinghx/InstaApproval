import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorManagerstatusComponent } from './supervisor-managerstatus.component';

describe('SupervisorManagerstatusComponent', () => {
  let component: SupervisorManagerstatusComponent;
  let fixture: ComponentFixture<SupervisorManagerstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorManagerstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorManagerstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
