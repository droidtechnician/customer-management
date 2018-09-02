import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { customerRoutes } from './customer.routes';
import { SharedModule } from '../shared-module/shared.module';
import { PluginsModule } from '../plugins-module/plugins.module';
import { CommonModule } from '@angular/common';
import { ListAllCustomersComponent } from './components/list-all-customers.component/list-all-customers.component';
 
@NgModule({
    declarations: [
        ListAllCustomersComponent
    ],
    imports:[
        CommonModule,
        PluginsModule,
        SharedModule,
        RouterModule.forChild(customerRoutes)
    ]
})

export class CustomerModule {}