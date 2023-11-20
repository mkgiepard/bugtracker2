import { Component, Input } from '@angular/core';
import { BugReport } from 'src/app/dataModel/bug-report';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BugReportService } from 'src/app/services/bug-report.service';

@Component({
  selector: 'app-bug-report-actions',
  templateUrl: './bug-report-actions.component.html',
  styleUrls: ['./bug-report-actions.component.css'],
})
export class BugReportActionsComponent {
  @Input() bugReport!: BugReport;

  constructor(private bugReportService: BugReportService) {}

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
    this.bugReportService.deleteBugReport(bugReport.id).subscribe();
  }
}
