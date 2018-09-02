import { ToasterEnum } from "../enums/toaster.enums";

export class ToasterModel {

    type: ToasterEnum;
    msg: string;
    label?: string;

}