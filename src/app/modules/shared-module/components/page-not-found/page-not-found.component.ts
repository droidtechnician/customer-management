import { Component } from '@angular/core';

import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: [
        './page-not-found.component.css'
    ]
})

export class PageNotFoundComponent {

    // ICONS
    homeIcon = faHome;

    constructor() {}


}