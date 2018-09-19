import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { GridCols } from '../../../shared-module/models/GridList.Model';
import { Order, OrderRequest } from '../../models/order.model';
import { ListOrdersService } from '../../services/list-orders.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'list-grid',
    templateUrl: './list-grid-view.component.html',
    styleUrls: [
        './list-grid-view.component.css'
    ]
})

export class ListGridViewComponent implements OnInit, OnDestroy{

    cols: GridCols[] = [
        {header: 'Order No', field: 'orderNo'},
        {header: 'Ordered By', field: 'custName'},
        {header: 'Items Count', field: 'itemCount'},
        {header: 'Total cost (in dollars)', field: 'totalAmount'},
    ]

    @Input() data: Array<Order> = [];

    unsubAllService: Subject<boolean> = new Subject<boolean>();

    constructor(private listOrdersService: ListOrdersService) {}

    ngOnInit(): void {
        this.getOrdersData();
    }

    ngOnDestroy(): void {
        this.unsubAllService.next(true);
        this.unsubAllService.complete();
    }

    /**
     * get all orders
     * @method getAllOrders
     * @param none is rquired
     * @returns { void }
     */
    getOrdersData(): void {
        this.listOrdersService.getAllOrders()
        .pipe(takeUntil(this.unsubAllService))
        .subscribe((res: OrderRequest) => {
            if (res.resStatus) {
                this.data = res.data;
            } else {
                // TODO: Need to handle empty orders 
            }
        }, error => {
            // TODO: Need to handle error 
        } )
    }
}