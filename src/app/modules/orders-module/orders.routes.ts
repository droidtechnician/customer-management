import { Routes } from '@angular/router';
import { ListAllOrdersComponent } from './components/list-all-orders.component/list-all-orders.component';

export const orderRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'allorders'
    }, 
    {
        path: 'allorders',
        component: ListAllOrdersComponent
    }
]