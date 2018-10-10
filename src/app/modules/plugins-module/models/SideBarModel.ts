export interface SidebarConfig {
    position?: SideBarPosition;
    styleClass?: SideBarStyleClass;
    fullScreen?: boolean;
    blockScroll?: boolean;
    dismissable?: boolean;
    showCloseIcon?: boolean
}

export enum SideBarPosition {
    TOP = 'top',
    LEFT = 'left',
    BOTTOM = 'bottom',
    RIGHT = 'right',
    DEFAULT = ''
}

export enum SideBarStyleClass {
    SMALL = 'ui-sidebar-sm',
    MEDIUM = 'ui-sidebar-md',
    LARGE = 'ui-sidebar-lg'
}