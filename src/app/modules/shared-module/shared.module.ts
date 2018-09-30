import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { PluginsModule } from '../plugins-module/plugins.module';
import { ListAllComponent } from './components/list-all-generic.component/list-all-generic.component';
import { CardListComponent } from './components/card-list.component/card-list.component';
import { GridListComponent } from './components/grid-list.component/grid-list.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

declare var particleJS: any;

@NgModule({
    declarations: [
        //Components
        CardListComponent,
        GridListComponent,
        ListAllComponent,
        PageNotFoundComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        PluginsModule,
        LoadingBarHttpClientModule,
        TableModule,
        PaginatorModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule
    ],
    exports: [
        //Components
        CardListComponent,
        GridListComponent,
        ListAllComponent,
        PageNotFoundComponent,

        // Modules
        CommonModule,
        FontAwesomeModule,
        LoadingBarHttpClientModule,
        MatCardModule
    ],
    providers: []
})

export class SharedModule {}
