export interface PaginationConfigModel {

    boundryLinks?: boolean;
    collectionSize: number;
    directionLinks?: boolean;
    disabled?: boolean;
    ellipses?: boolean;
    maxSize?: number;
    page?: number;
    pageSize?: number;
    rotate?: boolean;
    size?: PaginationSize;
    data?: Array<any>;
    position?: PaginatorPosition
}

export interface PageChangeAction {
    prePage: number;
    pageSelected: number;
}

export enum PaginationSize {
    SMALL = 'sm',
    LARGE = 'lg'
}

export enum PaginatorPosition {
    START = 'd-flex justify-content-start',
    CENTER = 'd-flex justify-content-center',
    END = 'd-flex justify-content-end'
}