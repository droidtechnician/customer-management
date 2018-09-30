import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { navigationTabs } from '../../constants/constants';
import { HomePageService } from '../../services/home-page.service';
import { AppConstants } from '../../../../constants/constants';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'home-page',
    templateUrl: 'home-page.component.html',
    styleUrls: [
        'home-page.component.css'
    ],
    providers: [
        HomePageService
    ]
})

export class HomePageComponent implements OnInit {

    /*Icons*/
    signOut = faSignOutAlt;
    homeNavigationTabs = navigationTabs;


    constructor(private homeService: HomePageService) {}

    ngOnInit() {}
}
