export interface CardListModel {

    header: CardHeader,
    description: CardDescription,
    imgUrl?: string,
    orders: Array<number> | string
}

export interface MoreDetailsClicked {
    id: number | string
}

export interface CardHeader {
    id: string | number,
    name: Array<string> | string
}

export interface CardDescription {
    id: string | number,
    city: string
    email: string,
    state: string,
}