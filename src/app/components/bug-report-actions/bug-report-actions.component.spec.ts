import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportActionsComponent } from './bug-report-actions.component';

describe('BugReportActionsComponent', () => {
  let component: BugReportActionsComponent;
  let fixture: ComponentFixture<BugReportActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BugReportActionsComponent);
    component = fixture.componentInstance;
    component.id = 1002; // expectedId
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
