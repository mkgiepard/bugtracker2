import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { BugReport, bugReportData } from '../dataModel/bug-report';
import { User, userData } from '../dataModel/user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const bugReports = bugReportData;
    return { bugReports };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the bugReports array is empty,
  // the method below returns the initial number (1001).
  // if the bugReports array is not empty, the method below returns the highest
  // bugReport id + 1.
  genId(bugReports: BugReport[]): number {
    return bugReports.length > 0
      ? Math.max(...bugReports.map((bugReport) => bugReport.id)) + 1
      : 1001;
  }
}
