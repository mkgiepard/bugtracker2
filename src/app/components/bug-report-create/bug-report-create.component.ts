import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BugReport, Status } from 'src/app/dataModel/bug-report';

@Component({
  selector: 'app-bug-report-create',
  templateUrl: './bug-report-create.component.html',
  styleUrls: ['./bug-report-create.component.css'],
})
export class BugReportCreateComponent implements OnInit {
  bugReport: BugReport = {
    id: 1099,
    title: '',
    priority: 2,
    status: Status.New,
    description: '',
    author: '',
  };
  emptyBugReport: FormGroup = new FormGroup({
    title: new FormControl(),
    priority: new FormControl(),
    description: new FormControl(),
  });
  constructor() { }

  ngOnInit(): void { }

  onCreate(): void { }
}
