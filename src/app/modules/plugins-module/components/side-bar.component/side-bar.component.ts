import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarConfig, SideBarPosition, SideBarStyleClass } from '../../models/SideBarModel';
import { PluginsConstants } from '../../constants/plugins.constants';

@Component({
    selector: 'side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: [
        './side-bar.component.css'
    ]
})

export class SidebarComponent {

    @Input() show: boolean;
    @Input() set customSideBarConfig(config: SidebarConfig) {
        this.setUpSideBarConfig(config);
    }
    @Output() sideBarClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

    position = SideBarPosition.RIGHT;
    styleClass = SideBarStyleClass.MEDIUM;
    fullScreen = false;
    blockScroll = true;
    dismissable = true;
    showCloseAction = true;

    constructor() {}

    /**
     * set up custom side bar config
     * @method setUpSideBarConfig
     * @param config configuration for the side bar
     * @returns { void } nothing is returned
     */
    setUpSideBarConfig(config: SidebarConfig) {
        if (Object.keys(config).length > 0) {
            for (let prop in config) {
                switch (prop) {
                    case PluginsConstants.blockScroll:
                        this.blockScroll = config.blockScroll;
                        break;
                    case PluginsConstants.dismissable:
                        this.dismissable = config.dismissable;
                        break;
                    case PluginsConstants.fullScreen:
                        this.fullScreen = config.fullScreen;
                        break;
                    case PluginsConstants.showCloseIcon:
                        this.showCloseAction = config.showCloseIcon;
                        break;
                    case PluginsConstants.styleClass: 
                        this.styleClass = config.styleClass;
                        break;
                    case PluginsConstants.position:
                        this.position = config.position;
                        break;
                }
            }
        }
    }

    /**
     * side bar hidden 
     * @method sideBarHidden
     * @param value value emitted on side bar hidden
     * @returns { void } nothing is returned
     */
    sideBarHidden(value) {
        this.sideBarClosed.emit(true);
    }
    
}