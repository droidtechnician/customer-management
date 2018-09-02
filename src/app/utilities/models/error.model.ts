import { HttpErrorResponse } from "@angular/common/http";
import { ErrorConst } from "../../constants/error.const";

export class ErrorModel {

    constructor(private error: HttpErrorResponse) {}

    getErrorCode(): ErrorWrapper {
        if (this.error.status === 400) return this.error.error;
        return ErrorConst[`${this.error.status}`]
    }

}

export interface ErrorWrapper {
    name: string;
    errorMsg: string
}