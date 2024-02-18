import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
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
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
