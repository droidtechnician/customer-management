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



@NgModule({
    declarations: [
        CardItemComponent,
        ListItemsComponent,
        ModalComponent,
        ParticlesComponent,
        TabSetComponent
    ],
    imports: [
        NgbModule,
        CommonModule,
        RouterModule,
        FontAwesomeModule
    ],
    exports: [
        CardItemComponent,
        ListItemsComponent,
        ModalComponent,
        ParticlesComponent,
        TabSetComponent
    ]
})

export class PluginsModule {}
