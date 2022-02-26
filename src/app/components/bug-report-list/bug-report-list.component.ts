import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BugReport, Status, bugReportData } from 'src/app/dataModel/bug-report';
import { BugReportService } from 'src/app/services/bug-report.service';

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
    for (let bug of this.dataSource) {
      if (bug.id == id) {
        if (bug.priority == 0) return;
        bug.priority--;
      }
    }
  }

  downPriority(id: number) {
    for (let bug of this.dataSource) {
      if (bug.id == id) {
        if (bug.priority == 4) return;
        bug.priority++;
      }
    }
  }

  markAsFixed(id: number) {
    for (let bug of this.dataSource) {
      if (bug.id == id) {
        if (bug.status === Status.Fixed) return;
        bug.status = Status.Fixed;
      }
    }
  }
}
