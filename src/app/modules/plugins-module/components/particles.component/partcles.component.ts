import { Component, OnInit } from '@angular/core';

declare var particlesJS: any;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'particles-js',
    templateUrl: './particles.component.html',
    styleUrls: [
        './particles.component.css'
    ]
})
export class ParticlesComponent implements OnInit {

    ngOnInit() {
        particlesJS.load('particles-js', 'assets/particles.json', null);
    }
}
