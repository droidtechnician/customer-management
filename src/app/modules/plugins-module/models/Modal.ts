export interface ModalModel {
 status: boolean;
 closedAction?: ModalAction;
 reason?: string;
}

export enum ModalAction {
    CLOSED_BY_BACKDROP = 'closedByBackdrop',
    CLOSED_BY_CANCEL = 'closedByCancel',
    CLOSE_BY_SAVE = 'closedBySave'
}
