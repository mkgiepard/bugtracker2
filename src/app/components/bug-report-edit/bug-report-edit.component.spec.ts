import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportEditComponent } from './bug-report-edit.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
// Http testing module and mocking controller
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BugReportEditComponent', () => {
  let component: BugReportEditComponent;
  let fixture: ComponentFixture<BugReportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should navigate to /list when "Back" button is clicked ', () => {});

  xit('should navigate to /comment when "Comment" button is clicked', () => {});

  xit('should call markAsFixed() method when "Fixed" button is clicked', () => {});

  xit('should call markAsWnf() method when "Wnf" button is clicked', () => {});

  xit('should call upPriority() method when "Up" button is clicked', () => {});

  xit('should call downPriority() method when "Down" button is clicked', () => {});

  xit('should call delete() method when "Delete" button is clicked', () => {});

  xit('should display bugReport title in RW mode after loading', () => {});

  xit('should display bugReport priority in RW mode after loading', () => {});

  xit('should display bugReport status in RW mode after loading', () => {});

  xit('should display bugReport description in RW mode after loading', () => {});

  xit('should display bugReport author in RO mode after loading', () => {});

  xit('should show disabled Save button when title is missing', () => {});

  xit('should show disabled Save button when description is missing', () => {});

  xit('should call save() method when Save is clicked', () => {});
});
