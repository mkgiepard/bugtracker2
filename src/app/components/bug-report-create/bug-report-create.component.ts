import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bug-report-create',
  templateUrl: './bug-report-create.component.html',
  styleUrls: ['./bug-report-create.component.css'],
})
export class BugReportCreateComponent implements OnInit {
  emptyBugReport: FormGroup;
  constructor(fb: FormBuilder) {
    this.emptyBugReport = fb.group({});
  }

  ngOnInit(): void {}
}
