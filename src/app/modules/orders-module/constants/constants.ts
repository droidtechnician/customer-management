import { PaginatorPosition } from "../../plugins-module/models/pagination-config.model";

export const OrderConstants  = {
    'boundryLinks': true,
    'directionLinks': true,
    'disabled': false,
    'maxSize': 5,
    'page': 1,
    'pageSize': 10,
    'rotate': true,
    'collectionSize': 0,
    'paginatorSize': '',
    'paginatorPosition': PaginatorPosition.CENTER,
    'descCols': [
        {
            labelName: 'Total',
            id: 'totalAmount'
        },
        {
            labelName: 'Items',
            id: 'itemCount'
        },
        {
            labelName: 'Customer',
            id: 'custName'
        }
    ]
}