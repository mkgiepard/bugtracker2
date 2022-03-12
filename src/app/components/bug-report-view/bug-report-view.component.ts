import { Component, OnInit } from '@angular/core';
import { BugReport, Status, bugReportData } from 'src/app/dataModel/bug-report';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BugReportService } from 'src/app/services/bug-report.service';

@Component({
  selector: 'app-bug-report-view',
  templateUrl: './bug-report-view.component.html',
  styleUrls: ['./bug-report-view.component.css'],
})
export class BugReportViewComponent implements OnInit {
  bugReport: BugReport | undefined;
  bugReportForm: FormGroup = new FormGroup({
    title: new FormControl(),
    priority: new FormControl(),
    description: new FormControl(),
  });
  bugReportPriority: string | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private bugReportService: BugReportService) { }

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
    this.bugReportService.getBugReport(id)
      .subscribe(bugReport => this.bugReport = bugReport);
  }

  upPriority() {
    if (this.bugReport == undefined) return;
    this.bugReportService.upPriority(this.bugReport).subscribe(() => this.reload());
  }

  downPriority() {
    if (this.bugReport == undefined) return;
    this.bugReportService.downPriority(this.bugReport).subscribe();
  }

  markAsFixed() {
    if (this.bugReport == undefined) return;
    if (this.bugReport.status === Status.Fixed) return;
    this.bugReport.status = Status.Fixed;
  }

  markAsWnf() {
    if (this.bugReport == undefined) return;
    if (this.bugReport.status === Status.WNF || this.bugReport.status === Status.Fixed) return;
    this.bugReport.status = Status.WNF;
  }

  delete(): void {
    if (this.bugReport) {
      this.bugReportService.deleteBugReport(this.bugReport.id).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.router.navigate(["/list"]);
  }

  reload(): void {
    if (this.bugReport == undefined) return;
    this.getBugReport(this.bugReport.id);
  }
}
