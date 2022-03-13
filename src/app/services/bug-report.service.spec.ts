import { TestBed } from '@angular/core/testing';
// Http testing module and mocking controller
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

import { BugReportService } from './bug-report.service';
import { BugReport, Status } from '../dataModel/bug-report';

describe('BugReportService', () => {
  let service: BugReportService;
  let httpTestingController: HttpTestingController;
  let httpSpy: Spy<HttpClient>;
  let fakeBugReports: BugReport[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BugReportService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });
    service = TestBed.inject(BugReportService);
    httpSpy = TestBed.inject<any>(HttpClient);

    httpTestingController = TestBed.get(HttpTestingController);
    fakeBugReports = [
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

  it('#getBugReports should return an expected list of bugReports', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeBugReports);

    service.getBugReports().subscribe({
      next: bugReports => {
        expect(bugReports).toHaveSize(fakeBugReports.length);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('#addBugReport should create a new bugReport', (done: DoneFn) => {

    var newBugReport = {
      id: 1003,
      title: 'dummyy',
      priority: 2,
      status: Status.New,
      description: 'lorem epsum...',
      author: 'Buggy Bug',
    } as BugReport;

    httpSpy.post.and.nextWith(newBugReport);

    service.addBugReport(newBugReport).subscribe({
      next: bugReport => {
        expect(bugReport).toEqual(newBugReport);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('#updateBugReport should update a bugReport with given id', (done: DoneFn) => {

    var bugReport = fakeBugReports[0];
    bugReport.title = "Updated";

    httpSpy.put.and.nextWith(bugReport);

    service.updateBugReport(bugReport).subscribe({
      next: bugReport => {
        expect(bugReport.title).toEqual("Updated");
        done();
      },
      error: done.fail
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('#deleteBugReport should delete an existing bugReport', (done: DoneFn) => {

    httpSpy.delete.and.nextWith(new HttpResponse({
      status: 200
    }));

    service.deleteBugReport(1001).subscribe(
      response => {
        expect(response.status).toEqual(200);
        done();
      },
      done.fail
    );
    expect(httpSpy.delete.calls.count()).toBe(1);
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
