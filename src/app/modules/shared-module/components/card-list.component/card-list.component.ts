import { Component, OnInit, Input } from '@angular/core';
import { CardListModel } from '../../models/CardListModel';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'card-list',
    templateUrl: './card-list.component.html',
    styleUrls: [
        './card-list.component.css'
    ]
})

export class CardListComponent implements OnInit{


    @Input() listData: Array<CardListModel> = [];
    
    moreDetailsIcon = faChevronRight;

    constructor() {}

    ngOnInit(): void {}
}