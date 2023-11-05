import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportListComponent } from './bug-report-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
// Http testing module and mocking controller
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MaterialModule } from '../../modules/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BugReport, Status } from 'src/app/dataModel/bug-report';
import { User } from 'src/app/dataModel/user';
import { BugReportService } from 'src/app/services/bug-report.service';
import { Observable, of } from 'rxjs';
import { FullNamePipe } from 'src/app/pipes/full-name-pipe';

class MockBugReportService {
  isLoggedIn = true;
  user = { name: 'Test User' };
  testUser: User = new User('Alpha', 'Tester', 'atester');
  testBugReports: BugReport[] = [
    {
      id: 1002,
      title: 'test bug report ',
      priority: 1,
      status: Status.Accepted,
      description: 'test lorem epsum...',
      author: this.testUser,
      comments: [{ author: this.testUser, comment: 'test first comment' }],
      updates: [],
    },
    {
      id: 1003,
      title: 'second test bug report ',
      priority: 2,
      status: Status.New,
      description: 'second test lorem epsum...',
      author: this.testUser,
      comments: [
        { author: this.testUser, comment: 'second test first comment' },
      ],
      updates: [],
    },
  ];
  getBugReports(): Observable<BugReport[]> {
    return of(this.testBugReports);
  }
}

describe('BugReportListComponent', () => {
  let component: BugReportListComponent;
  let fixture: ComponentFixture<BugReportListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportListComponent, FullNamePipe],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MaterialModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: BugReportService, useClass: MockBugReportService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should display a table with a header and 1 row per bugReport', () => {});

  xit('should display columns with bugReport details', () => {});

  xit('should display column with action buttons', () => {});

  it('should navigate to create when "FAB" is clicked', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const fab = getMatIconElement('add');

    fab.click();

    expect(navSpy).toHaveBeenCalledTimes(1);
    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual('/create');
  });

  it('should navigate to /comment when "Comment" button is clicked', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const button = getMatIconElement('comment');

    button?.click();

    expect(navSpy).toHaveBeenCalledTimes(1);
    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual(
      '/comment/1002'
    );
  });

  xit('should navigate to /edit/{id} when "Edit" button is clicked', () => {});

  xit('should navigate to /view/{id} when bugReport title is clicked', () => {});

  xit('should call markAsFixed() method when "Fixed" button is clicked', () => {});

  xit('should call markAsWnf() method when "Wnf" button is clicked', () => {});

  xit('should call upPriority() method when "Up" button is clicked', () => {});

  xit('should call downPriority() method when "Down" button is clicked', () => {});

  xit('should call delete() method when "Delete" button is clicked', () => {});

  xit('should display search input filed', () => {});

  function getMatIconElement(text: string): HTMLElement {
    const icons = fixture.nativeElement.querySelectorAll(
      'mat-icon'
    ) as HTMLElement[];
    const icon = Array.from(icons).find(
      (el) => el.innerText === text
    ) as HTMLElement;
    // Needed to prevent 'ERROR: Some of your tests did a full page reload!'
    icon.addEventListener('click', function (e) {
      e.preventDefault();
    });
    return icon;
  }
});
