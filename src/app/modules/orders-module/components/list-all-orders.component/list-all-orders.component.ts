import { Component, OnInit } from '@angular/core';
import { TabItemModel } from '../../../plugins-module/models/TabItem';

import { faList, faThLarge, faBox } from '@fortawesome/free-solid-svg-icons';
import { ListAllModel } from '../../../shared-module/models/ListAll.Model';
import { ListOrdersService } from '../../services/list-orders.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Order, OrderRequest } from '../../models/order.model';

@Component({
    selector: 'list-all-orders',
    templateUrl: './list-all-orders.component.html',
    styleUrls: [
        'list-all-orders.component.css'
    ],
    providers: [
        ListOrdersService
    ]
})

export class ListAllOrdersComponent implements OnInit {

    listAllConfig: ListAllModel;

    orderData: Array<Order> = [];

    // any type has been used as this is subject to unsubscibe 
    // to all services and has no specific type
    unsubAllServices: Subject<any> = new Subject<any>();

    constructor(private orderService: ListOrdersService) {}

    ngOnInit() {
        this.createConfig();
    }

    /**
     * gets list of all the orders
     * @method getAllOrders
     * @param none
     * @returns { void }
     */
    getAllOrders(): void {
        this.orderService.getAllOrders()
            .pipe(
                takeUntil(this.unsubAllServices)
            )
            .subscribe((res: OrderRequest) => {
                if (res.resStatus) {
                    this.orderData = res.data;
                } else {
                    // TODO: Create no order found handling
                }
            }, error => {
                //  TODO: Handle error in api
            })
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
        // TODO: will remove in future if no alternate found
        // const cardView: TabItemModel = {
        //     tabName: 'Card View',
        //     navigateTo: 'cardView',
        //     tabIcon: faThLarge,
        //     enable: true
        // }

        const listView: TabItemModel = {
            tabName: 'List View',
            navigateTo: 'gridView',
            tabIcon: faList,
            enable: true
        }

        // this.listAllConfig.tabsList.push(cardView);
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