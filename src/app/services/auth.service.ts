import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../dataModel/user';

export const JWT_ACCESS_NAME = 'bugtracker-access-token';
export const JWT_REFRESH_NAME = 'bugtracker-refresh-token';
export const USERNAME = 'bugtracker-username';

export interface AuthResponse {
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isUserLoggedIn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private authURL = '/auth/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  login(user: User): Observable<AuthResponse> {
    console.log(user);
    return this.http
      .post<any>(
        this.authURL + 'login',
        { username: user.username, password: user.password },
        this.httpOptions
      )
      .pipe(
        map((token) => {
          localStorage.setItem(JWT_ACCESS_NAME, token.accessToken);
          localStorage.setItem(JWT_REFRESH_NAME, token.refreshToken);
          localStorage.setItem(USERNAME, user.username);
          this.isUserLoggedIn.next(true);
          return token;
        })
      );
  }

  register(user: User): Observable<User> {
    return this.http
      .post<User>(this.authURL + 'register', user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  logout(): Observable<AuthResponse> {
    localStorage.removeItem(JWT_ACCESS_NAME);
    localStorage.removeItem(JWT_REFRESH_NAME);
    localStorage.removeItem(USERNAME);
    localStorage.clear();
    this.isUserLoggedIn.next(false);
    // window.location.href = '/login';
    return this.http.delete<any>(this.authURL + 'logout', this.httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
