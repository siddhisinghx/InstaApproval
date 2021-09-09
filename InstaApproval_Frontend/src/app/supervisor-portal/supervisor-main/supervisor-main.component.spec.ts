import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorMainComponent } from './supervisor-main.component';

describe('SupervisorMainComponent', () => {
  let component: SupervisorMainComponent;
  let fixture: ComponentFixture<SupervisorMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
