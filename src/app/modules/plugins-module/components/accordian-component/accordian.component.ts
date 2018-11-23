import { Component, ContentChildren, QueryList, AfterContentInit, TemplateRef, Input } from '@angular/core';
import { TemplateDefDirective } from '../../directives/template-defination.directive';
import { AccordianModel } from '../../models/accordian.model';
import { PluginsConstants } from '../../constants/plugins.constants';

@Component({
    selector: 'accordian-comp',
    templateUrl: './accordian.component.html',
    styleUrls: [
        './accordian.component.css'
    ]
})

export class AccordianComponent implements AfterContentInit{


    accordianContent: TemplateRef<any>;
    accordianTitle: TemplateRef<any>;
    @Input() accordianData: AccordianModel;
    @ContentChildren(TemplateDefDirective) accordianDesignTemplate: QueryList<TemplateDefDirective>;

    ngAfterContentInit(): void {
        this.setUpAccordian();
    }

    /**
     * setsup initial accordian design
     * @method setUpAccordian
     * @returns { void } nothing is returned
     */
    setUpAccordian(): void {
        this.accordianDesignTemplate.forEach( template => {
            switch(template.getName()) {
                case PluginsConstants.templates.accordionContent: 
                    this.accordianContent = template.template;
                    break;
                case PluginsConstants.templates.accordionTitle: 
                    this.accordianTitle = template.template;
            }
        });
    }
}