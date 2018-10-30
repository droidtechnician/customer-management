import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
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
import { CustomerConstants } from '../../constants/customers.constants';
import { ModalModel } from '../../../plugins-module/models/Modal';
import { UpdateModel } from '../../models/update.model';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'more-details',
    templateUrl: './more-customer-details.component.html',
    styleUrls: [
        './more-customer-details.component.css'
    ]
})

export class MoreCustomerDetailsComponent implements OnInit, OnDestroy {

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
    customerAdd: Array<number> = [0, 0];
    lngLat: Array<number> = [0, 0];

    customerForm: FormGroup;
    enableUpdate = false;
    loading = true;

    modals = {
        updateModal: false
    };

    modalShow: Subject<UpdateModel> = new Subject<UpdateModel>();
    unsubAllService: Subject<boolean> = new Subject<boolean>();

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
        private geoCodeService: GeoCodingService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.setupSidebarConfig();
        this.setupModal();
    }

    ngOnDestroy(): void {
        this.unsubAllService.next(true);
        this.unsubAllService.unsubscribe();
    }

    /**
     * modal events capture
     * @method setupModal
     * @returns { void } nothing is returned
     */
    setupModal(): void {
        this.modalShow
        .pipe(
            takeUntil(this.unsubAllService)
        )
        .subscribe((value: UpdateModel) => {
            if (value.event === CustomerConstants.events.update) 
                this.modals.updateModal = value.action;
        });
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
            lastName: [this.customerDetails.last_name, Validators.compose([
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
            .subscribe((res: CustomerItem) => {
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
            query: (() => {
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
        switch (name) {
            case CustomerConstants.editableFields.firstName:
                if (this.copyCustomerData.first_name !== this.customerForm.get('firstName').value)
                    this.showModal(true);
        }
    }

    /**
     * toggle update modal status
     * @method showModal
     * @param status status of the modal
     * @returns { void } nothing is returned
     */
    showModal(status: boolean): void {
        const updateObj: UpdateModel = {
            event: CustomerConstants.events.update,
            action: status
        };
        this.modalShow.next(updateObj);
    }

    /**
     * update modal closed
     * @method updateModalClosed
     * @param value emitted from the update modal
     * @returns { void } nothing is returned
     */
    updateModalClosed(value: ModalModel): void {
        this.showModal(false);
    }
}