import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { StoreService } from './store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private store: StoreService
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: this.store.jwt || 'No tengo token'
      })
    });
    return next.handle(authReq)
      .pipe(
        catchError(x => this.handleAuthError(x))
      )
  }
  handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {

      return of(err.message);
    } else {
      return throwError(err);
    }
  }
}
