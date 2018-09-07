import { Component } from '@angular/core';

@Component({
    selector: 'list-items',
    templateUrl: './list-items.component.html',
    styleUrls: [
        './list-items.component.css'
    ]
})

// TODO: To be removed
export class ListItemsComponent {

    dummyItem: Array<String> = [];

    constructor() {
        this.dummyItem.length = 1000;
    }
}