import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';

declare var particleJS: any;

@NgModule({
    declarations: [
        PageNotFoundComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        LoadingBarHttpClientModule
    ],
    exports: [
        //Components
        PageNotFoundComponent,

        // Modules
        CommonModule,
        FontAwesomeModule,
        LoadingBarHttpClientModule,
    ]
})

export class SharedModule {}
