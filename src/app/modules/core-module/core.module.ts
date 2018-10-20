import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { ToastModule, ToastOptions } from 'ng6-toastr';
import { ToastCustomOptions } from './toast.options';
import { GlobalService } from '../../services/global.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from '../../services/interceptors/headers-interceptor';
import { GeoCodingService } from '../../services/geo-coding.service';
import { LoaderComponent } from './components/loader.component/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LoaderComponent
    ],
    imports: [
        CommonModule,
        NgxSpinnerModule,
        ToastModule.forRoot(),
    ],
    exports: [
        LoaderComponent
    ],
    providers: [
        {
            provide: ToastOptions,
            useClass: ToastCustomOptions
        },
        GlobalService,
        GeoCodingService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        }
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
                GlobalService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HeaderInterceptor,
                    multi: true
                }
            ]
        }
    }
}