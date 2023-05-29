import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { BugReport, Status, bugReportData } from 'src/app/dataModel/bug-report';
import { ActivatedRoute, Router } from '@angular/router';
import { BugReportService } from 'src/app/services/bug-report.service';

@Component({
  selector: 'app-bug-report-edit',
  templateUrl: './bug-report-edit.component.html',
  styleUrls: ['./bug-report-edit.component.css'],
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

  getBugReport(id: number) {
    this.bugReportService
      .getBugReport(id)
      .subscribe((bugReport) => (this.bugReport = bugReport));
  }

  upPriority() {
    if (this.bugReport == undefined) return;
    this.bugReportService
      .upPriority(this.bugReport)
      .subscribe(() => this.reload());
  }

  downPriority() {
    if (this.bugReport == undefined) return;
    this.bugReportService.downPriority(this.bugReport).subscribe();
  }

  markAsFixed() {
    if (this.bugReport == undefined) return;
    this.bugReportService.markAsFixed(this.bugReport).subscribe();
  }

  markAsWnf() {
    if (this.bugReport == undefined) return;
    this.bugReportService.markAsWnf(this.bugReport).subscribe();
  }

  save(): void {
    if (this.bugReport) {
      this.bugReportService
        .updateBugReport(this.bugReport)
        .subscribe(() => this.goBack());
    }
  }

  delete(): void {
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
    if (this.bugReport == undefined) return;
    this.getBugReport(this.bugReport.id);
  }
}
