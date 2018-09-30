import { Routes } from '@angular/router';
import { ListAllCustomersComponent } from './components/list-all-customers.component/list-all-customers.component';
import { ListGridCustomersComponent } from './components/list-grid-view.component/list-grid-view.component';
import { ListCardCustomersComponent } from './components/list-card-view.component/list-card-view.component';

export const customerRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'allcustomers'
    },
    {
        path: 'allcustomers',
        component: ListAllCustomersComponent,
        children: [
            {
                path: '',
                redirectTo: 'cardView',
                pathMatch: 'full'
            },
            {
                path: 'gridView',
                component: ListGridCustomersComponent
            },
            {
                path: 'cardView',
                component: ListCardCustomersComponent
            }
        ]
    }
];