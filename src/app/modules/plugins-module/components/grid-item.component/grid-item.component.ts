import { Component, Input } from '@angular/core';
import { GridItemModel, GridConfigModel, GridLabelModel } from '../../models/GridItemModel';
import { isEmpty } from '../../../../utilities/models/utilities-func';

@Component({
    selector: 'grid-item',
    templateUrl: './grid-item.component.html',
    styleUrls: [
        './grid-item.component.css'
    ]
})

export class GridItemComponent {

    gridData: Array<GridItemModel>  = [];

    @Input() set data (config: GridConfigModel) {
        if (!isEmpty(config)) this.createGridData(config);
    }

    /** 
     * creates grid data
     * @method createGridData
     * @param config contains the data set and labels for which the grid needs to be created
     * @returns { void } nothing is returned
     */
    createGridData(config: GridConfigModel): void {
        config.labels.forEach((label: GridLabelModel) => {
            const tempVal: string = `${label.id}`;
            if (tempVal in config.element) 
                this.gridData.push({label: label.labelName, value: config.element[tempVal]})
        });
    }

}