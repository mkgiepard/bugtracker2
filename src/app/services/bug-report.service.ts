import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BugReport, bugReportData } from '../dataModel/bug-report';

@Injectable({
  providedIn: 'root'
})
export class BugReportService {

  constructor() { }

  getBugReports(): Observable<BugReport[]> {
    const bugReports = of(bugReportData);
    return bugReports;
  }
}
