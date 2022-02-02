import { Component, OnInit } from '@angular/core';
import { BugReport, bugReportData } from 'src/app/dataModel/bug-report';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const bugIdFromRoute = Number(routeParams.get('id'));

    // Find the product that correspond with the id provided in route.
    this.bugReport = bugReportData.find(bugReport => bugReport.bugId === bugIdFromRoute);
    this.bugReportForm.patchValue({ priority: 'p' + this.bugReport?.priority });
  }

  upPriority() {
    if (this.bugReport == undefined) return;
    if (this.bugReport.priority == 0) return;
    this.bugReport.priority--;
    this.bugReportForm.patchValue({ priority: 'p' + this.bugReport.priority });
  }

  downPriority() {
    if (this.bugReport == undefined) return;
    if (this.bugReport.priority == 4) return;
    this.bugReport.priority++;
    this.bugReportForm.patchValue({ priority: 'p' + this.bugReport.priority });
  }
}
