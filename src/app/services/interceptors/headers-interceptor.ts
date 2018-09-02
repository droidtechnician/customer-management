import { Injectable } from '@angular/core';
import { HttpEvent, 
        HttpHandler, 
        HttpRequest,
        HttpInterceptor 
    } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        httpRequest = httpRequest.clone(
            {
                setHeaders: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
        return next.handle(httpRequest);
    }
}