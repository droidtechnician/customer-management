import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { ToasterModel } from '../utilities/models/toast.model';
import swal, { SweetAlertResult } from 'sweetalert2'
import { SwalModel } from '../utilities/models/swal.model';

@Injectable()
export class GlobalService {

    private showToastr: Subject<ToasterModel> = new Subject();
    private showSpinner: Subject<boolean> = new Subject();

    /**
     * this method logs everything in browser console
     * @method logger
     * @param msg message that needs to be logged
     * @returns void
     */
    logger(msg: string|number): void {
        console.log(msg);
    }

    /**
     * getter for toaster model
     * @method getToast
     * @param none
     * @return { Subject<ToasterModel> } custom subject for toaster msgs
     */
    getToast(): Subject<ToasterModel> {
        return this.showToastr;
    }

    /**
     * getter for spinner
     * @method getSpinner
     * @returns { Subject<boolean> } custom subject for spinner
     */
    getSpinner(): Subject<boolean> {
        return this.showSpinner;
    }

    /**
     * shows toaster msg
     * @method showToasterMsg
     * @param toasterData
     * @returns { void }
     */
    showToasterMsg(toasterData: ToasterModel): void {
        this.showToastr.next(toasterData);
    }

    /**
     * change spinner status
     * @method changeSpinnerStatus
     * @param spinnerStatus boolean status of the spinner
     * @returns { void } nothing is returned
     */
    changeSpinnerStatus(spinnerStatus: boolean): void {
        this.showSpinner.next(spinnerStatus);
    }

    /**
     * shows sweet toast
     * @method showSweetToast
     * @param alertConfig contains configuration for the sweet alert
     * @returns { void } nothing is returned
     */
    showSweetToast(alertConfig: SwalModel): Promise<SweetAlertResult> {
        return swal(alertConfig);
    }
    
}