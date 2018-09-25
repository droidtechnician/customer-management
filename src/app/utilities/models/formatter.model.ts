import { GridItemModel } from "../../modules/plugins-module/models/GridItemModel";

export class FormatterModel {

    /**
     * creates grid info display data
     */
    createGridData(creator: Array<GridDataCreaterModel>, data: Array<any>)
    : Array<GridItemModel> {
        const respArr: Array<GridItemModel> = [];
        data.forEach(element => {
            creator.forEach(item => {
                if (`${item}` in element) 
                    respArr.push({label: item.label, value: element[`${item.valueId}`]});
            })
        });

        return respArr;
    }
}

export interface GridDataCreaterModel {
    label: string;
    valueId: string;
}