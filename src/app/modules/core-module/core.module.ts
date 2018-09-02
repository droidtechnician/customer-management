import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { ToastModule, ToastOptions } from 'ng6-toastr';
import { ToastCustomOptions } from './toast.options';
import { GlobalService } from '../../services/global.service';

@NgModule({
    imports: [
        ToastModule.forRoot(),
    ],
    providers: [
        { 
            provide: ToastOptions,
            useClass: ToastCustomOptions
        },
        GlobalService
    ]
})

export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('Core Module is already created');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                ToastModule,
                GlobalService
            ]
        }
    }
}