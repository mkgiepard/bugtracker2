import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportListComponent } from './bug-report-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// Http testing module and mocking controller
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BugReportListComponent', () => {
  let component: BugReportListComponent;
  let fixture: ComponentFixture<BugReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportListComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
