import { CustomerModel } from "./customer.model";

export interface CustomerListRequest {
    data: Array<CustomerModel>;
    resStatus: boolean
}

export interface CustomerCreateRequest {
    resStatus: boolean
}

export interface CustomerItem {
    data: CustomerModel;
    resStatus: boolean
}

export interface CustomerUpdate {
    resStatus: boolean;
    msg: string;
}