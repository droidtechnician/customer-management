import { Injectable } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { ToasterModel } from '../../../utilities/models/toast.model';

@Injectable()
export class HomePageService {

    constructor( private globalService: GlobalService) {}

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