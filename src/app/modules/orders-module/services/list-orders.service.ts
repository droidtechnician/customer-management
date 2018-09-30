import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { url } from '../../../constants/url.const';
import { Order, OrderRequest } from '../models/order.model';
import { Observable, throwError } from 'rxjs';
import {catchError }  from 'rxjs/operators';
import { ErrorModel } from '../../../utilities/models/error.model';

@Injectable()
export class ListOrdersService {

    constructor(private http: HttpClient) {}

    /**
     * gets list of all the orders
     * @method getAllOrders
     * @returns { Observable<OrderRequest> }
     */
    getAllOrders(): Observable<OrderRequest> {
        return this.http.get<OrderRequest>(url.getAllOrders)
            .pipe(catchError(this.handleError));
    }

    /**
     * this method catches all api errors and takes required action
     * @method handleError
     * @param error Http exception error
     * @returns { Observable<any> }
     */
    handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error instanceof ErrorEvent)
            return throwError(
                {
                    name: 'ClientError',
                    errorMsg: 'There seems to be some issue at the client side'
                }
            );
        const errorObj = new ErrorModel(error.error[0]);
            return throwError(
                errorObj
            );
    }

}