import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { navigationTabs } from '../../constants/constants';
import { ToastsManager } from 'ng6-toastr';
import { HomePageService } from '../../services/home-page.service';
import { ToasterEnum } from '../../../../utilities/enums/toaster.enums';

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
