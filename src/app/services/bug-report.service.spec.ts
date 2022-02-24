import { TestBed } from '@angular/core/testing';
// Http testing module and mocking controller
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { BugReportService } from './bug-report.service';

describe('BugReportService', () => {
  let service: BugReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(BugReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
