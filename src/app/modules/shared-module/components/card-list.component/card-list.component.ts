import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'card-list',
    templateUrl: './card-list.component.html',
    styleUrls: [
        './card-list.component.css'
    ]
})

export class CardListComponent implements OnInit{


    list: Array<string> = [];

    constructor() {}

    ngOnInit(): void {
        this.list.length = 10;
    }
}