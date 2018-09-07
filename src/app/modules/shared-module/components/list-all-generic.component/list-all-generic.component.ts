import { Component, Input } from '@angular/core';
import { ListAllModel } from '../../models/ListAll.Model';

@Component({
    selector: 'list-all-component',
    templateUrl: './list-all-generic.component.html',
    styleUrls: [
        'list-all-generic.component.css'
    ]
})

export class ListAllComponent {

    @Input() listAllConfig: ListAllModel;

    constructor() {}
}