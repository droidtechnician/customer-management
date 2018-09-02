import { ToastOptions } from "ng6-toastr";

export class ToastCustomOptions extends ToastOptions {
    animate = 'flyRight';
    newestOnTop = false;
    showCloseButton = true;
    positionClass = 'toast-bottom-right'
}