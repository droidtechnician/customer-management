import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Order, OrderRequest } from '../../models/order.model';
import { ListOrdersService } from '../../services/list-orders.service';

import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { PaginationConfigModel, PageChangeAction } from '../../../plugins-module/models/pagination-config.model';
import { OrderConstants } from '../../constants/constants';

import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'list-card',
    templateUrl: './list-card-view.component.html',
    styleUrls: [
        'list-card-view.component.css'
    ]
})

export class ListCardViewComponent implements OnInit, OnDestroy{

    ordersData: Array<Order> = [];
    ordersList: Array<Order> = [];

    editIcon = faEdit;
    viewIcon = faEye;

    descLabels = OrderConstants.descCols;


    paginationConfig: PaginationConfigModel = {
        collectionSize: 0,
        boundryLinks: OrderConstants.boundryLinks,
        directionLinks: OrderConstants.directionLinks,
        disabled: OrderConstants.disabled,
        page: OrderConstants.page,
        pageSize: OrderConstants.pageSize,
        data: this.ordersData
    }

    unsubAllObservers: Subject<any> = new Subject<any>();

    constructor(private listService: ListOrdersService) {}
    
    ngOnInit(): void {
        this.getAllOrders();
    }

    ngOnDestroy(): void {
        this.unsubAllObservers.next();
        this.unsubAllObservers.unsubscribe();
    }

    /** 
     * gets all the orders
     * @method getAllOrders
     * @param none No params required
     * @returns { void }
     */
    getAllOrders(): void {
        this.listService.getAllOrders()
        .pipe(
            takeUntil(this.unsubAllObservers)
        )
        .subscribe((res: OrderRequest) => {
            if (res.resStatus) {
                this.ordersData = res.data;
                this.paginationConfig.collectionSize = this.ordersData.length;
                this.pageSelected({prePage: 0, pageSelected: 1});
            }
            // TODO: ResStatus false handling
        }, (error) => {
            // TODO: Error handling
        });
    }

    /**
     * page which has been selected
     * @method pageSelected
     * @param value value of the pageSelected and prevPage
     */
    pageSelected(value: PageChangeAction): void {
        this.ordersList = 
        this.spliceOrdersData(((value.pageSelected - 1) * this.paginationConfig.pageSize), 
        this.paginationConfig.pageSize, this.ordersData);;
    }

    /**
     * splicing an array
     * @method spliceOrdersData
     * @param startPoint starting point from data should start
     * @param noOfElements elements in the array
     * @param data which needs to be modified
     * @returns { data } which is the new orders list
     */
    spliceOrdersData(startPoint: number, noOfElements: number, data) {
        const tempData: Array<any> = JSON.parse(JSON.stringify(data));
        return tempData.splice(startPoint, noOfElements);
    }
}