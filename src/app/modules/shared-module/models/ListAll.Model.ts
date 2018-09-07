import { TabItemModel } from "../../plugins-module/models/TabItem";

export interface ListAllModel {

    header: string;
    headerLogo?: any;
    tabsList: Array<TabItemModel>;
    pagination: boolean
}