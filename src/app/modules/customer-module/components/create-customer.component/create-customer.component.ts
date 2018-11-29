import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ModalModel, ModalAction } from 'src/app/modules/plugins-module/models/Modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateUserModalModel } from '../../models/create-user-modal.model';
import { CustomerModel } from '../../models/customer.model';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'create-customer',
    templateUrl: './create-customer.component.html',
    styleUrls: [
        './create-customer.component.css',
    ]
})

export class CreateCustomerComponent implements OnInit {

    showCustomerForm = false;
    customerForm: FormGroup;
    cancelIcon =  faTimes;

    dropdownConfig = {
        splitMode: false,
        splitMsg: 'Gender',
        options: [
            'Male',
            'Female'
        ]
    }

    @Input() 
    set show(value: boolean) {
        if (this.showCustomerForm && this.customerForm) {
            this.customerForm.reset();
            this.updateValue('Male');
        }
        this.showCustomerForm = value;
    }

    @Output() createModalClosed: EventEmitter<CreateUserModalModel> = new EventEmitter<CreateUserModalModel>();


    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.createCustomerForm();
    }

    /**
     * create customer form
     * @method createCustomerForm
     * @returns { void } nothing is returned
     */
    createCustomerForm(): void {
        this.customerForm = this.formBuilder.group({
            fName: [undefined, Validators.compose([
                Validators.required, Validators.minLength(3)
            ])],
            lName: [undefined, Validators.compose([
                Validators.required, Validators.minLength(3)
            ])],
            email: [undefined, Validators.compose([
                Validators.email, Validators.required
            ])],
            gender: 'Male',
            address: this.formBuilder.group({
                city: [
                    undefined, Validators.compose([
                        Validators.required, Validators.minLength(3)
                    ])
                ],
                state: [
                    undefined, Validators.required
                ],
                streetAddress: [
                    undefined, Validators.required
                ]
            })
        });
    }
    
    /**
     * when create user modal has been closed
     * @method modalClosed
     * @param value the status emitted from on modal close action
     * @param data contains user information which is 
     * @returns { void }
     */
    modalClosed(data: CreateUserModalModel): void {
        setTimeout(() => {
            this.showCustomerForm = false;
        })
        this.createModalClosed.emit(data);
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
     * close modal on click of backdrop
     * @method closeModal
     * @param status status of the modal
     * @returns { void } nothing is returned
     */
    closeModal(status: ModalModel): void {
        status.reason = ModalAction.CLOSED_BY_BACKDROP;
        this.modalClosed({modalDetails: status, modalStatus: false, data: undefined});
    }

    /**
     * emits customer details
     * @method createCustomerForm
     * @returns { void } nothing is returned
     */
    createCustomer(): void {
        this.modalClosed({
            modalDetails: {
                closedAction: ModalAction.CLOSE_BY_SAVE,
                status: true
            },
            data: this.getCustomerDetails(),
            modalStatus: false
        })
    }

    /**
     * emits customer object
     * @method getCustomerDetails
     * @returns { CustomerModel } customerDetils
     */
    getCustomerDetails(): CustomerModel {
        return {
            city: this.customerForm.get('address').get('city').value,
            first_name: this.customerForm.get('fName').value,
            last_name: this.customerForm.get('lName').value,
            email: this.customerForm.get('email').value,
            gender: this.customerForm.get('gender').value,
            state: this.customerForm.get('address').get('state').value,
            streetAddress: this.customerForm.get('address').get('streetAddress').value
        }
    }

    /**
     * cancel create of customer
     * @method cancelCreateCustomer
     * @returns { void } nothing is returned
     */
    cancelCreateCustomer(): void {
        this.modalClosed({
            data: undefined,
            modalStatus: false,
            modalDetails: {
                closedAction: ModalAction.CLOSED_BY_CANCEL,
                status: false,
            }
        });
    }
}