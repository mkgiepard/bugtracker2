import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { BugReport, Status } from 'src/app/dataModel/bug-report';
import { ActivatedRoute, Router } from '@angular/router';
import { BugReportService } from 'src/app/services/bug-report.service';
import { provideImageKitLoader } from '@angular/common';
import { USERNAME } from '../../services/auth.service';
import { BugReportComment } from 'src/app/dataModel/bug-report-comment';
import { BugReportUpdate } from 'src/app/dataModel/bug-report-update';

type ChangeEntry = BugReportComment | BugReportUpdate;

@Component({
  selector: 'app-bug-report-edit',
  templateUrl: './bug-report-edit.component.html',
  styleUrls: ['./bug-report-edit.component.scss'],
})
export class BugReportEditComponent implements OnInit {
  bugReport: BugReport | undefined;
  bugReportForm: UntypedFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(),
    title: new UntypedFormControl(),
    status: new UntypedFormControl(),
    priority: new UntypedFormControl(),
    description: new UntypedFormControl(),
  });
  bugReportPriority: string | undefined;
  bugReportStatuses = Object.values(Status);
  bugReportChangeLog: ChangeEntry[] = [];
  BugReportComment: BugReportComment | undefined;
  BugReportUpdate: BugReportUpdate | undefined;

  canEdit: Boolean | undefined;
  currentUsername: string | null | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bugReportService: BugReportService
  ) {}

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const idFromRoute = Number(routeParams.get('id'));

    // Get the bugReport through the service
    this.getBugReport(idFromRoute);
    // For setting a value in mat-radio-button you need to pass String
    this.bugReportPriority = this.bugReport?.priority.toString();
  }

  createChangeLog() {
    this.bugReportChangeLog = [];
    if (this.bugReport?.comments) {
      this.bugReportChangeLog = this.bugReportChangeLog.concat(this.bugReport?.comments);
    }
    if (this.bugReport?.updates) {
      this.bugReportChangeLog = this.bugReportChangeLog.concat(this.bugReport?.updates);
    }
    this.bugReportChangeLog.sort((a, b) => {return new Date(a.created).getTime() - new Date(b.created).getTime();});
    this.currentUsername = localStorage.getItem(USERNAME);
  }

  getBugReport(id: number) {
    this.bugReportService.getBugReport(id).subscribe((bugReport) => {
      this.bugReport = bugReport;
      this.bugReportForm!.patchValue({
        id: this.bugReport.id,
        title: this.bugReport.title,
        status: this.bugReport.status,
        priority: this.bugReport.priority,
        description: this.bugReport.description,
      });
      this.createChangeLog();
      this.canEdit = this.bugReport.author.username === localStorage.getItem(USERNAME);
    });
  }

  upPriority() {
    if (this.bugReport == undefined) return;
    if (this.bugReport.priority != 0) {
      const priority = this.bugReport.priority - 1;
      this.bugReportForm!.patchValue({ priority: priority });
    }
    if (this.bugReport == undefined) return;
    this.bugReportService
      .upPriority(this.bugReport)
      .subscribe(() => this.reload());
  }

  downPriority() {
    if (this.bugReport == undefined) return;
    if (this.bugReport.priority != 4) {
      const priority = this.bugReport.priority + 1;
      this.bugReportForm!.patchValue({ priority: priority });
    }
    if (this.bugReport == undefined) return;
    this.bugReportService
      .downPriority(this.bugReport)
      .subscribe(() => this.reload());
  }

  markAsFixed() {
    this.bugReport = Object.assign(this.bugReport!, this.bugReportForm.value);
    if (this.bugReport == undefined) return;
    this.bugReportService
      .markAsFixed(this.bugReport)
      .subscribe(() => this.reload());
  }

  markAsWnf() {
    this.bugReport = Object.assign(this.bugReport!, this.bugReportForm.value);
    if (this.bugReport == undefined) return;
    this.bugReportService
      .markAsWnf(this.bugReport)
      .subscribe(() => this.reload());
  }

  save(): void {
    this.bugReport = Object.assign(this.bugReport!, this.bugReportForm.value);
    if (this.bugReport) {
      this.bugReportService
        .updateBugReport(this.bugReport)
        .subscribe(() => this.goBack());
    }
  }

  delete(): void {
    this.bugReport = Object.assign(this.bugReport!, this.bugReportForm.value);
    if (
      this.bugReport &&
      window.confirm(
        'Are you sure you want to delete: "' + this.bugReport.title + '"?'
      )
    ) {
      this.bugReportService
        .deleteBugReport(this.bugReport.id)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.router.navigate(['/list']);
  }

  reload(): void {
    this.bugReport = Object.assign(this.bugReport!, this.bugReportForm.value);
    if (this.bugReport == undefined) return;
    this.getBugReport(this.bugReport.id);
  }

  canEditComment(username: String): Boolean {
    console.log(username);
    return username === localStorage.getItem(USERNAME)
  }
}
