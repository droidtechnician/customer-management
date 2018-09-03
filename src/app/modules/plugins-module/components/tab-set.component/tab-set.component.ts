import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TabItemModel } from '../../models/TabItem';

@Component({
    selector: 'tabset-component',
    templateUrl: './tab-set.component.html',
    styleUrls: [
        './tab-set.component.css'
    ]
})

export class TabSetComponent {

    @Input() tabsList: TabItemModel[];
    @Output() tabItemClicked: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    
}