import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BugReport } from 'src/app/dataModel/bug-report';

const BUG_REPORT_DATA: BugReport[] = [
  { bug_id: 1001, title: 'bug report 1', priority: 0, status: 'new' },
  { bug_id: 1002, title: 'bug report 2', priority: 1, status: 'assigned' },
  { bug_id: 1003, title: 'bug report 3', priority: 2, status: 'accepted' },
  { bug_id: 1004, title: 'bug report 4', priority: 0, status: 'fixed' },
  { bug_id: 1005, title: 'bug report 5', priority: 1, status: 'wai' },
  { bug_id: 1006, title: 'bug report 6', priority: 2, status: 'wnf' },
  { bug_id: 1007, title: 'bug report 7', priority: 0, status: 'new' },
];

@Component({
  selector: 'app-bug-report-list',
  templateUrl: './bug-report-list.component.html',
  styleUrls: ['./bug-report-list.component.css'],
})
export class BugReportListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  displayedColumns: string[] = [
    'bug_id',
    'title',
    'priority',
    'status',
    'action',
  ];
  dataSource = BUG_REPORT_DATA;
}
