import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageChangeAction, PaginationConfigModel, PaginatorPosition } from '../../models/pagination-config.model';

@Component({
    selector: 'pagination',
    templateUrl: './pagination-component.html',
    styleUrls: [
        './pagination-component.css'
    ]
})

export class PaginationComponent {

    @Input() paginationConfig: PaginationConfigModel;
    @Output() pageChange: EventEmitter<PageChangeAction> = new EventEmitter<PageChangeAction>();

    page = 1;

    constructor() {}

    /**
     * sets pagination position if no position is provided then center position is applied
     * @method paginationPosition
     * @param none No param is required
     * @returns { string } class name is returned
     */
    paginationPosition(): string {
        return this.paginationConfig.position ? this.paginationConfig.position: PaginatorPosition.CENTER;
    }

    /**
     * page change callback
     * @method pageChanged
     * @param value emitted event state from page change
     * @returns { void } nothing is returned
     */
    pageChanged(value): void {
        const pageData: PageChangeAction = {
            prePage: this.page,
            pageSelected: value
        }
        this.pageChange.emit(pageData);
        this.page = value;
    }
}