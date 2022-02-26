import { Component, OnInit } from '@angular/core';
import { BugReport, Status, bugReportData } from 'src/app/dataModel/bug-report';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private bugReportService: BugReportService) { }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const idFromRoute = Number(routeParams.get('id'));

    // Get the bugReport through the service
    this.getBugReport(idFromRoute);
    this.bugReportForm.patchValue({ priority: this.bugReport?.priority.toString() });
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
}
