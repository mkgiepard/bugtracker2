import { TestBed } from '@angular/core/testing';
// Http testing module and mocking controller
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { BugReportService } from './bug-report.service';
import { BugReport, Status } from '../dataModel/bug-report';

describe('BugReportService', () => {
  let service: BugReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(BugReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should increase bugReport priority from 4 to 0', () => {
    fail();
  });

  it('should not increase bugReport priority when it is qual 0', () => {
    fail();
  });

  it('should decrease bugReport priority from 0 to 4', () => {
    fail();
  });

  it('should not increase bugReport priority when it is qual 4', () => {
    fail();
  });
});
