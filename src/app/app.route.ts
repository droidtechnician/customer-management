import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';

import { LoginComponent } from './components/login.component/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './modules/shared-module/shared.module';
import { PluginsModule } from './modules/plugins-module/plugins.module';
import { HttpClientModule } from '@angular/common/http';

/**
 * App level Routes
 */
const appRoutes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', loadChildren: './modules/home-module/home.module#HomeModule'}
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        SharedModule,
        PluginsModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        LoginComponent,
        RouterModule
    ]
})

export class AppRoutes {}
