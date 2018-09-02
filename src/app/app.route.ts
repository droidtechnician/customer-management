import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';

import { LoginComponent } from './components/login.component/login.component';
import { SharedModule } from './modules/shared-module/shared.module';
import { PluginsModule } from './modules/plugins-module/plugins.module';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './modules/shared-module/components/page-not-found/page-not-found.component';
import { CoreModule } from './modules/core-module/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivateHomeRoute } from './services/auth-guards/activate-home-route';
import { LoginLoader } from './services/auth-guards/can-load-login';

/**
 * App level Routes
 */
const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './modules/home-module/home.module#HomeModule',
        canActivate: [
            ActivateHomeRoute
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [
            LoginLoader
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        BrowserAnimationsModule,
        SharedModule,
        PluginsModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        CoreModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        LoginComponent,
        RouterModule
    ],
    providers: []
})

export class AppRoutes {}
