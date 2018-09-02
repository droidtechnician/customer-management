import { NgModule } from '@angular/core';
import { ListAllOrdersComponent } from './components/list-all-orders.component/list-all-orders.component';
import { RouterModule } from '@angular/router';
import { orderRoutes } from './orders.routes';
import { PluginsModule } from '../plugins-module/plugins.module';
import { SharedModule } from '../shared-module/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ListAllOrdersComponent
    ],
    imports: [
        CommonModule,
        PluginsModule,
        SharedModule,
        RouterModule.forChild(orderRoutes)
    ]
})

export class OrdersModule {}