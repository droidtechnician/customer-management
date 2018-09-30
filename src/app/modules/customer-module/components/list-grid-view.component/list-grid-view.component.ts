import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridCols } from '../../../shared-module/models/GridList.Model';
import { CustomerModel } from '../../models/customer.model';
import { Subject } from 'rxjs/Subject';
import { ListAllCustomersService } from '../../services/list-all-customers.service';
import { CustomerListRequest } from '../../models/customer-request';

@Component({
    selector: 'list-grid-customers',
    templateUrl: './list-grid-view.component.html',
    styleUrls: [
        'list-grid-view.component.css'
    ]
})

export class ListGridCustomersComponent implements OnInit, OnDestroy {

    cols: Array<GridCols> = [
        {header: 'First Name', field: 'first_name'},
        {header: 'Last Name', field: 'last_name'},
        {header: 'Email ID', field: 'email'},
        {header: 'Street Address', field: 'streetAddress'},
        {header: 'City', field: 'city'},
        {header: 'State', field: 'state'},
        {header: 'Orders', field: 'orders'}
    ];

    data: Array<CustomerModel> = [];

    unSubAllService: Subject<boolean> = new Subject<boolean>();

    constructor(private listAllCustomers: ListAllCustomersService) {}

    ngOnInit(): void {
        this.getAllCustomers();
    }

    ngOnDestroy(): void {
        this.unSubAllService.next(true);
        this.unSubAllService.unsubscribe();
    }

    /** 
     * gets all customers
     * @method getAllCustomers
     * @param none no params are required
     * @returns {void} nothing is returned
     */
    getAllCustomers(): void {
        this.listAllCustomers.getAllCustomers()
            .subscribe((response: CustomerListRequest) => {
                if (response.resStatus) this.data = response.data;
            })
    }

}