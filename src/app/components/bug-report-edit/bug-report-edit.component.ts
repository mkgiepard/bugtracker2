import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BugReport, bugReportData } from 'src/app/dataModel/bug-report';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bug-report-edit',
  templateUrl: './bug-report-edit.component.html',
  styleUrls: ['./bug-report-edit.component.css'],
})
export class BugReportEditComponent implements OnInit {
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
    this.bugReport = bugReportData.find(bugReport => bugReport.bug_id === bugIdFromRoute);
    this.bugReportForm.patchValue({ title: this.bugReport?.title });
    this.bugReportForm.patchValue({ priority: 'p' + this.bugReport?.priority });
    this.bugReportForm.patchValue({ description: this.bugReport?.description });
  }

  onSave(): void { }

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
