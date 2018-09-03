export interface TabItemModel {
    tabName: string;
    tabIcon?: any;
    enable?: boolean;
    onClickAction?: Function;
    navigateTo: string;
}