import { TestBed } from '@angular/core/testing';
// Http testing module and mocking controller
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

import { BugReportService } from './bug-report.service';
import { BugReport, Status } from '../dataModel/bug-report';
import { User } from '../dataModel/user';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

class MockUserService {
  fakeUser: User = {
    username: 'ab',
    email: 'ab@softtest.dev',
    firstName: 'a',
    lastName: 'b',
  };

  getUser(username: string) {
    return of(this.fakeUser);
  }
}

describe('BugReportService', () => {
  let service: BugReportService;
  let httpSpy: Spy<HttpClient>;
  let fakeBugReports: BugReport[];
  const fakeUser: User = {
    username: 'ab',
    email: 'ab@softtest.dev',
    firstName: 'a',
    lastName: 'b',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BugReportService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
        { provide: UserService, useClass: MockUserService },
      ],
    });
    service = TestBed.inject(BugReportService);
    httpSpy = TestBed.inject<any>(HttpClient);

    fakeBugReports = [
      {
        id: 1000,
        title: 'highest priority',
        priority: 0,
        status: Status.New,
        description: 'lorem epsum...',
        author: fakeUser,
        created: new Date(1924, 1, 12),
        updated: new Date(2024, 3, 21)
      },
      {
        id: 1001,
        title: 'lowest priority',
        priority: 4,
        status: Status.Accepted,
        description: 'lorem epsum...',
        author: fakeUser,
        created: new Date(1924, 1, 12),
        updated: new Date(2024, 3, 21)
      },
      {
        id: 1002,
        title: 'New',
        priority: 0,
        status: Status.New,
        description: 'lorem epsum...',
        author: fakeUser,
        created: new Date(1924, 1, 12),
        updated: new Date(2024, 3, 21)
      },
      {
        id: 1003,
        title: 'Fixed',
        priority: 0,
        status: Status.Fixed,
        description: 'lorem epsum...',
        author: fakeUser,
        created: new Date(1924, 1, 12),
        updated: new Date(2024, 3, 21)
      },
      {
        id: 1004,
        title: 'Wnf',
        priority: 0,
        status: Status.WNF,
        description: 'lorem epsum...',
        author: fakeUser,
        created: new Date(1924, 1, 12),
        updated: new Date(2024, 3, 21)
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getBugReports should return an expected list of bugReports', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeBugReports);

    service.getBugReports().subscribe({
      next: (bugReports) => {
        expect(bugReports).toHaveSize(fakeBugReports.length);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('#addBugReport should create a new bugReport', (done: DoneFn) => {
    const newBugReport = {
      id: 1003,
      title: 'dummyy',
      priority: 2,
      status: Status.New,
      description: 'lorem epsum...',
      author: fakeUser,
    } as BugReport;

    httpSpy.post.and.nextWith(newBugReport);

    service.addBugReport(newBugReport).subscribe({
      next: (bugReport) => {
        expect(bugReport).toEqual(newBugReport);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('#updateBugReport should update a bugReport with given id', (done: DoneFn) => {
    const bugReport = fakeBugReports[0];
    bugReport.title = 'Updated';

    httpSpy.put.and.nextWith(bugReport);

    service.updateBugReport(bugReport).subscribe({
      next: (bugReport) => {
        expect(bugReport.title).toEqual('Updated');
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('#deleteBugReport should delete an existing bugReport', (done: DoneFn) => {
    httpSpy.delete.and.nextWith(
      new HttpResponse({
        status: 200,
      })
    );

    service.deleteBugReport(1001).subscribe((response) => {
      expect(response.status).toEqual(200);
      done();
    }, done.fail);
    expect(httpSpy.delete.calls.count()).toBe(1);
  });

  it('#upPriority should increase bugReport priority from 4 to 3', (done: DoneFn) => {
    const bugReport = fakeBugReports[1];
    httpSpy.put.and.nextWith(bugReport);
    service.upPriority(bugReport).subscribe({
      next: (bugReport) => {
        expect(bugReport.priority).toEqual(3);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('#upPriority should not increase bugReport priority when it is qual 0', (done: DoneFn) => {
    const bugReport = fakeBugReports[0];
    httpSpy.put.and.nextWith(bugReport);
    service.upPriority(bugReport).subscribe({
      next: (bugReport) => {
        expect(bugReport.priority).toEqual(0);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('#downPriority should decrease bugReport priority from 0 to 1', (done: DoneFn) => {
    const bugReport = fakeBugReports[0];
    httpSpy.put.and.nextWith(bugReport);
    service.downPriority(bugReport).subscribe({
      next: (bugReport) => {
        expect(bugReport.priority).toEqual(1);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('#downPriority should not increase bugReport priority when it is qual 4', (done: DoneFn) => {
    const bugReport = fakeBugReports[1];
    httpSpy.put.and.nextWith(bugReport);
    service.downPriority(bugReport).subscribe({
      next: (bugReport) => {
        expect(bugReport.priority).toEqual(4);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('#markAsFixed should change bugReport status to Fixed if not set yet', (done: DoneFn) => {
    const bugReport = fakeBugReports[2];
    httpSpy.put.and.nextWith(bugReport);
    service.markAsFixed(bugReport).subscribe({
      next: (bugReport) => {
        expect(bugReport.status).toEqual(Status.Fixed);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('#markAsFixed should do nothing if bugreport status is set to Fixed already', (done: DoneFn) => {
    const bugReport = fakeBugReports[3];
    httpSpy.put.and.nextWith(bugReport);
    service.markAsFixed(bugReport).subscribe({
      next: (bugReport) => {
        expect(bugReport.status).toEqual(Status.Fixed);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('#markAsWnf should change bugReport status to WNF if not set to Fixed or WNF', (done: DoneFn) => {
    const bugReport = fakeBugReports[2];
    httpSpy.put.and.nextWith(bugReport);
    service.markAsWnf(bugReport).subscribe({
      next: (bugReport) => {
        expect(bugReport.status).toEqual(Status.WNF);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('#markAsWnf should do nothing if bugreport status is set to Fixed', (done: DoneFn) => {
    const bugReport = fakeBugReports[3];
    httpSpy.put.and.nextWith(bugReport);
    service.markAsWnf(bugReport).subscribe({
      next: (bugReport) => {
        expect(bugReport.status).toEqual(Status.Fixed);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('#markAsWnf should do nothing if bugreport status is set to WNF', (done: DoneFn) => {
    const bugReport = fakeBugReports[4];
    httpSpy.put.and.nextWith(bugReport);
    service.markAsWnf(bugReport).subscribe({
      next: (bugReport) => {
        expect(bugReport.status).toEqual(Status.WNF);
        done();
      },
      error: done.fail,
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });
});
