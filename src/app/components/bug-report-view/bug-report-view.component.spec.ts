import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportViewComponent } from './bug-report-view.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
// Http testing module and mocking controller
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BugReport, Status } from 'src/app/dataModel/bug-report';
import { User } from 'src/app/dataModel/user';
import { BugReportService } from 'src/app/services/bug-report.service';
import { Observable, of } from 'rxjs';
import { FullNamePipe } from 'src/app/pipes/full-name-pipe';
import { Router } from '@angular/router';
import { MaterialModule } from '../../modules/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockBugReportService {
  isLoggedIn = true;
  user = { name: 'Test User' };
  testUser: User = {
    username: 'atester',
    email: 'atester@softtest.dev',
    firstName: 'Alpha',
    lastName: 'Tester',
  };
  testBugReport: BugReport = {
    id: 1002,
    title: 'test bug report ',
    priority: 1,
    status: Status.Accepted,
    description: 'test lorem epsum...',
    author: this.testUser,
    comments: [{ author: this.testUser, comment: 'test first comment', created: new Date(2024, 3, 21) }],
    updates: [],
    created: new Date(2024, 1, 12),
    updated: new Date(2024, 3, 21)
  };
  getBugReport(id: number): Observable<BugReport> {
    return of(this.testBugReport);
  }
  markAsFixed(bugReport: BugReport): Observable<BugReport> {
    this.testBugReport.status = Status.Fixed;
    this.testBugReport.updates = [
      { author: this.testUser, update: 'Status change: Accepted > Fixed', created: new Date(2024, 3, 21) },
    ];
    return of(this.testBugReport);
  }
  markAsWnf(bugReport: BugReport): Observable<BugReport> {
    this.testBugReport.status = Status.WNF;
    this.testBugReport.updates = [
      { author: this.testUser, update: 'Status change: Accepted > WNF', created: new Date(2024, 3, 21) },
    ];
    return of(this.testBugReport);
  }
  upPriority(bugReport: BugReport): Observable<BugReport> {
    this.testBugReport.priority = 0;
    this.testBugReport.updates = [
      { author: this.testUser, update: 'Priority change: P1 > P0', created: new Date(2024, 3, 21) },
    ];
    return of(this.testBugReport);
  }
  downPriority(bugReport: BugReport): Observable<BugReport> {
    this.testBugReport.priority = 2;
    this.testBugReport.updates = [
      { author: this.testUser, update: 'Priority change: P1 > P2', created: new Date(2024, 3, 21) },
    ];
    return of(this.testBugReport);
  }
}

