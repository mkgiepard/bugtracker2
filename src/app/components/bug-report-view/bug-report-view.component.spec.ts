import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportViewComponent } from './bug-report-view.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
// Http testing module and mocking controller
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BugReportViewComponent', () => {
  let component: BugReportViewComponent;
  let fixture: ComponentFixture<BugReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportViewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
