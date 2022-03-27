import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BugReport, Status, bugReportData } from 'src/app/dataModel/bug-report';
import { BugReportService } from 'src/app/services/bug-report.service';
import { BugReportSearchComponent } from '../bug-report-search/bug-report-search.component';
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

  constructor(private bugReportService: BugReportService) { }

  ngOnInit(): void {
    this.getBugReports();
  }

  getBugReports() {
    this.bugReportService.getBugReports()
      .subscribe(bugReports => this.dataSource = new MatTableDataSource(bugReports));
  }

  applyFilter(event: Event) {
    if (this.dataSource == undefined) return;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  upPriority(id: number) {
    if (this.dataSource == undefined) return;
    let bug = this.dataSource.data.find(b => b.id === id);
    if (bug == undefined) return;
    this.bugReportService.upPriority(bug).subscribe();
  }

  downPriority(id: number) {
    if (this.dataSource == undefined) return;
    let bug = this.dataSource.data.find(b => b.id === id);
    if (bug == undefined) return;
    this.bugReportService.downPriority(bug).subscribe();
  }

  markAsFixed(id: number) {
    if (this.dataSource == undefined) return;
    let bug = this.dataSource.data.find(b => b.id === id);
    if (bug == undefined) return;
    this.bugReportService.markAsFixed(bug).subscribe();
  }

  markAsWnf(id: number) {
    if (this.dataSource == undefined) return;
    let bug = this.dataSource.data.find(b => b.id === id);
    if (bug == undefined) return;
    this.bugReportService.markAsWnf(bug).subscribe();
  }

  delete(bugReport: BugReport): void {
    if (this.dataSource == undefined) return;
    this.dataSource.data = this.dataSource.data.filter(b => b !== bugReport);
    this.bugReportService.deleteBugReport(bugReport.id).subscribe();
  }
}
