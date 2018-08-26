import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { navigationTabs } from '../../constants/constants';
import { ToastsManager } from 'ng6-toastr';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'home-page',
    templateUrl: 'home-page.component.html',
    styleUrls: [
        'home-page.component.css'
    ]
})

export class HomePageComponent implements OnInit {

    mockData: Array<string> = [];

    /*Icons*/
    signOut = faSignOutAlt;

    homeNavigationTabs = navigationTabs;
    defaultTab = navigationTabs[0].tabName;


    constructor(private toastManager: ToastsManager, vcr: ViewContainerRef) {
        toastManager.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        for (let i = 0; i < 100; i++) {
            this.mockData.push('SampleName');
        }
    }

    // TODO: Will be removed in future implementation
    tabClicked(tab) {
        this.defaultTab = tab.tabName;
    }

    // TODO: Will be removed in future implementation
    itemClicked() {
        this.toastManager.info('Item Clicked!!');
    }
}
