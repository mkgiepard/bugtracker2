import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  bugReportForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    status: new FormControl(),
    priority: new FormControl(),
    description: new FormControl(),
  });
  bugReportPriority: string | undefined;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private bugReportService: BugReportService) { }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const idFromRoute = Number(routeParams.get('id'));

    // Get the bugReport through the service
    this.getBugReport(idFromRoute);
    this.bugReportForm.patchValue({ id: this.bugReport?.id });
    this.bugReportForm.patchValue({ title: this.bugReport?.title });
    // For setting a value in mat-radio-button you need to pass String
    this.bugReportPriority = this.bugReport?.priority.toString();
    this.bugReportForm.patchValue({ priority: this.bugReport?.priority.toString() });
    this.bugReportForm.patchValue({ description: this.bugReport?.description });
  }

  getBugReport(id: number) {
    this.bugReportService.getBugReport(id)
      .subscribe(bugReport => this.bugReport = bugReport);
  }

  upPriority() {
    if (this.bugReport == undefined) return;
    if (this.bugReport.priority == 0) return;
    this.bugReport.priority--;
    this.bugReportForm.patchValue({ priority: this.bugReport.priority.toString() });
  }

  downPriority() {
    if (this.bugReport == undefined) return;
    if (this.bugReport.priority == 4) return;
    this.bugReport.priority++;
    this.bugReportForm.patchValue({ priority: this.bugReport.priority.toString() });
  }

  markAsFixed() {
    if (this.bugReport == undefined) return;
    if (this.bugReport.status === Status.Fixed) return;
    this.bugReport.status = Status.Fixed;
  }

  save(): void {
    if (this.bugReport) {
      this.bugReportService.updateBugReport(this.bugReport)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.router.navigate(["/list"]);
  }
}
