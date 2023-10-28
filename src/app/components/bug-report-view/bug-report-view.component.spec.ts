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
  testUser: User = new User('Alpha', 'Tester', 'atester');
  testBugReport: BugReport = {
    id: 1002,
    title: 'test bug report ',
    priority: 1,
    status: Status.Accepted,
    description: 'test lorem epsum...',
    author: this.testUser,
    comments: [{ author: this.testUser, comment: 'test first comment' }],
  };
  getBugReport(id: number): Observable<BugReport> {
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

  xit('should show bug report data in the view form', () => {});

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

  it('should call markAsWnf() method when "WNF" button is clicked', () => {
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

  xit('should display new update when "Fixed" button is clicked', () => {});

  xit('should display new update when "WNF" button is clicked', () => {});

  xit('should display new update when "Up" button is clicked', () => {});

  xit('should display new update when "Down" button is clicked', () => {});

  xit('should display new update when bug priority is changed', () => {});

  xit('should display yellow warning frame when bug data are changed', () => {});

  xit('should display title as read-only', () => {});

  xit('should display description as read-only', () => {});

  xit('should display comments as read-only', () => {});

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
});
