import { Component, OnInit } from '@angular/core';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { navigationTabs } from '../../constants/constants';

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


    constructor() {}

    ngOnInit() {
        for (let i = 0; i < 100; i++) {
            this.mockData.push('SampleName');
        }
    }

    tabClicked(tab) {
        this.defaultTab = tab.tabName;
    }
}
