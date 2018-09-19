import { Component, Input, OnInit } from '@angular/core';
import { GridCols } from '../../models/GridList.Model';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { SortOrder } from '../../constants/grid.constants';

import * as _ from 'lodash';

@Component({
    selector: 'grid-list',
    templateUrl: './grid-list.component.html',
    styleUrls: [
        './grid-list.component.scss'
    ]
})

export class GridListComponent implements OnInit{

    @Input() cols: GridCols[];
    @Input() data: Array<any>;
    @Input() multiSortMetaConfig: Array<any>;

    multiSortMeta = {};

    downIcons = faAngleDown;
    upIcons = faAngleUp;

    constructor() {}

    

    ngOnInit(): void {
      this.createMultiSort(this.multiSortMetaConfig);
    }

    /**
     * creates multiSort meta data
     * @method createMultiSort
     * @param {value} custom multi sort config
     */
    createMultiSort(value) {

        if (value) {
            for (let item of value) {
                this.multiSortMeta[`${item.field}`] = item.order;
            }
        } else {
            for (let item of this.cols) {
                this.multiSortMeta[`${item.field}`] = -1;
            }
        }
    }

    gridHeaderClicked(column: GridCols) {
        if (this.multiSortMeta[column.field] === SortOrder.ASC) {
            this.data = _.reverse(_.sortBy(this.data, item => item[column.field]));
            this.multiSortMeta[column.field] = SortOrder.DSC;
        } else if (this.multiSortMeta[column.field] === SortOrder.DSC) {
            this.data = _.sortBy(this.data, item => item[column.field]);
            this.multiSortMeta[column.field] = SortOrder.ASC;
        }
    }
}