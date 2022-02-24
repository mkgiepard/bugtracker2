import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BugReport, bugReportData } from '../dataModel/bug-report';

@Injectable({
  providedIn: 'root'
})
export class BugReportService {
  private bugReportUrl = 'api/bugReports';

  constructor(private http: HttpClient) { }

  getBugReports(): Observable<BugReport[]> {
    return this.http.get<BugReport[]>(this.bugReportUrl);
  }
}
