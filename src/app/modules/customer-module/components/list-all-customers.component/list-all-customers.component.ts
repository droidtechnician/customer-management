import { Component, OnInit } from '@angular/core';
import { ListAllCustomersService } from '../../services/list-all-customers.service';
import { ListAllModel } from '../../../shared-module/models/ListAll.Model';

import { faUser, faThLarge, faList } from '@fortawesome/free-solid-svg-icons';
import { CustomerConstants } from '../../constants/customers.constants';
import { TabItemModel } from '../../../plugins-module/models/TabItem';
import { CreateUserModalModel } from '../../models/create-user-modal.model';
import { ModalAction } from 'src/app/modules/plugins-module/models/Modal';
import { CustomerModel } from '../../models/customer.model';

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
    createCustomer = false;
    showCreateCustomerModal = false;

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

    /**
     * show create customer details
     * @method showCreateCustomer
     * @param none
     * @returns { void }
     */
    showCreateCustomer(): void {
        this.createCustomer = true;
        this.showCreateCustomerModal = true;
    }

    /**
     * callback when create customer modal has been closed
     * @method createCustomer
     * @param createCustomerModal status if user was created or not
     * @returns { void } nothing is returned
     */
    createCustomerModal(modalCreationStatus: CreateUserModalModel): void {
        this.createCustomer = false;
        this.showCreateCustomerModal = false;
        if (modalCreationStatus.modalDetails.closedAction === ModalAction.CLOSE_BY_SAVE) {
            this.createCustomerApi(modalCreationStatus.data);
        }
    }

    /**
     * call create customer api
     * @method createCustomerApi
     * @param data customerDetails
     * @returns { void } nothing is returned
     */
    createCustomerApi(data: CustomerModel): void {
        this.listAllComponentService.createNewCustomer(data)
            .subscribe(res => {
                if (res.resStatus) {
                    this.listAllComponentService
                        .showUserCreatedSuccessfully('User created successfully')
                        .then(resolve => {
                            console.log('resolved');
                        });
                }
            }, 
            error => {

            });
    }
}