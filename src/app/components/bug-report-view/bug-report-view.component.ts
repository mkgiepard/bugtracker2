import { Component, OnInit } from '@angular/core';
import { BugReport } from 'src/app/dataModel/bug-report';

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
  constructor() {}

  ngOnInit(): void {}

  bugReport = BUG_REPORT_DATA;

  upPriority() {
    if (this.bugReport.priority == 0) return;
    this.bugReport.priority--;
  }
}
