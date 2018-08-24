import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { url } from '../constants/url.const';
import { SignUpModel, SignUpModelResp } from '../utilities/models/sign-up.model';
import { Observable, throwError } from 'rxjs';
import { UserDataModel } from '../utilities/models/user.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoginService {

    constructor(private httpClient: HttpClient) {}

    /**
     * SignUp User
     * @method signUpUser
     * @param none
     * @returns void
     */
    signUpUser(data: UserDataModel): Observable<any> {
        return this.httpClient.post(url.signup, data);
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
     * @method handleError
     * @param error
     * @returns { Observable<any> }
     */
    handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error instanceof ErrorEvent) {
            console.log('Client Side Error');
        } else {
            console.error(
                `errorCode: ${error.status}` +
                `errorBode: ${error.error}`
            );
        }
        return throwError(
            'There seems to be some error please try again later.'
        );
    }
}
