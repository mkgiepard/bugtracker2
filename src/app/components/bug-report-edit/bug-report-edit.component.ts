import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BugReport, bugReportData } from 'src/app/dataModel/bug-report';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bug-report-edit',
  templateUrl: './bug-report-edit.component.html',
  styleUrls: ['./bug-report-edit.component.css'],
})
export class BugReportEditComponent implements OnInit {
  bugReport: BugReport | undefined;
  bugReportForm: FormGroup = new FormGroup({
    bugId: new FormControl(),
    title: new FormControl(),
    status: new FormControl(),
    priority: new FormControl(),
    description: new FormControl(),
  });

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const bugIdFromRoute = Number(routeParams.get('id'));

    // Find the product that correspond with the id provided in route.
    this.bugReport = bugReportData.find(bugReport => bugReport.bugId === bugIdFromRoute);
    this.bugReportForm.patchValue({ bugId: this.bugReport?.bugId });
    this.bugReportForm.patchValue({ title: this.bugReport?.title });
    // For setting a value in mat-radio-button you need to pass String
    this.bugReportForm.patchValue({ priority: this.bugReport?.priority.toString() });
    this.bugReportForm.patchValue({ description: this.bugReport?.description });
  }

  updateProject(bug: BugReport): void {
    for (let b of bugReportData) {
      if (b.bugId == bug.bugId) {
        b.title = bug.title;
        b.priority = +bug.priority; // '+' converts to number
        b.description = bug.description;
      }
    }
    this.router.navigate(["/list"]);
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
    if (this.bugReport.status === "fixed") return;
    this.bugReport.status = "fixed";
  }
}
