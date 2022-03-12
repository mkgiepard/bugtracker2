import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { BugReport, bugReportData } from '../dataModel/bug-report';

@Injectable({
  providedIn: 'root'
})
export class BugReportService {
  private bugReportUrl = 'api/bugReports';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getBugReports(): Observable<BugReport[]> {
    return this.http.get<BugReport[]>(this.bugReportUrl)
      .pipe(
        catchError(this.handleError<BugReport[]>('getBugReports', []))
      );
  }

  getBugReport(id: number): Observable<BugReport> {
    const url = `${this.bugReportUrl}/${id}`;
    return this.http.get<BugReport>(url).pipe(
      //tap(_ => this.log(`fetched bugReport id=${id}`)),
      catchError(this.handleError<BugReport>(`bugReport id=${id}`))
    );
  }

  /** POST: add a new bugReport to the server */
  addBugReport(bugReport: BugReport): Observable<BugReport> {
    return this.http.post<BugReport>(this.bugReportUrl, bugReport, this.httpOptions).pipe(
      //tap((newBugReport: BugReport) => this.log(`added hero w/ id=${bugReport.id}`)),
      catchError(this.handleError<BugReport>('addBugReport'))
    );
  }

  /** PUT: update the bugReport on the server */
  updateBugReport(bugReport: BugReport): Observable<any> {
    return this.http.put(this.bugReportUrl, bugReport, this.httpOptions).pipe(
      //tap(_ => this.log(`updated bugReport id=${bugReport.id}`)),
      catchError(this.handleError<any>('updateBugReport'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteBugReport(id: number): Observable<BugReport> {
    const url = `${this.bugReportUrl}/${id}`;

    return this.http.delete<BugReport>(url, this.httpOptions).pipe(
      //tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<BugReport>('deleteBugReport'))
    );
  }

  upPriority(bugReport: BugReport): Observable<any> {
    if (bugReport.priority != 0) {
      bugReport.priority--;
    }
    return this.updateBugReport(bugReport);
  }

  downPriority(bugReport: BugReport): Observable<any> {
    if (bugReport.priority != 4) {
      bugReport.priority++;
    }
    return this.updateBugReport(bugReport);
  }

  /* GET bugReports whose title contains search term */
  searchBugReports(term: string): Observable<BugReport[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<BugReport[]>(`${this.bugReportUrl}/?title=${term}`).pipe(
      //tap(x => x.length ?
      //this.log(`found heroes matching "${term}"`) :
      //this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<BugReport[]>('searchBugReport', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
