import {
    Component, Input, Output, EventEmitter,
    ViewChild, TemplateRef
} from '@angular/core';

import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalModel, ModalAction } from '../../models/Modal';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'modal-component',
    templateUrl: 'modal.component.html',
    styleUrls: [
        'modal.component.css'
    ]
})

export class ModalComponent {

    @Input() set modalStatus(value) {
        value ? this.openModal() : this.closeModal();
    }

    @Input() center = false;

    @Output() modalClosed: EventEmitter<ModalModel> = new EventEmitter<ModalModel>();

    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    modalInstance: NgbModalRef;

    constructor(private modalService: NgbModal) { }

    /**
     * method opens the modal if defined otherwise defines and then opens up the modal
     * @method openModal
     * @param none
     * @returns { void }
     */
    openModal(): void {
        setTimeout(() => {
            this.modalInstance = this.modalService.open(this.modalContent, {centered: this.center});
            this.modalInstance.result.then(result => {},
                reason => {
                    this.modalClosed.emit({ status: false });
                });
        });
    }

    /**
     * method closes the modal via script
     * @method closeModal
     * @param none
     * @returns { void }
     */
    closeModal(): void {
        if (this.modalInstance) {
            this.modalInstance.close();
        }
    }
}
