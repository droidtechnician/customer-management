import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { url } from '../constants/url.const';
import { SignUpModel, SignUpModelResp } from '../utilities/models/sign-up.model';
import { Observable, throwError } from 'rxjs';
import { UserDataModel } from '../utilities/models/user.model';
import { catchError, map } from 'rxjs/operators';
import { ErrorModel } from '../utilities/models/error.model';
import { GlobalService } from './global.service';
import { ToasterModel } from '../utilities/models/toast.model';

@Injectable()
export class LoginService {

    constructor(private httpClient: HttpClient, private globalService: GlobalService) {}

    /**
     * SignUp User
     * @method signUpUser
     * @param none
     * @returns void
     */
    signUpUser(data: UserDataModel): Observable<SignUpModelResp> {
        return this.httpClient.post<SignUpModelResp>(url.signup, data)
            .pipe(catchError(this.handleError));
    }

    /**
     * Login User
     * @method loginUser
     * @param signUpData data containing emailID and password
     * @returns {Observable<SignUpModelResp>}
     */
    loginUser(signUpData: SignUpModel): Observable<any> {
        return this.httpClient.post(url.login, signUpData)
            .pipe(catchError(this.handleError));
    }

    /**
     * Register User
     * @method registerUser
     * @param userStatus set user status true/false
     * @returns void
     */
    registerUser(userStatus: boolean) {
        sessionStorage.setItem('userStatus', `${userStatus}`);
    }


    /**
     * @method handleError
     * @param error
     * @returns { Observable<any> }
     */
    handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error instanceof ErrorEvent) {
            return throwError(
                {
                    name: 'ClientError',
                    errorMsg: 'There seems to be some issue at the client side'
                }
            )
        }
        const errorObj = new ErrorModel(error.error[0]);
            return throwError(
                errorObj
            );
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
}
