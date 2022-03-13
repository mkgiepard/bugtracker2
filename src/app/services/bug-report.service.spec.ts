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
  let httpTestingController: HttpTestingController;
  let mockBugReports: BugReport[];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(BugReportService);
    httpTestingController = TestBed.get(HttpTestingController);
    mockBugReports = [
      {
        id: 1001,
        title: 'highest priority',
        priority: 0,
        status: Status.New,
        description: 'lorem epsum...',
        author: 'Buggy Bug',
      },
      {
        id: 1002,
        title: 'lowest priority',
        priority: 4,
        status: Status.Accepted,
        description: 'lorem epsum...',
        author: 'Buggy Bug',
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET a list of bugReports', () => {
    service.getBugReports().subscribe((bugReports) => {
      expect(bugReports.length).toBe(2);
      expect(bugReports).toEqual(mockBugReports);
    });
    const request = httpTestingController.expectOne("api/bugReports");
    expect(request.request.method).toBe("GET");
    request.flush(mockBugReports);
    httpTestingController.verify();
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
