import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../constants/url.const';
import { SignUpModel, SignUpModelResp } from '../utilities/models/sign-up.model';
import { Observable } from 'rxjs';
import { UserDataModel } from '../utilities/models/user.model';

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
        return this.httpClient.post(url.login, signUpData);
    }


    /**
     * @method handleError
     * @param error
     * @returns { void }
     */
    handleError(error): void {
        return;
    }
}
