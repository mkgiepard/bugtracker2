import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService, JWT_ACCESS_NAME, JWT_REFRESH_NAME } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem(JWT_ACCESS_NAME);

    if (authToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken),
      });
      return next.handle(cloned).pipe(catchError(error => {
        console.log(error);
        if (
          error instanceof HttpErrorResponse &&
          !cloned.url.includes('auth/login') &&
          error.status === 401
        ) {
          return this.authService.refreshToken().pipe(
            switchMap((token: any) => {
              localStorage.setItem(JWT_ACCESS_NAME, token.accessToken);
              const retryReq = cloned.clone({
                headers: req.headers.set(
                  'Authorization',
                  'Bearer ' + token.accessToken
                ),
              });
              console.log(retryReq);
              return next.handle(retryReq).pipe(catchError(this.handleError));
            }), catchError(this.handleError)
          );
        }
        return throwError(() => error);
      }));
    } else {
      return next.handle(req).pipe(catchError(this.handleError));
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      window.location.href = '/login';
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('User is unauthorized (' + error.status + '), please login.')
    );
  }
}