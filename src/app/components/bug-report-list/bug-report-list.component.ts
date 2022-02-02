import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BugReport, bugReportData } from 'src/app/dataModel/bug-report';

@Component({
  selector: 'app-bug-report-list',
  templateUrl: './bug-report-list.component.html',
  styleUrls: ['./bug-report-list.component.css'],
})
export class BugReportListComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  displayedColumns: string[] = [
    'bugId',
    'title',
    'priority',
    'status',
    'author',
    'action',
  ];
  dataSource = bugReportData;
}
