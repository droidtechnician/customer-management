import { Component, OnInit } from '@angular/core';
import { ListAllCustomersService } from '../../services/list-all-customers.service';
import { ToasterEnum } from '../../../../utilities/enums/toaster.enums';

@Component({
    selector: 'list-all-customers',
    templateUrl: './list-all-customers.component.html',
    styleUrls: [
        'list-all-customers.component.css'
    ],
    providers: [
        ListAllCustomersService
    ]
})

export class ListAllCustomersComponent implements OnInit{

    mockData: Array<string> = [];

    constructor(private listAllComponentService: ListAllCustomersService){}


    ngOnInit() {
        for (let i = 0; i < 100; i++) {
            this.mockData.push('SampleName');
        }
    }

    //TODO: Will be removed in future
    itemClicked() {
        this.listAllComponentService.showToast({type: ToasterEnum.INFORMATION, msg: "Hello From Sample"});
    }
}