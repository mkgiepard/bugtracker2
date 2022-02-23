import { Injectable } from '@angular/core';
import { bugReportData } from '../dataModel/bug-report';

@Injectable({
  providedIn: 'root'
})
export class BugReportService {

  constructor() { }

  getBugReports() {
    return bugReportData;
  }
}
