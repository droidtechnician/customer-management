import { CustomerModel } from "./customer.model";
import { ModalModel } from "../../plugins-module/models/Modal";

export interface CreateUserModalModel {
    modalStatus: boolean;
    data: CustomerModel;
    modalDetails: ModalModel
}