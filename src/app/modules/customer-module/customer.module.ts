import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { customerRoutes } from './customer.routes';
import { SharedModule } from '../shared-module/shared.module';
import { PluginsModule } from '../plugins-module/plugins.module';
import { CommonModule } from '@angular/common';
import { ListAllCustomersComponent } from './components/list-all-customers.component/list-all-customers.component';
import { ListCardCustomersComponent } from './components/list-card-view.component/list-card-view.component';
import { ListGridCustomersComponent } from './components/list-grid-view.component/list-grid-view.component';
import { MoreCustomerDetailsComponent } from './components/more-customer-details.component/more-customer-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCustomerComponent } from './components/create-customer.component/create-customer.component';
 
@NgModule({
    declarations: [
        ListAllCustomersComponent,
        ListCardCustomersComponent,
        ListGridCustomersComponent,
        MoreCustomerDetailsComponent,
        CreateCustomerComponent
    ],
    imports:[
        CommonModule,
        PluginsModule,
        SharedModule,
        RouterModule.forChild(customerRoutes),
        ReactiveFormsModule
    ]
})

export class CustomerModule {}