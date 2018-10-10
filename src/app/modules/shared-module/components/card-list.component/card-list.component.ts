import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { CardListModel, MoreDetailsClicked } from '../../models/CardListModel';
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
    @Output() moreDetails: EventEmitter<MoreDetailsClicked> = new EventEmitter<MoreDetailsClicked>();
    
    moreDetailsIcon = faChevronRight;

    constructor() {}

    ngOnInit(): void {}

    /**
     * more details button clicked callback
     * @method moreDetailsClicked
     * @param cardItem card item that has been clicked
     * @returns { void } nothing is returned
     */
    moreDetailsClicked(cardItem: CardListModel) {
        this.moreDetails.emit({id: cardItem.header.id});
    }
}