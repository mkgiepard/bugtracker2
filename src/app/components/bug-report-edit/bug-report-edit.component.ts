import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BugReport } from 'src/app/dataModel/bug-report';

const BUG_REPORT_DATA: BugReport = {
  bug_id: 1001,
  title: 'bug report 1',
  priority: 2,
  status: 'new',
};

@Component({
  selector: 'app-bug-report-edit',
  templateUrl: './bug-report-edit.component.html',
  styleUrls: ['./bug-report-edit.component.css'],
})
export class BugReportEditComponent implements OnInit {
  bugReport = BUG_REPORT_DATA;
  bugReportForm: FormGroup = new FormGroup({
    title: new FormControl(this.bugReport.title),
    priority: new FormControl('p' + this.bugReport.priority),
    description: new FormControl('lorem epsum....'),
  });
  constructor() {}

  ngOnInit(): void {}

  onSave(): void {}

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
