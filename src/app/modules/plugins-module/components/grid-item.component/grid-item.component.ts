import { Component, Input } from '@angular/core';
import { GridItemModel } from '../../models/GridItemModel';

@Component({
    selector: 'grid-item',
    templateUrl: './grid-item.component.html',
    styleUrls: [
        './grid-item.component.css'
    ]
})

export class GridItemComponent {

    @Input() gridData: GridItemModel[];

    constructor() {}


}