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

  xit('should display a table with a header and 1 row per bugReport', () => {});

  xit('should display columns with bugReport details', () => {});

  xit('should display column with action buttons', () => {});

  xit('should navigate to create when "FAB" is clicked', () => {});

  xit('should navigate to /comment when "Comment" button is clicked', () => {});

  xit('should navigate to /edit/{id} when "Edit" button is clicked', () => {});

  xit('should navigate to /view/{id} when bugReport title is clicked', () => {});

  xit('should call markAsFixed() method when "Fixed" button is clicked', () => {});

  xit('should call markAsWnf() method when "Wnf" button is clicked', () => {});

  xit('should call upPriority() method when "Up" button is clicked', () => {});

  xit('should call downPriority() method when "Down" button is clicked', () => {});

  xit('should call delete() method when "Delete" button is clicked', () => {});

  xit('should display search input filed', () => {});
});
