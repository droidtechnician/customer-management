import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MoreDetailConfig } from '../../models/more-detail.config';
import { ListAllCustomersService } from '../../services/list-all-customers.service';
import { SidebarConfig } from '../../../plugins-module/models/SideBarModel';
import { CustomerModel } from '../../models/customer.model';
import { CustomerItem } from '../../models/customer-request';
import { faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { GeoCodingService } from '../../../../services/geo-coding.service';
import { ForwardGeocodeModel } from '../../../../utilities/models/geo-coding.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from '../../../../services/global.service';

@Component({
    selector: 'more-details',
    templateUrl: './more-customer-details.component.html',
    styleUrls: [
        './more-customer-details.component.css'
    ],
    encapsulation: ViewEncapsulation.None
})

export class MoreCustomerDetailsComponent implements OnInit {

    editIcon = faEdit;
    updateIcon = faCheck;

    editFieldData = {
        firstNameEdit: false,
        lastNameEdit: false,
        emailIdEdit: false,
        genderEdit: false,
        addressEdit: false
    }

    center: Array<number> = [0, 0];
    customerAdd: Array<number>= [0, 0];
    lngLat: Array<number> = [0, 0];

    customerForm: FormGroup;
    enableUpdate= false;
    loading = true;

    @Input() set config(configuration: MoreDetailConfig) {
        this.detailsConfig = configuration;
        this.setUpDetails(configuration);
    };
    @Output() moreDetailsClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

    detailsConfig: MoreDetailConfig;
    sideBarConfig: SidebarConfig = {};

    customerDetails: CustomerModel;
    copyCustomerData: CustomerModel;

    constructor(private listAllCustomer: ListAllCustomersService, private globalService: GlobalService,
        private geoCodeService: GeoCodingService, private formBuilder: FormBuilder) {}

    ngOnInit(): void  {
        this.setupSidebarConfig();
    }

    /** 
     * creates customer form
     * @method createCustomerForm
     * @returns { void } nothing is returned
     */
    createCustomerForm(): void {
        this.customerForm = this.formBuilder.group({
            firstName: [this.customerDetails.first_name, Validators.compose([
                Validators.required, Validators.minLength(3)
            ])],
            lastName: [ this.customerDetails.last_name, Validators.compose([
                Validators.required, Validators.minLength(3)
            ])],
            emailId: [
                this.customerDetails.email, Validators.email
            ],
            gender: [
                this.customerDetails.gender
            ],
            city: [
                this.customerDetails.city, Validators.compose([
                    Validators.required, Validators.minLength(3)
                ])
            ],
            state: [
                this.customerDetails.state, Validators.required
            ],
            streetAddress: [
                this.customerDetails.streetAddress
            ],
        })
    }

    /**
     * sets up sidebar config
     * @method setupSidebarConfig
     * @returns { void } nothing is returned
     */
    setupSidebarConfig(): void {
        this.sideBarConfig.fullScreen = true;
        this.sideBarConfig.showCloseIcon = false;
        this.sideBarConfig.blockScroll = false;
    }

    /**
     * setup details for the customer
     * @method setUpDetails
     * @param config configuration for the user
     * @returns { void } nothing is returned
     */
    setUpDetails(config: MoreDetailConfig): void {
        this.globalService.changeSpinnerStatus(true);
        this.listAllCustomer.getCustomerDetails(config.customer_id)
            .subscribe((res : CustomerItem) => {
                this.customerDetails = res.data;
                this.copyCustomerData = JSON.parse(JSON.stringify(this.customerDetails));
                this.setupMarkerOnCustomerAdd();
                this.createCustomerForm();
                setTimeout(() => {
                    this.loading = false;
                    this.globalService.changeSpinnerStatus(false);
                }, 2000);
            }, (error) => {
                setTimeout(() => {
                    this.globalService.changeSpinnerStatus(true);
                }, 2000);
            })
    }

    /**
     * setup marker on customers address
     * @method setupMarkerOnCustomerAdd
     * @returns { void } nothing is returned
     */
    setupMarkerOnCustomerAdd(): void {
        const data: ForwardGeocodeModel = {
            limit: 1,
            query: (()=> {
                return `${this.customerDetails.streetAddress}, ${this.customerDetails.state}
                , ${this.customerDetails.city}`
            })()
        }
        this.geoCodeService.forwardGeocode(data)
            .then(res => {
                const temp = res.body;
                this.center = temp.features[0].center;
                this.lngLat = temp.features[0].center;
            });
    }

    /**
     * more details bar closed
     * @method moreDetailsBarClosed
     * @param value 
     * @returns { void } nothing is returned
     */
    moreDetailsBarClosed(value): void {
        this.moreDetailsClosed.emit(value);
    }

    /**
     * dismisses the side details page
     * @method dismiss
     * @returns { void } nothing is returned
     */
    dismiss(): void {
        this.moreDetailsBarClosed(true);
    }

    /**
     * enable field for editing
     * @method enableEditing
     * @param name of the field being made editable
     * @returns { void } nothing is returned
     */
    enableEditing(name: string) {
        for (let field in this.editFieldData) {
            if (field === name) this.editFieldData[field] = true;
            else this.editFieldData[field] = false
        }
    }

    /**
     * disable field for editing
     * @method disableEditing
     * @param name of the field being made disabled
     * @returns { void } nothing is returned
     */
    disabledEditing(name: string) {
        for (let field in this.editFieldData) {
            if (field === name) this.editFieldData[field] = false;
            else this.editFieldData[field] = false
        }
        if (name === 'firstNameEdit') {
            if (this.copyCustomerData.first_name !== this.customerForm.get('firstName').value)
             alert('Values are not same');
            else alert('Values are same');
        }
    }


}