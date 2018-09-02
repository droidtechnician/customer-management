import { Routes } from '@angular/router';
import { ListAllCustomersComponent } from './components/list-all-customers.component/list-all-customers.component';

export const customerRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'allcustomers'
    },
    {
        path: 'allcustomers',
        component: ListAllCustomersComponent
    }
];