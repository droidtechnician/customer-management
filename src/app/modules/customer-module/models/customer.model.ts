import { Order } from "../../orders-module/models/order.model";

export interface CustomerModel {
    first_name: string;
    last_name: string;
    email: string;
    gender: GenderEnum;
    city: string;
    state: string;
    streetAddress: string;
    customer_id?: number;
    orders?: Array<number>;
    ordersDetails?: Array<Order>
}

export enum GenderEnum {
    MALE = 'Male',
    FEMALE = 'Female',
}