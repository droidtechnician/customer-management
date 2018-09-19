export interface Item {
    category: string;
    itemName: string;
    brand: string;
    price: number;
    qty: number
}

export interface Order {
    items: Array<Item>;
    customer_id: number;
    orderNo: number,
    totalAmount: number,
    custName: string
}

export interface OrderRequest {
    data: Array<Order>;
    resStatus: boolean
}