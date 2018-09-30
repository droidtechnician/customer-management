import { Component } from '@angular/core';
import { CustomerModel, GenderEnum } from '../../models/customer.model';
import { Subject } from 'rxjs';
import { ListAllCustomersService } from '../../services/list-all-customers.service';
import { CustomerListRequest } from '../../models/customer-request';
import { PaginationConfigModel, PageChangeAction } from '../../../plugins-module/models/pagination-config.model';
import { CustomerConstants } from '../../constants/customers.constants';
import { CardListModel } from '../../../shared-module/models/CardListModel';

@Component({
    selector: 'list-card-customers',
    templateUrl: './list-card-view.component.html',
    styleUrls: [
        './list-card-view.component.css'
    ]
})

export class ListCardCustomersComponent {

    data: Array<CustomerModel> = [];
    customerData: Array<CustomerModel> = [];
    gridData: Array<CardListModel> = [];

    unSubAllService: Subject<boolean> = new Subject<boolean>();

    paginationConfig: PaginationConfigModel = {
        collectionSize: CustomerConstants.collectionSize,
        boundryLinks: CustomerConstants.boundryLinks,
        directionLinks: CustomerConstants.directionLinks,
        disabled: CustomerConstants.disabled,
        page: CustomerConstants.page,
        pageSize: CustomerConstants.pageSize,
        data: this.data
    }

    constructor(private listAllCustomers: ListAllCustomersService) { }

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
                if (response.resStatus) {
                    this.data = response.data;
                    const defaultPage: PageChangeAction = {
                        prePage: undefined,
                        pageSelected: 1
                    }
                    this.paginationConfig.collectionSize = this.data.length;
                    this.pageSelected(defaultPage)
                }
            })
    }

    /**
     * sets data for page selected
     * @method pageSelected
     * @param value which contains prev page and page selected
     * @param itemPerPage items per page
     * @return { void } nothing is returned
     */
    pageSelected(value: PageChangeAction): void {
        const startFrom = ((value.pageSelected - 1) * CustomerConstants.pageSize);
        this.customerData = ((startFrom + CustomerConstants.pageSize) > this.data.length) ?
            this.setUpPaginationData(this.data, startFrom, (this.data.length - startFrom)) :
            this.setUpPaginationData(this.data, startFrom, CustomerConstants.pageSize);
        this.createCardData(this.customerData);
    }

    /**
     * format data for card
     * @method createCardData
     * @param Array<CustomerModel> customer data that needs to be displayed
     * @returns { void } Nothing is returned
     */
    createCardData(customersData: Array<CustomerModel>): void {
        if (this.gridData.length > 0) this.gridData = [];
        customersData.forEach( (customer: CustomerModel) => {
            const temp: CardListModel = {
                header: {
                    id: customer.customer_id,
                    name: `${customer.first_name} ${customer.last_name}`
                },
                description: {
                    id: customer.customer_id,
                    city: customer.city,
                    email: customer.email,
                    state: customer.state
                },
                orders: ((custDetail: CustomerModel): string => {
                    let tempString  = '';
                    custDetail.orders.forEach((order: number) => {
                        tempString = `${tempString}, ${order}`
                    });

                    return tempString;
                })(customer),
                imgUrl: ((custDetail: CustomerModel): string => {
                    return custDetail.gender === GenderEnum.MALE ? 
                     CustomerConstants.maleImg: CustomerConstants.femaleImg
                })(customer)
            };
            this.gridData.push(temp);
        })
    }

    /**
     * setup data for pagination
     * @method setUpPaginationData
     * @param data which needs to be spliced
     * @param startFrom start splicing data array for
     * @param itemsCount the count of items which needs to be spliced
     */
    setUpPaginationData(data: Array<CustomerModel>, startFrom: number, items: number) {
        return (startFrom >= 0) && items ? JSON.parse(JSON.stringify(data)).splice(startFrom, items) : data;
    }
}