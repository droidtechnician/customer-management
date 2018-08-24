import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page.component/home-page.component';
import { homeRoutes } from './home.routes';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared-module/shared.module';

@NgModule({
    declarations: [
        HomePageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(homeRoutes)
    ]
})

export class HomeModule {}
