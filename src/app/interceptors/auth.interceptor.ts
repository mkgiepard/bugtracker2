import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { JWT_ACCESS_NAME, JWT_REFRESH_NAME } from '../services/auth.service';

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem(JWT_ACCESS_NAME);
    if (authToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken),
      });
      return next.handle(cloned).pipe(catchError(this.handleError));
    } else {
      return next.handle(req);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      window.location.href = '/login';
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('User is unauthorized (401), please login.')
    );
  }
}
