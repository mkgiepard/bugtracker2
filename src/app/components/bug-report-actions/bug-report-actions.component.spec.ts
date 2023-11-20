import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportActionsComponent } from './bug-report-actions.component';
import { MaterialModule } from '../../modules/material/material.module';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BugReport, Status } from 'src/app/dataModel/bug-report';
import { User } from 'src/app/dataModel/user';
import { BugReportService } from 'src/app/services/bug-report.service';
import { Observable, of } from 'rxjs';

let user = { name: 'Test User' };
let testUser: User = new User('Alpha', 'Tester', 'atester');
let testBugReport: BugReport = {
  id: 1002,
  title: 'test bug report ',
  priority: 1,
  status: Status.Accepted,
  description: 'test lorem epsum...',
  author: testUser,
  comments: [{ author: testUser, comment: 'test first comment' }],
  updates: [],
};

class MockBugReportService {
  isLoggedIn = true;
  markAsFixed(bugReport: BugReport): Observable<BugReport> {
    bugReport.status = Status.Fixed;
    bugReport.updates = [
      { author: testUser, update: 'Status change: Accepted > Fixed' },
    ];
    return of(bugReport);
  }
  markAsWnf(bugReport: BugReport): Observable<BugReport> {
    bugReport.status = Status.WNF;
    bugReport.updates = [
      { author: testUser, update: 'Status change: Accepted > WNF' },
    ];
    return of(bugReport);
  }
}

describe('BugReportActionsComponent', () => {
  let bugReportService: BugReportService;
  let component: BugReportActionsComponent;
  let fixture: ComponentFixture<BugReportActionsComponent>;
  let router: Router;

  const mockedBugReportService = jasmine.createSpyObj('BugReportService', [
    'markAsFixed',
    'markAsWnf',
    'upPriority',
    'downPriority',
    'deleteBugReport',
  ]);
  mockedBugReportService.markAsFixed.and.returnValue({ subscribe: () => {} });
  mockedBugReportService.markAsWnf.and.returnValue({ subscribe: () => {} });
  mockedBugReportService.upPriority.and.returnValue({ subscribe: () => {} });
  mockedBugReportService.downPriority.and.returnValue({ subscribe: () => {} });
  mockedBugReportService.deleteBugReport.and.returnValue({
    subscribe: () => {},
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportActionsComponent],
      imports: [MaterialModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: BugReportService, useValue: mockedBugReportService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BugReportActionsComponent);
    component = fixture.componentInstance;
    component.bugReport = testBugReport;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call markAsFixed() method when "Fixed" button is clicked', () => {
    spyOn(component, 'markAsFixed').and.callThrough();

    const fixedButton = getMatIconElement('done');
    fixedButton.click();

    expect(component.markAsFixed).toHaveBeenCalled();
    expect(mockedBugReportService.markAsFixed).toHaveBeenCalled();
  });

  it('should call markAsWnf() method when "Wnf" button is clicked', () => {
    spyOn(component, 'markAsWnf').and.callThrough();

    const wnfButton = getMatIconElement('close');
    wnfButton.click();

    expect(component.markAsWnf).toHaveBeenCalled();
    expect(mockedBugReportService.markAsWnf).toHaveBeenCalled();
  });

  it('should call upPriority() method when "Up" button is clicked', () => {
    spyOn(component, 'upPriority').and.callThrough();

    const upButton = getMatIconElement('arrow_circle_up');
    upButton.click();

    expect(component.upPriority).toHaveBeenCalled();
    expect(mockedBugReportService.upPriority).toHaveBeenCalled();
  });

  it('should call downPriority() method when "Down" button is clicked', () => {
    spyOn(component, 'downPriority').and.callThrough();

    const upButton = getMatIconElement('arrow_circle_down');
    upButton.click();

    expect(component.downPriority).toHaveBeenCalled();
    expect(mockedBugReportService.downPriority).toHaveBeenCalled();
  });

  it('should call delete() method when "Delete" button is clicked', () => {
    spyOn(component, 'delete').and.callThrough();

    const deleteButton = getMatIconElement('delete');
    deleteButton.click();

    expect(component.delete).toHaveBeenCalled();
    expect(mockedBugReportService.deleteBugReport).toHaveBeenCalled();
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
