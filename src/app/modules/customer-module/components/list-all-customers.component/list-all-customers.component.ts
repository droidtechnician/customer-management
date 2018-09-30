import { Component, OnInit } from '@angular/core';
import { ListAllCustomersService } from '../../services/list-all-customers.service';
import { ListAllModel } from '../../../shared-module/models/ListAll.Model';

import { faUser, faThLarge, faList } from '@fortawesome/free-solid-svg-icons';
import { CustomerConstants } from '../../constants/customers.constants';
import { TabItemModel } from '../../../plugins-module/models/TabItem';

@Component({
    selector: 'list-all-customers',
    templateUrl: './list-all-customers.component.html',
    styleUrls: [
        'list-all-customers.component.css'
    ],
    providers: [
        ListAllCustomersService
    ]
})

export class ListAllCustomersComponent implements OnInit{

    listAllConfig: ListAllModel;

    constructor(private listAllComponentService: ListAllCustomersService){}

    ngOnInit() {
        this.createConfig();
    }

    /**
     * creates configuration for the page to be displayed
     * @method createConfig
     * @param none
     * @returns { void }
     */
    createConfig(): void {
        this.listAllConfig = {
            header: 'Header',
            pagination: false,
            tabsList: [],
            headerLogo: faUser
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
        this.listAllConfig.header = CustomerConstants.header;
        this.listAllConfig.pagination = false;
    }

}