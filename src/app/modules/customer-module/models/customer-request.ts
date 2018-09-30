import { CustomerModel } from "./customer.model";

export interface CustomerListRequest {
    data: Array<CustomerModel>;
    resStatus: boolean
}