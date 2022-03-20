import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BugReport, Status, bugReportData } from 'src/app/dataModel/bug-report';
import { BugReportService } from 'src/app/services/bug-report.service';
import { BugReportSearchComponent } from '../bug-report-search/bug-report-search.component';

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
  dataSource: BugReport[] = [];

  constructor(private bugReportService: BugReportService) { }

  ngOnInit(): void {
    this.getBugReports();
  }

  getBugReports() {
    this.bugReportService.getBugReports()
      .subscribe(bugReports => this.dataSource = bugReports);
  }

  upPriority(id: number) {
    let bug = this.dataSource.find(b => b.id === id);
    if (bug == undefined) return;
    this.bugReportService.upPriority(bug).subscribe();
  }

  downPriority(id: number) {
    let bug = this.dataSource.find(b => b.id === id);
    if (bug == undefined) return;
    this.bugReportService.downPriority(bug).subscribe();
  }

  markAsFixed(id: number) {
    let bug = this.dataSource.find(b => b.id === id);
    if (bug == undefined) return;
    this.bugReportService.markAsFixed(bug).subscribe();
  }

  markAsWnf(id: number) {
    let bug = this.dataSource.find(b => b.id === id);
    if (bug == undefined) return;
    this.bugReportService.markAsWnf(bug).subscribe();
  }

  delete(bugReport: BugReport): void {
    this.dataSource = this.dataSource.filter(b => b !== bugReport);
    this.bugReportService.deleteBugReport(bugReport.id).subscribe();
  }
}
