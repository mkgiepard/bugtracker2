import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError, first, take, map, tap } from 'rxjs';

import { User } from '../dataModel/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: User | undefined;
  private userUrl = 'api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.userUrl)
      .pipe(catchError(this.handleError<User[]>('getUsers', [])));
  }

  getUser(username: string): Observable<User> {
    if (this.currentUser && this.currentUser.username === username) {
      return of(this.currentUser);
    }
    const url = `${this.userUrl}?username=${username}`;

    return this.http.get<User[]>(url).pipe(
      map((arr) => arr[0]),
      tap((user) => (this.currentUser = user)),
      catchError(this.handleError<User>('getUser username=${username}'))
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
