import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private router:Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
        } else {
          if (error.status === 403) { 
            this.router.navigate( ["/error"] );
          }
          if (error.status === 500) { 
            this.router.navigate( ["/error"] );
          }
        }
        return throwError(error);
      })
      );
    }
  }