describe('BugReportViewComponent', () => {
  let component: BugReportViewComponent;
  let fixture: ComponentFixture<BugReportViewComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportViewComponent, FullNamePipe],
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

  beforeAll(() => {
    window.onbeforeunload = () => 'Oh no!';
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportViewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show bug report data in the view form', () => {
    const title = getInputElement('Title');
    const description = getTextAreaElement('Description');
    const comment = getTextAreaElement('Comment');
    // TODO: add checks for priority, author and status

    expect(title.value).toEqual('test bug report ');
    expect(description.value).toEqual('test lorem epsum...');
    expect(comment.value).toEqual('test first comment');
  });

  it('should navigate to /list when "Back" button is clicked ', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const button = getButtonElement('Back');

    button?.click();

    expect(navSpy).toHaveBeenCalledTimes(1);
    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual('/list');
  });

  it('should navigate to /edit/{id} when "Edit" button is clicked ', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const button = getButtonElement('Edit');

    button?.click();

    expect(navSpy).toHaveBeenCalledTimes(1);
    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual(
      '/edit/' + component.bugReport?.id
    );
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

  it('should call markAsFixed() method when "Fixed" button is clicked', () => {
    spyOn(component, 'markAsFixed');

    const fixedButton = getMatIconElement('done');
    fixedButton.click();

    expect(component.markAsFixed).toHaveBeenCalled();
  });

  it('should call markAsWnf() method when "Wnf" button is clicked', () => {
    spyOn(component, 'markAsWnf');

    const wnfButton = getMatIconElement('close');
    wnfButton.click();

    expect(component.markAsWnf).toHaveBeenCalled();
  });

  it('should call upPriority() method when "Up" button is clicked', () => {
    spyOn(component, 'upPriority');

    const upButton = getMatIconElement('arrow_circle_up');
    upButton.click();

    expect(component.upPriority).toHaveBeenCalled();
  });

  it('should call downPriority() method when "Down" button is clicked', () => {
    spyOn(component, 'downPriority');

    const downButton = getMatIconElement('arrow_circle_down');
    downButton.click();

    expect(component.downPriority).toHaveBeenCalled();
  });

  it('should call delete() method when "Delete" button is clicked', () => {
    spyOn(component, 'delete');

    const deleteButton = getMatIconElement('delete');
    deleteButton.click();

    expect(component.delete).toHaveBeenCalled();
  });

  it('should display new update when "Fixed" button is clicked', () => {
    const fixedButton = getMatIconElement('done');
    fixedButton.click();
    fixture.detectChanges();

    const updateElements = getElementByClass('update');
    expect(updateElements.length).toEqual(1);
    expect(updateElements[0].textContent).toContain('Author: Alpha Tester');
    expect(updateElements[0].textContent).toContain(
      'Status change: Accepted > Fixed'
    );
  });

  it('should display new update when "WNF" button is clicked', () => {
    const wnfButton = getMatIconElement('close');
    wnfButton.click();
    fixture.detectChanges();

    const updateElements = getElementByClass('update');
    expect(updateElements.length).toEqual(1);
    expect(updateElements[0].textContent).toContain('Author: Alpha Tester');
    expect(updateElements[0].textContent).toContain(
      'Status change: Accepted > WNF'
    );
  });

  it('should display new update when "Up" button is clicked', () => {
    const upButton = getMatIconElement('arrow_circle_up');
    upButton.click();
    fixture.detectChanges();

    const updateElements = getElementByClass('update');
    expect(updateElements.length).toEqual(1);
    expect(updateElements[0].textContent).toContain('Author: Alpha Tester');
    expect(updateElements[0].textContent).toContain('Priority change: P1 > P0');
  });

  it('should display new update when "Down" button is clicked', () => {
    const downButton = getMatIconElement('arrow_circle_down');
    downButton.click();
    fixture.detectChanges();

    const updateElements = getElementByClass('update');
    expect(updateElements.length).toEqual(1);
    expect(updateElements[0].textContent).toContain('Author: Alpha Tester');
    expect(updateElements[0].textContent).toContain('Priority change: P1 > P2');
  });

  it('should display new update when bug priority is changed', () => {
    const priority2 = getInputElementByValue('2');
    priority2.click();
    fixture.detectChanges();

    const updateLabel = getElementByClass('update-note');
    expect(updateLabel.length).toEqual(1);
    expect(updateLabel[0].textContent).toContain(
      'NOTE: Priority or Status were changed.'
    );
  });

  it('should apply "changed" class to the main mat-card when bug data are changed', () => {
    const frame = fixture.nativeElement.querySelector(
      'mat-card'
    ) as HTMLElement;
    const downButton = getMatIconElement('arrow_circle_down');

    downButton.click();
    fixture.detectChanges();

    expect(frame?.classList.contains('changed')).toBeTrue();
  });

  it('should display title as read-only', () => {
    const title = getInputElement('Title');

    expect(title.readOnly).toBeTrue();
  });

  it('should display description as read-only', () => {
    const description = getTextAreaElement('Description');

    expect(description.readOnly).toBeTrue();
  });

  it('should display comments as read-only', () => {
    const comment = getTextAreaElement('Comment');

    expect(comment.readOnly).toBeTrue();
  });

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

  function getElementByClass(cssClass: string): HTMLElement[] {
    return fixture.nativeElement.querySelectorAll(
      '.' + cssClass
    ) as HTMLElement[];
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

  function getInputElementByValue(value: string): HTMLInputElement {
    const inputs = fixture.nativeElement.querySelectorAll(
      'input'
    ) as HTMLInputElement[];
    const inputElement = Array.from(inputs).find(
      (el) => el.value === value
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
