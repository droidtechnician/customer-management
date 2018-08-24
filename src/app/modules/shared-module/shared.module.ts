import { NgModule, OnInit } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

declare var particleJS: any;

@NgModule({
    declarations: [],
    imports: [
        FontAwesomeModule,
        LoadingBarHttpClientModule
    ],
    exports: [
        FontAwesomeModule,
        LoadingBarHttpClientModule
    ]
})

export class SharedModule {}
