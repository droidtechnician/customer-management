import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './components/modal.component/modal.component';
import { ParticlesComponent } from './components/particles.component/partcles.component';
import { TabSetComponent } from './components/tab-set.component/tab-set.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListItemsComponent } from './components/list-items.component/list-items.component';
import { CardItemComponent } from './components/card-item.component/card-item.component';
import { TemplateDefDirective } from './directives/template-defination.directive';
import { PaginationComponent } from './components/pagination-component/pagination-component';
import { GridItemComponent } from './components/grid-item.component/grid-item.component';
import { MatCardModule } from '@angular/material/card';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarComponent } from './components/side-bar.component/side-bar.component';
import { DropdownComponent } from './components/dropdown-component/dropdown.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { AccordianComponent } from './components/accordian-component/accordian.component';

@NgModule({
    declarations: [
        CardItemComponent,
        ListItemsComponent,
        ModalComponent,
        ParticlesComponent,
        TabSetComponent,
        PaginationComponent,
        GridItemComponent,
        SidebarComponent,
        DropdownComponent,
        AccordianComponent,
        //Directive
        TemplateDefDirective,
        DropdownDirective
    ],
    imports: [
        NgbModule,
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        MatCardModule,
        SidebarModule,
    ],
    exports: [
        CardItemComponent,
        ListItemsComponent,
        ModalComponent,
        ParticlesComponent,
        TabSetComponent,
        PaginationComponent,
        GridItemComponent,
        SidebarComponent,
        DropdownComponent,
        AccordianComponent,
        //Directive
        TemplateDefDirective
    ]
})

export class PluginsModule {}
