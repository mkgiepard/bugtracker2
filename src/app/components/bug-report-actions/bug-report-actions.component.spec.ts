import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportActionsComponent } from './bug-report-actions.component';
import { MaterialModule } from '../../modules/material/material.module';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('BugReportActionsComponent', () => {
  let component: BugReportActionsComponent;
  let fixture: ComponentFixture<BugReportActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportActionsComponent],
      imports: [MaterialModule, RouterTestingModule.withRoutes([])],
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
