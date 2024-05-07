import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BugReport } from 'src/app/dataModel/bug-report';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BugReportService } from 'src/app/services/bug-report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bug-report-actions',
  templateUrl: './bug-report-actions.component.html',
  styleUrls: ['./bug-report-actions.component.scss'],
})
export class BugReportActionsComponent {
  @Input() bugReport!: BugReport;
  @Output() refreshData: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private bugReportService: BugReportService
  ) {}

  markAsFixed(bugReport: BugReport) {
    if (bugReport == undefined) return;
    this.bugReportService.markAsFixed(bugReport).subscribe();
  }

  markAsWnf(bugReport: BugReport) {
    if (bugReport == undefined) return;
    this.bugReportService.markAsWnf(bugReport).subscribe();
  }

  upPriority(bugReport: BugReport) {
    if (bugReport == undefined) return;
    this.bugReportService.upPriority(bugReport).subscribe();
  }

  downPriority(bugReport: BugReport) {
    if (bugReport == undefined) return;
    this.bugReportService.downPriority(bugReport).subscribe();
  }

  delete(bugReport: BugReport) {
    if (bugReport == undefined) return;
    if (
      window.confirm(
        'Are you sure you want to delete: "' + bugReport.title + '"?'
      )
    ) {
      this.bugReportService.deleteBugReport(bugReport.id).subscribe(() => {
        this.refreshData.emit(null);
      });
    }
  }
}
