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
