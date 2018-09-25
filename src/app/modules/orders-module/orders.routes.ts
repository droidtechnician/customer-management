import { Routes } from '@angular/router';
import { ListAllOrdersComponent } from './components/list-all-orders.component/list-all-orders.component';
import { ListCardViewComponent } from './components/list-card-view.component/list-card-view.component';
import { ListGridViewComponent } from './components/list-grid-view.component/list-grid-view.component';

export const orderRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'allorders'
    }, 
    {
        path: 'allorders',
        component: ListAllOrdersComponent,
        children: [
            {
                path: '',
                redirectTo: 'gridView',
                pathMatch: 'full'
            },
            // {
            //     path: 'cardView',
            //     component: ListCardViewComponent
            // },
            {
                path: 'gridView',
                component: ListGridViewComponent
            }
        ]
    }
]