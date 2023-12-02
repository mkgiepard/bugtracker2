import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportEditComponent } from './bug-report-edit.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
// Http testing module and mocking controller
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { BugReport, Status } from 'src/app/dataModel/bug-report';
import { User } from 'src/app/dataModel/user';
import { BugReportService } from 'src/app/services/bug-report.service';
import { Observable, of } from 'rxjs';
import { FullNamePipe } from 'src/app/pipes/full-name-pipe';
import { MaterialModule } from '../../modules/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockBugReportService {
  isLoggedIn = true;
  user = { name: 'Test User' };
  testUser: User = new User('Alpha', 'Tester', 'atester');
  testBugReport: BugReport = {
    id: 1002,
    title: 'test bug report ',
    priority: 1,
    status: Status.Accepted,
    description: 'test lorem epsum...',
    author: this.testUser,
    comments: [{ author: this.testUser, comment: 'test first comment' }],
    updates: [],
  };
  getBugReport(id: number): Observable<BugReport> {
    return of(this.testBugReport);
  }
  markAsFixed(bugReport: BugReport): Observable<BugReport> {
    this.testBugReport.status = Status.Fixed;
    this.testBugReport.updates = [
      { author: this.testUser, update: 'Status change: Accepted > Fixed' },
    ];
    return of(this.testBugReport);
  }
  markAsWnf(bugReport: BugReport): Observable<BugReport> {
    this.testBugReport.status = Status.WNF;
    this.testBugReport.updates = [
      { author: this.testUser, update: 'Status change: Accepted > WNF' },
    ];
    return of(this.testBugReport);
  }
  upPriority(bugReport: BugReport): Observable<BugReport> {
    this.testBugReport.priority = 0;
    this.testBugReport.updates = [
      { author: this.testUser, update: 'Priority change: P1 > P0' },
    ];
    return of(this.testBugReport);
  }
  downPriority(bugReport: BugReport): Observable<BugReport> {
    this.testBugReport.priority = 2;
    this.testBugReport.updates = [
      { author: this.testUser, update: 'Priority change: P1 > P2' },
    ];
    return of(this.testBugReport);
  }
}

describe('BugReportEditComponent', () => {
  let component: BugReportEditComponent;
  let fixture: ComponentFixture<BugReportEditComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportEditComponent, FullNamePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: BugReportService, useClass: MockBugReportService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportEditComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /list when "Back" button is clicked ', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const button = getButtonElement('Back');

    button?.click();

    expect(navSpy).toHaveBeenCalledTimes(1);
    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual('/list');
  });

  it('should navigate to /comment when "Comment" button is clicked', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const button = getMatIconElement('comment');

    button?.click();

    expect(navSpy).toHaveBeenCalledTimes(1);
    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual(
      '/comment/' + component.bugReport?.id
    );
  });

  xit('should call markAsFixed() method when "Fixed" button is clicked', () => {});

  xit('should call markAsWnf() method when "Wnf" button is clicked', () => {});

  xit('should call upPriority() method when "Up" button is clicked', () => {});

  xit('should call downPriority() method when "Down" button is clicked', () => {});

  xit('should call delete() method when "Delete" button is clicked', () => {});

  it('should display bugReport title in RW mode after loading', () => {
    const title = getInputElement('Title');

    expect(title.readOnly).toBeFalse();
  });

  xit('should display bugReport priority in RW mode after loading', () => {});

  xit('should display bugReport status in RW mode after loading', () => {});

  it('should display bugReport description in RW mode after loading', () => {
    const desc = getTextAreaElement('Description');

    expect(desc.readOnly).toBeFalse();
  });

  xit('should display bugReport author in RO mode after loading', () => {});

  xit('should show disabled Save button when title is missing', () => {});

  xit('should show disabled Save button when description is missing', () => {});

  xit('should call save() method when Save is clicked', () => {});

  function getButtonElement(text: string): HTMLButtonElement {
    const buttons = fixture.nativeElement.querySelectorAll(
      'button'
    ) as HTMLButtonElement[];
    const button = Array.from(buttons).find(
      (el) => el.textContent === text
    ) as HTMLButtonElement;
    // Needed to prevent 'ERROR: Some of your tests did a full page reload!'
    button.addEventListener('click', function (e) {
      e.preventDefault();
    });
    return button;
  }

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

  function getInputElement(text: string): HTMLInputElement {
    const inputs = fixture.nativeElement.querySelectorAll(
      'input'
    ) as HTMLInputElement[];
    const inputElement = Array.from(inputs).find(
      (el) => el.placeholder === text
    ) as HTMLInputElement;
    return inputElement;
  }

  function getTextAreaElement(text: string): HTMLInputElement {
    const inputs = fixture.nativeElement.querySelectorAll(
      'textarea'
    ) as HTMLInputElement[];
    const inputElement = Array.from(inputs).find(
      (el) => el.placeholder === text
    ) as HTMLInputElement;
    return inputElement;
  }
});
