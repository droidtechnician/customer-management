import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[templateDef]'
})

export class TemplateDefDirective {

    @Input() templateDef: string;

    constructor(public template: TemplateRef<any>) {}

    /**
     * gets name of the template
     * @method getName
     * @param none
     * @returns { string } string with name of the template is returned
     */
    getName(): string {
        return this.templateDef;
    }
}