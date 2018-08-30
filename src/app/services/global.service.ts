import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { ToasterModel } from '../utilities/models/toast.model';

@Injectable()
export class GlobalService {

    private showToastr: Subject<ToasterModel> = new Subject();

    constructor() {}

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
     * shows toaster msg
     * @method showToasterMsg
     * @param toasterData
     * @returns { void }
     */
    showToasterMsg(toasterData: ToasterModel): void {
        this.showToastr.next(toasterData);
    }
    
}