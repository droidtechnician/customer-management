import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page.component/home-page.component';

export const homeRoutes: Routes = [
    {path: '', component: HomePageComponent, children: [
        {
            path: '',
            redirectTo: 'customers',
            pathMatch: 'full'
        },
        {
            path: 'customers',
            loadChildren: '../customer-module/customer.module#CustomerModule'
        },
        {
            path: 'orders',
            loadChildren: '../orders-module/orders.module#OrdersModule'
        },
        {
            path: 'about',
            loadChildren: '../about-module/about.module#AboutModule'
        },
    ]}
];
