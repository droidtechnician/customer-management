import { Component, OnInit } from '@angular/core';
import { TabItemModel } from '../../../plugins-module/models/TabItem';

import { faList, faThLarge, faBox } from '@fortawesome/free-solid-svg-icons';
import { ListAllModel } from '../../../shared-module/models/ListAll.Model';

@Component({
    selector: 'list-all-orders',
    templateUrl: './list-all-orders.component.html',
    styleUrls: [
        'list-all-orders.component.css'
    ]
})

export class ListAllOrdersComponent implements OnInit {

    listAllConfig: ListAllModel;

    constructor() {}

    ngOnInit() {
        this.createConfig();
    }

    createConfig() {
        this.listAllConfig = {
            header: 'Header',
            pagination: false,
            tabsList: [],
            headerLogo: faBox
        }
        this.createTabs();
        this.createHeader();
    }

    /**
     * create tabs for navigation
     * @method createTabs
     * @param none
     * @return { void }
     */
    createTabs(): void  {
        const cardView: TabItemModel = {
            tabName: 'Card View',
            navigateTo: 'cardView',
            tabIcon: faThLarge,
            enable: true
        }

        const listView: TabItemModel = {
            tabName: 'List View',
            navigateTo: 'gridView',
            tabIcon: faList,
            enable: true
        }

        this.listAllConfig.tabsList.push(cardView);
        this.listAllConfig.tabsList.push(listView);
    }

    /**
     * Creates header
     * @method createHeader
     * @param none
     * @returns { void }
     */
    createHeader(): void {
        this.listAllConfig.header = 'Orders';
        this.listAllConfig.pagination = false;
    }

}