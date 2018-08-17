import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './components/modal.component/modal.component';
import { ParticlesComponent } from './components/particles.component/partcles.component';



@NgModule({
    declarations: [
        ParticlesComponent,
        ModalComponent
    ],
    imports: [
        NgbModule,
        CommonModule
    ],
    exports: [
        ParticlesComponent,
        ModalComponent
    ]
})

export class PluginsModule {}
