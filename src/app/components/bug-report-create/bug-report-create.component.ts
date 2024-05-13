import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { BugReport, Status } from 'src/app/dataModel/bug-report';
import { BugReportService } from 'src/app/services/bug-report.service';
import { Router } from '@angular/router';
import { User, defaultUser } from '../../dataModel/user';
import { USERNAME } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bug-report-create',
  templateUrl: './bug-report-create.component.html',
  styleUrls: ['./bug-report-create.component.scss'],
})
export class BugReportCreateComponent implements OnInit {
  createForm: UntypedFormGroup | undefined;
  savingBugReport = false;
  id: number | undefined;
  bugReports: BugReport[] = [];
  bugReport: BugReport | undefined;
  currentUser: User | undefined;

  emptyBugReport: UntypedFormGroup = new UntypedFormGroup({
    title: new UntypedFormControl(),
    priority: new UntypedFormControl(),
    description: new UntypedFormControl(),
  });
  constructor(
    private router: Router,
    private bugReportService: BugReportService,
    private userService: UserService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem(USERNAME)!).subscribe((u) => {
      this.currentUser = u;
      this.createNewBugReportInstance();

      if (this.bugReport) {
        this.createForm = this.fb.group({
          title: [this.bugReport.title, Validators.required],
          priority: this.bugReport.priority,
          status: Status.New,
          description: this.bugReport.description,
          author: this.currentUser,
          comment: this.bugReport.comments,
          created: this.bugReport.created,
        });
      }
    });
  }

  createNewBugReportInstance() {
    this.bugReport = {
      id: -1,
      title: '',
      priority: 3,
      status: Status.New,
      description: '',
      author: this.currentUser!,
      comments: [],
      created: new Date(),
      updated: new Date()
    };
  }

  getBugReports() {
    this.bugReportService
      .getBugReports()
      .subscribe((bugReports) => (this.bugReports = bugReports));
  }

  add(): void {
    this.bugReport = this.createForm?.value;

    if (this.bugReport == null) return;

    this.bugReport.author = this.createForm?.value.author;

    this.bugReportService
      .addBugReport(this.bugReport)
      .subscribe((bugReport) => {
        this.bugReports.push(bugReport);
        this.router.navigate(['/list']);
      });
  }
}
