import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken = localStorage.getItem('jwt');
    const adminToken = localStorage.getItem('adJwt');

    if (userToken) {
      request = this.addToken(request, userToken, "user");
    } else if (adminToken) {
      request = this.addToken(request, adminToken, "admin");
    }

    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>, token: string , role:string): HttpRequest<unknown> {
    
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token} ${role}`
      }
    });
  }
}
