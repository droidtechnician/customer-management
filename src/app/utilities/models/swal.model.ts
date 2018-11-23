import { SweetAlertType } from "../enums/swal.enum";

export interface SwalModel {
    title?: string;
    titleText?: string;
    html?: string;
    text?: string;
    type?: SweetAlertType;
    footer?: string;
    toast?: boolean;
    backdrop?: string;
    target?: string;
    input?: any;
    width?: string;
    padding?: number;
    background?: string;
    position?: any;
    grow?: any;
    customClass?: string;
    timer?: number;
    animation?: any;
    heightAuto?: boolean;
    allowOutsideClick?: any;
    allowEscapeKey?: any;
    allowEnterKey?: any;
    stopKeydownPropagation?: boolean
    confirmButtonText?: string
}