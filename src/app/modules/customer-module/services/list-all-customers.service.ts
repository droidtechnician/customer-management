import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { GlobalService } from '../../../services/global.service';
import { ToasterModel } from '../../../utilities/models/toast.model';
import { Observable, throwError } from 'rxjs';
import { CustomerListRequest, CustomerItem } from '../models/customer-request';
import { url } from '../../../constants/url.const';
import { catchError } from 'rxjs/operators';
import { ErrorModel } from '../../../utilities/models/error.model';
import { CustomerModel } from '../models/customer.model';

@Injectable()
export class ListAllCustomersService {

    constructor(private globalService: GlobalService,
        private http: HttpClient) {}

    /** 
     * gets list of all customers
     * @method getAllCustomers
     * @returns {Observable<CustomerListRequest>}
     */
    getAllCustomers(): Observable<CustomerListRequest> {
        return this.http.get(url.getAllCustomers)
            .pipe(catchError(this.handleError))

    }

    /** 
     * get specific customer details
     * @method getCustomerDetails
     * @param customerId unique identifier for the customer
     * @returns {Observable<CustomerModel>}
     */
    getCustomerDetails(customerId: number| string): Observable<CustomerItem> {
        return this.http.get(`${url.getAllCustomers}/${customerId}`)
            .pipe(catchError(this.handleError));
    }

    /**
     * Show and hide toast injected on parent component
     * @method showToast
     * @param toasterData
     * @return void
     */
    showToast(toasterData: ToasterModel): void {
        this.globalService.showToasterMsg(toasterData);
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

    /**
     * gets order details specific to the customer
     * @method getCustomerOrderDetails
     * @param ordersList array of customers orders
     * @returns { void } nothing is returned
     */
    getCustomerOrderDetails(ordersList: Array<number>): void {
        
    }
}