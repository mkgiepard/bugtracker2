import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatRadioButtonHarness } from '@angular/material/radio/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CastPipe } from 'src/app/pipes/cast.pipe';

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

describe('BugReportEditComponent', () => {
  let component: BugReportEditComponent;
  let fixture: ComponentFixture<BugReportEditComponent>;
  let router: Router;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportEditComponent, FullNamePipe, CastPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
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
    loader = TestbedHarnessEnvironment.loader(fixture);
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

  it('should display bugReport title in RW mode after loading', () => {
    const title = getInputElement('Title');

    expect(title.readOnly).toBeFalse();
  });

  it('should display bugReport priority in RW mode after loading', async () => {
    const priority = getElementsByClass('priority');
    const buttons = await loader.getAllHarnesses(MatRadioButtonHarness);

    expect(priority.length).toEqual(1);
    expect(buttons.length).toEqual(5);
    expect(buttons[0].isDisabled).toBeFalse;
    expect(buttons[1].isDisabled).toBeFalse;
    expect(buttons[2].isDisabled).toBeFalse;
    expect(buttons[3].isDisabled).toBeFalse;
    expect(buttons[4].isDisabled).toBeFalse;
  });

  it('should display bugReport status in RW mode after loading', () => {
    const status = getElementsByClass('status');

    expect(status.length).toEqual(1);
    expect(status[0].ariaDisabled).toEqual('false');
  });

  it('should display bugReport description in RO mode after loading if a user != author', () => {
    const desc = getTextAreaElement('Description');

    expect(desc.readOnly).toBeTrue();
  });

  it('should display a RO label with bugReport author after loading', () => {
    const author = getElementsByClass('author');

    expect(author.length).toEqual(1);
    expect(author[0].textContent).toContain('Alpha Tester');
  });

  it('should show disabled Save button when title is missing', () => {
    seedInputElement('Title', '');
    fixture.detectChanges();
    let saveButton = getButtonElement('Save');

    expect(saveButton?.disabled).toBeTruthy();
  });

  it('should show disabled Save button when description is missing', () => {
    seedInputElement('Description', '');
    fixture.detectChanges();
    let saveButton = getButtonElement('Save');

    expect(saveButton?.disabled).toBeTruthy();
  });

  it('should call save() method when Save is clicked', () => {
    spyOn(component, 'save');

    seedInputElement('Description', 'testing');
    fixture.detectChanges();
    let saveButton = getButtonElement('Save');

    saveButton.click();

    expect(fixture.componentInstance.save).toHaveBeenCalled();
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

  function getElementsByClass(cssClass: string): HTMLElement[] {
    return fixture.nativeElement.querySelectorAll(
      '.' + cssClass
    ) as HTMLElement[];
  }

  function seedInputElement(text: string, value: string) {
    let input = getInputElement(text);
    if (input == null) {
      input = getTextAreaElement(text);
    }
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
});
