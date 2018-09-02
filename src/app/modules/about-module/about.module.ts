import { NgModule } from '@angular/core';
import { AboutComponent } from './components/about.component/about.component';
import { RouterModule } from '@angular/router';
import { aboutRoutes } from './about.route';

@NgModule({
    declarations: [
        AboutComponent
    ],
    imports: [
        RouterModule.forChild(aboutRoutes)
    ]
})

export class AboutModule {}