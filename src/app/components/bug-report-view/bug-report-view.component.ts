import { Component, OnInit } from '@angular/core';
import { BugReport } from 'src/app/dataModel/bug-report';
import { FormControl, FormGroup } from '@angular/forms';

const BUG_REPORT_DATA: BugReport = {
  bug_id: 1001,
  title: 'bug report 1',
  priority: 2,
  status: 'new',
};

@Component({
  selector: 'app-bug-report-view',
  templateUrl: './bug-report-view.component.html',
  styleUrls: ['./bug-report-view.component.css'],
})
export class BugReportViewComponent implements OnInit {
  bugReport = BUG_REPORT_DATA;
  bugReportForm: FormGroup = new FormGroup({
    title: new FormControl(),
    priority: new FormControl('p' + this.bugReport.priority),
    description: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {}

  upPriority() {
    if (this.bugReport.priority == 0) return;
    this.bugReport.priority--;
    this.bugReportForm.patchValue({ priority: 'p' + this.bugReport.priority });
  }

  downPriority() {
    if (this.bugReport.priority == 4) return;
    this.bugReport.priority++;
    this.bugReportForm.patchValue({ priority: 'p' + this.bugReport.priority });
  }
}
