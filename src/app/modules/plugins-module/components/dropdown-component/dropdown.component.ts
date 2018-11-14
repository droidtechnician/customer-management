import { Component, EventEmitter, Input, Output, ContentChildren, QueryList, AfterContentInit, ViewChild, TemplateRef, forwardRef } from '@angular/core';
import { DropdownConfigModel, DropdownItem } from '../../models/DropdownConfigModel';
import { TemplateDefDirective } from '../../directives/template-defination.directive';
import { PluginsConstants } from '../../constants/plugins.constants';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: [
        './dropdown.component.css'
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropdownComponent),
            multi: true
        }
    ]
})

export class DropdownComponent implements AfterContentInit, ControlValueAccessor{

    @Input() dropdownConfig: DropdownConfigModel;

    @Output() dropdownItemClicked: EventEmitter<DropdownItem> = new EventEmitter<DropdownItem>();

    @ContentChildren(TemplateDefDirective) dropdownTemplates: QueryList<TemplateDefDirective>;

    dropdownItemValue: any;
    onChange= (value) => {};
    onTouched = () => {};

    splitMsgTemplate: TemplateRef<any>;
    dropdownRow: TemplateRef<any>;
    textTemplate: TemplateRef<any>;

    ngAfterContentInit(): void {
        this.assignTemplate();
    }

    writeValue(value): void {
        this.dropdownItemValue = value;
        this.onChange(value);
    }

    registerOnChange(fn: (value) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /**
     * assigns custom templates
     * @method assignTemplate
     * @returns { void } nothing is returned
     */
    assignTemplate(): void {
        this.dropdownTemplates.forEach((templateContainer: TemplateDefDirective) => {
            switch(templateContainer.getName()) {
                case PluginsConstants.dropdownItem:
                    this.dropdownRow = templateContainer.template;
                    break;
                case PluginsConstants.splitMsg:
                    this.splitMsgTemplate = templateContainer.template;
                    break;
            }
        })
    }

    /**
     * when option item is clicked
     * @method itemClicked
     * @param itemName name of the item clicked
     * @return { void } nothing is returned
     */
    itemClicked(itemName): void {
        const itemClicked: DropdownItem = {
            status: true,
            itemName: itemName
        }
        this.writeValue(itemName);
        this.dropdownItemClicked.emit(itemClicked);
    }
    
}