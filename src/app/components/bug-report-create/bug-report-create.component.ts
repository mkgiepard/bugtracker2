import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BugReport, Status } from 'src/app/dataModel/bug-report';
import { BugReportService } from 'src/app/services/bug-report.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bug-report-create',
  templateUrl: './bug-report-create.component.html',
  styleUrls: ['./bug-report-create.component.css'],
})
export class BugReportCreateComponent implements OnInit {
  createForm: FormGroup | undefined;
  savingBugReport = false;
  id: number | undefined;
  bugReports: BugReport[] = [];
  bugReport: BugReport | undefined;

  emptyBugReport: FormGroup = new FormGroup({
    title: new FormControl(),
    priority: new FormControl(),
    description: new FormControl(),
  });
  constructor(private router: Router, private bugReportService: BugReportService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createNewBugReportIntance();
    if (this.bugReport) {
      this.createForm = this.fb.group({
        title: [this.bugReport.title, Validators.required],
        priority: this.bugReport.priority,
        status: Status.New,
        description: this.bugReport.description,
        author: this.bugReport.author,
        comment: this.bugReport.comment,
      });
    }
  }

  createNewBugReportIntance() {
    this.bugReport = {
      id: -1,
      title: "",
      priority: 3,
      status: Status.New,
      description: "",
      author: "Jan Kowalski",
      comment: [],
    };
  }

  getBugReports() {
    this.bugReportService.getBugReports()
      .subscribe(bugReports => this.bugReports = bugReports);
  }

  add(bugReport: BugReport): void {
    if (!bugReport) { return; }
    this.bugReportService.addBugReport(bugReport)
      .subscribe(bugReport => {
        this.bugReports.push(bugReport);
        this.router.navigate(["/list"]);
      });
  }
}
