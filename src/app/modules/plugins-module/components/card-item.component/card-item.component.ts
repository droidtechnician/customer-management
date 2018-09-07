import { Component } from '@angular/core';

import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'card-item',
    templateUrl: './card-item.component.html',
    styleUrls: [
        './card-item.component.css'
    ]
})

export class CardItemComponent {

    personIcon =  faUser;

    constructor() {}

    
}