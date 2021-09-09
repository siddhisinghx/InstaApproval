import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRejectedComponent } from './manager-rejected.component';

describe('ManagerRejectedComponent', () => {
  let component: ManagerRejectedComponent;
  let fixture: ComponentFixture<ManagerRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
