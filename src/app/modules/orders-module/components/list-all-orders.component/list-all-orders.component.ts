import { Component, OnInit } from '@angular/core';
import { TabItemModel } from '../../../plugins-module/models/TabItem';

import { faList, faThLarge } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'list-all-orders',
    templateUrl: './list-all-orders.component.html',
    styleUrls: [
        'list-all-orders.component.css'
    ]
})

export class ListAllOrdersComponent implements OnInit {

    tabsList: TabItemModel[] = [];

    constructor() {}

    ngOnInit() {
        this.createTabs();
    }

    /**
     * create tabs for navigation
     * @method createTabs
     * @param none
     * @return { void }
     */
    createTabs(): void  {
        const carView: TabItemModel = {
            tabName: 'Card View',
            navigateTo: '#',
            tabIcon: faThLarge,
            enable: true
        }

        const listView: TabItemModel = {
            tabName: 'List View',
            navigateTo: '#',
            tabIcon: faList,
            enable: true
        }

        this.tabsList.push(carView);
        this.tabsList.push(listView);
    }

}