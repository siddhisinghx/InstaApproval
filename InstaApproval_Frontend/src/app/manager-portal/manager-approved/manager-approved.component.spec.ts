import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerApprovedComponent } from './manager-approved.component';

describe('ManagerApprovedComponent', () => {
  let component: ManagerApprovedComponent;
  let fixture: ComponentFixture<ManagerApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
