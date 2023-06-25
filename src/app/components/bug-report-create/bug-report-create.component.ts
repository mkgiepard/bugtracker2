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
import { defaultUser } from '../../dataModel/user';

@Component({
  selector: 'app-bug-report-create',
  templateUrl: './bug-report-create.component.html',
  styleUrls: ['./bug-report-create.component.css'],
})
export class BugReportCreateComponent implements OnInit {
  createForm: UntypedFormGroup | undefined;
  savingBugReport = false;
  id: number | undefined;
  bugReports: BugReport[] = [];
  bugReport: BugReport | undefined;

  emptyBugReport: UntypedFormGroup = new UntypedFormGroup({
    title: new UntypedFormControl(),
    priority: new UntypedFormControl(),
    description: new UntypedFormControl(),
  });
  constructor(
    private router: Router,
    private bugReportService: BugReportService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.createNewBugReportIntance();
    if (this.bugReport) {
      this.createForm = this.fb.group({
        title: [this.bugReport.title, Validators.required],
        priority: this.bugReport.priority,
        status: Status.New,
        description: this.bugReport.description,
        author: this.bugReport.author.username,
        comment: this.bugReport.comments,
      });
    }
  }

  createNewBugReportIntance() {
    this.bugReport = {
      id: -1,
      title: '',
      priority: 3,
      status: Status.New,
      description: '',
      author: defaultUser,
      comments: [],
    };
  }

  getBugReports() {
    this.bugReportService
      .getBugReports()
      .subscribe((bugReports) => (this.bugReports = bugReports));
  }

  add(bugReport: BugReport): void {
    if (!bugReport) {
      return;
    }
    this.bugReportService.addBugReport(bugReport).subscribe((bugReport) => {
      this.bugReports.push(bugReport);
      this.router.navigate(['/list']);
    });
  }
}
