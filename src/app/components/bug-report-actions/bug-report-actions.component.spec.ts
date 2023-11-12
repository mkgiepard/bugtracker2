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
}

describe('BugReportActionsComponent', () => {
  let component: BugReportActionsComponent;
  let fixture: ComponentFixture<BugReportActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportActionsComponent],
      imports: [MaterialModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: BugReportService, useClass: MockBugReportService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BugReportActionsComponent);
    component = fixture.componentInstance;
    component.bugReport = testBugReport;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call markAsFixed() method when "Fixed" button is clicked', () => {
    spyOn(component, 'markAsFixed');

    const fixedButton = getMatIconElement('done');
    fixedButton.click();

    expect(component.markAsFixed).toHaveBeenCalled();
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
