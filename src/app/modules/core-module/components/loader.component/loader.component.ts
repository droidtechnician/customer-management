import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderConfig, LoaderSize } from '../../models/loader-config.model';
import { LoaderConstants } from '../../constants/loader.constants';

@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: [
        './loader.component.css'
    ]
})

export class LoaderComponent {

    @Input() set showSpinner(show: boolean) {
        this.setSpinnerStatus(show);
    }

    @Input() set spinnerConfig(config : LoaderConfig) {
        this.setsUpLoaderConfig(config);
    }

    bdColor = 'rgba(51,51,51,0.8)';
    size = LoaderSize.MEDIUM;
    color = '#fff';
    type = 'timer';
    message = undefined;

    constructor(private spinner: NgxSpinnerService) {}

    /**
     * show/hide spinner
     * @method setSpinnerStatus
     * @param value this determines whether to show/hide spinner
     * @returns { void } nothing is returned
     */
    setSpinnerStatus(value: boolean): void {
        if (value) this.spinner.show();
        else this.spinner.hide();
    }

    /**
     * setup custom loader config
     * @method setsUpLoaderConfig
     * @param config contains the custom configuration
     * @returns { void } nothing is returned
     */
    setsUpLoaderConfig(config: LoaderConfig): void {
        if (Object.keys(config).length > 0) {
            for (let setting in config) {
                switch (setting) {
                    case LoaderConstants.loaderBackgroundColor:
                        let colorString = '';
                        for (let i = 0; i< config.backgroundColor.length; i++) {
                            let colorVal = config.backgroundColor[i];
                            if (!colorVal) colorVal = 0;
                            if (i === 0) colorString += `${colorVal}`
                            else colorString += `,${colorVal}`
                        }
                        this.bdColor = `rgba(${colorString})`
                        break;
                    case LoaderConstants.loaderSize:
                        this.size = config.size;
                        break;
                    case LoaderConstants.loaderType:
                        this.type = config.type;
                        break;
                    case LoaderConstants.loaderMsg:
                        this.message = config.msg;
                        break;
                }
            }
        }
    }
}