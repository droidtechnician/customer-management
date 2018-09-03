import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './components/modal.component/modal.component';
import { ParticlesComponent } from './components/particles.component/partcles.component';
import { TabSetComponent } from './components/tab-set.component/tab-set.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
    declarations: [
        ParticlesComponent,
        ModalComponent,
        TabSetComponent
    ],
    imports: [
        NgbModule,
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
        ParticlesComponent,
        ModalComponent,
        TabSetComponent
    ]
})

export class PluginsModule {}
