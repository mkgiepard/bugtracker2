import { Component, OnInit } from '@angular/core';
import { BugReport } from 'src/app/dataModel/bug-report';
import { BugReportService } from 'src/app/services/bug-report.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bug-report-list',
  templateUrl: './bug-report-list.component.html',
  styleUrls: ['./bug-report-list.component.css'],
})
export class BugReportListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'priority',
    'status',
    'author',
    'action',
  ];
  // dataSource: BugReport[] = [];
  dataSource: MatTableDataSource<BugReport> | undefined;

  constructor(private bugReportService: BugReportService) {}

  ngOnInit(): void {
    this.getBugReports();
  }

  getBugReports() {
    this.bugReportService
      .getBugReports()
      .subscribe(
        (bugReports) => (this.dataSource = new MatTableDataSource(bugReports))
      );
  }

  applyFilter(event: Event) {
    if (this.dataSource == undefined) return;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refreshData(event: Event) {
    this.getBugReports();
  }
}
