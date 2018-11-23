import { Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { MoreDetailConfig } from '../../models/more-detail.config';
import { ListAllCustomersService } from '../../services/list-all-customers.service';
import { SidebarConfig } from '../../../plugins-module/models/SideBarModel';
import { CustomerModel } from '../../models/customer.model';
import { CustomerItem, CustomerUpdate } from '../../models/customer-request';
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
import { DropdownConfigModel } from '../../../plugins-module/models/DropdownConfigModel';
import { Order, Item } from '../../../orders-module/models/order.model';
import swal from 'sweetalert2'
import { SweetAlertType } from 'src/app/utilities/enums/swal.enum';

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

    fieldUpdated: string;

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
        updateModal: false,
        formStatusModal: false
    };

    modalShow: Subject<UpdateModel> = new Subject<UpdateModel>();
    unsubAllService: Subject<boolean> = new Subject<boolean>();

    dropdownConfig: DropdownConfigModel = {
        splitMode: false,
        splitMsg: 'Gender',
        options: [
            'Male',
            'Female'
        ]
    }

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
            if (value.event === CustomerConstants.events.formStatus)
                this.modals.formStatusModal = value.action;
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
                this.customerDetails.email, Validators.compose([
                    Validators.email, Validators.required
                ])
            ],
            gender: [
                this.customerDetails.gender
            ],
            address: this.formBuilder.group({
                city: [
                    this.customerDetails.city, Validators.compose([
                        Validators.required, Validators.minLength(3)
                    ])
                ],
                state: [
                    this.customerDetails.state, Validators.required
                ],
                streetAddress: [
                    this.customerDetails.streetAddress, Validators.required
                ]
            }),
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
    enableEditing(name: string): void {
        for (let field in this.editFieldData) {
            if (field === name) this.editFieldData[field] = true;
            else this.editFieldData[field] = false
        }
        this.fieldUpdated = name;
    }

    /**
     * disable field for editing
     * @method disableEditing
     * @param name of the field being made disabled
     * @returns { void } nothing is returned
     */
    disabledEditing(name: string): void {
        if (this.customerForm.valid) {
            let enableEdit = false;
            switch (name) {
                case CustomerConstants.editableFields.firstName:
                    if (this.customerDetails.first_name !== this.customerForm.get('firstName').value)
                        enableEdit = true;
                    break;
                case CustomerConstants.editableFields.lastName:
                    if (this.customerDetails.last_name !== this.customerForm.get('lastName').value)
                        enableEdit = true;
                    break;
                case CustomerConstants.editableFields.email:
                    if (this.customerDetails.email !== this.customerForm.get('emailId').value)
                        enableEdit = true;
                    break;
                case CustomerConstants.editableFields.gender:
                        if (this.customerDetails.gender !== this.customerForm.get('gender').value)
                            enableEdit = true;
                        break;
                case CustomerConstants.editableFields.addressEdit:
                    let addressForm = this.customerForm.get('address');
                    if (this.customerDetails.streetAddress !== addressForm.get('streetAddress').value ||
                    this.customerDetails.city !== addressForm.get('city').value ||
                    this.customerDetails.state !== addressForm.get('state').value)
                        enableEdit = true;
                    break;
            }
            if (!enableEdit) this.editFieldData[name] = false
            this.showModal({status: enableEdit});
        } else 
            this.showFormModal({status: true});
    }

    /**
     * toggle update modal status
     * @method showModal
     * @param status status of the modal
     * @returns { void } nothing is returned
     */
    showModal(status: ModalModel): void {
        const updateObj: UpdateModel = {
            event: CustomerConstants.events.update,
            action: status.status
        };
        this.modalShow.next(updateObj);
    }


    /**
     * toggle form modal status
     * @method showFormModal
     * @param status status of the modal
     * @returns { void } nothing is returned
     */
    showFormModal(status: ModalModel): void {
        const statusObj: UpdateModel = {
            event: CustomerConstants.events.formStatus,
            action: status.status
        };
        this.modalShow.next(statusObj);
    }

    /**
     * cancel updation of form field
     * @method cancelUpdate
     * @returns { void } nothing is returned
     */
    cancelUpdate(): void {
        if (this.fieldUpdated && (this.fieldUpdated in this.editFieldData)) {
            this.editFieldData[this.fieldUpdated] = false;
            const formControl: string | Array<string> = this.getFormControl(this.fieldUpdated);
            if (Array.isArray(formControl)) {
                const addFormControl = this.customerForm.get('address');
                addFormControl.get('city').setValue(this.customerDetails.city);
                addFormControl.get('state').setValue(this.customerDetails.state);
                addFormControl.get('streetAddress').setValue(this.customerDetails.streetAddress);
            } else {
                switch(this.fieldUpdated) {
                    case CustomerConstants.editableFields.firstName:
                        this.customerForm.get('firstName').setValue(this.customerDetails.first_name);
                        break;
                    case CustomerConstants.editableFields.lastName:
                        this.customerForm.get('lastName').setValue(this.customerDetails.last_name);
                        break;
                    case CustomerConstants.editableFields.email:
                        this.customerForm.get('emailId').setValue(this.customerDetails.email);
                        break;
                    case CustomerConstants.editableFields.gender:
                        this.customerForm.get('gender').setValue(this.customerDetails.gender);
                        break;
                }
            }
        this.showModal({status: false});
        }
    }

    /**
     * confirms update of the form data
     * @method confirmUpdate
     * @returns { void } nothing is returned
     */
    confirmUpdate(): void {
        if (!this.enableUpdate) this.enableUpdate = true
        let field = '';
        switch (this.fieldUpdated) {
            case CustomerConstants.editableFields.firstName:
                this.customerDetails.first_name = this.customerForm.get('firstName').value;
                field = CustomerConstants.editableFields.firstName;
                break;
            case CustomerConstants.editableFields.lastName:
                this.customerDetails.last_name = this.customerForm.get('lastName').value;
                field = CustomerConstants.editableFields.lastName;
                break;
            case CustomerConstants.editableFields.email:
                this.customerDetails.email = this.customerForm.get('emailId').value;
                field = CustomerConstants.editableFields.email;
                break;
            case CustomerConstants.editableFields.gender:
                this.customerDetails.gender = this.customerForm.get('gender').value;
                field = CustomerConstants.editableFields.gender;
                break;
            case CustomerConstants.editableFields.addressEdit:
                let addressForm = this.customerForm.get('address');
                this.customerDetails.streetAddress = addressForm.get('streetAddress').value;
                this.customerDetails.state = addressForm.get('state').value;
                this.customerDetails.city = addressForm.get('city').value;
                field = CustomerConstants.editableFields.addressEdit;
                break;
        }
        this.editFieldData[field] = false;
        this.showModal({status: false});
    }

    /**
     * gets form control name
     * @method getFormControl
     * @param name name of the editted control
     * @returns { string }
     */
    getFormControl(name: string): string|Array<string> {
        if (name in this.editFieldData) {
            switch(name) {
                case CustomerConstants.editableFields.firstName:

                    return 'firstName';
                case CustomerConstants.editableFields.lastName:

                    return 'lastName';
                case 'emailIdEdit':

                    return 'emailId';
                case 'genderEdit':

                    return 'gender';
                case 'addressEdit':

                    return ['city', 'state', 'streetAddress'];
                
            }
        }
    
    return '';
    }

    /**
     * update gender value
     * @method updateValue
     * @param genderValue either male or female
     * @return { void }
     */
    updateValue(genderValue: string): void {
        this.customerForm.get('gender').setValue(genderValue);
    }

    /**
     * creates order descritpion message
     * @method orderDescriptionMsg
     * @param order details of the order that has been ordered
     * @returns { string } a message for the order placed is returned
     */
    orderDescriptionMsg(order : Order): string {
        let orderMsg = 'This order contains ';
        orderMsg += `${order.items.length} `
        if (order.items.length > 1) orderMsg += 'items ';
        else orderMsg += 'item ';
        orderMsg += ' where most expensive item is a ';
        let itemList: Array<Item> = JSON.parse(JSON.stringify(order.items));
        itemList.sort((itemOne, itemTwo) => {
            return itemTwo.price - itemOne.price;
        });
        let maxPriceItem = itemList[itemList.length -1];
        orderMsg += `${maxPriceItem.itemName} which costs around ${maxPriceItem.price}$
         and the total billing amount is ${order.totalAmount}$`;
        return orderMsg;
    }

    /**
     * updates customer details
     * @method updateUserDetails
     * @returns { void } nothing is returned
     */
    updateUserDetails(): void {
        this.listAllCustomer.updateCustomerDetails(this.getCustomerDetails(),
        this.customerDetails.customer_id)
        .pipe(
            takeUntil(this.unsubAllService)
        )
        .subscribe((res: CustomerUpdate) => {
            if (res.resStatus === true) 
                this.globalService.showSweetToast({
                    title: 'Done !!',
                    text: 'Customer details updated successfully',
                    type: SweetAlertType.Success,
                    confirmButtonText: 'Done'
                }).then((resolve) => {
                    console.log(resolve)
                }).catch(error => {
                    console.log(error);
                })
        });
    }

    /**
     * get customer details object
     * @method getCustomerDetails
     * @returns { CustomerModel } data of the customer
     */
    getCustomerDetails(): CustomerModel {
        
        return JSON.parse(JSON.stringify({
            first_name: this.customerForm.get('firstName').value,
            last_name: this.customerForm.get('lastName').value,
            email: this.customerForm.get('emailId').value,
            gender: this.customerForm.get('gender').value,
            city: this.customerForm.get('address').get('city').value,
            state: this.customerForm.get('address').get('city').value,
            streetAddress: this.customerForm.get('address').get('city').value
        }));
    }
}