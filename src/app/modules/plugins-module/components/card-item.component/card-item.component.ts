import { AfterContentInit,
    Component,
    ContentChildren,
    TemplateRef,
    QueryList
} from '@angular/core';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { TemplateDefDirective } from '../../directives/template-defination.directive';
import { isNgTemplate } from '@angular/compiler';

@Component({
    selector: 'card-item',
    templateUrl: './card-item.component.html',
    styleUrls: [
        './card-item.component.css'
    ]
})

export class CardItemComponent implements AfterContentInit {

    personIcon =  faUser;

    @ContentChildren(TemplateDefDirective) templateList: QueryList<any>;

    headerTemplate: TemplateRef<any>;
    imageTemplate: TemplateRef<any>;
    descriptionTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;

    ngAfterContentInit(): void {
        this.setUpContent();
    }

    /**
     * this method sets all the templates
     * @method setUpContent
     * @param none
     * @returns { void } returns nothing
     */
    setUpContent(): void {
        this.templateList.forEach( (item: TemplateDefDirective) => {
            switch(item.templateDef) {
                case 'header':
                 this.headerTemplate = item.template;
                 break;
                case 'image':
                 this.imageTemplate = item.template;
                 break;
                case 'description':
                 this.descriptionTemplate = item.template;
                 break;
                case 'footer':
                 this.footerTemplate = item.template;
            }
        });
    }
    
}