import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorRejectedComponent } from './supervisor-rejected.component';

describe('SupervisorRejectedComponent', () => {
  let component: SupervisorRejectedComponent;
  let fixture: ComponentFixture<SupervisorRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
