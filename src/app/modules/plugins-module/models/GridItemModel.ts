export interface GridItemModel {
    label: string;
    value: string | number;
}

export interface GridConfigModel {
    labels: Array<GridLabelModel>;
    element: Object;
}

export interface GridLabelModel {
    id: string,
    labelName: string
}