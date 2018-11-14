import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[drpdwn]',
    exportAs: 'drpdwn'
})

export class DropdownDirective {

    nodeTemplate: ElementRef<any>;
    renderer: Renderer2;
    scrollTop;
    height;

    constructor(renderer: Renderer2, parentNode: ElementRef<any>) {
        this.nodeTemplate = parentNode;
        this.renderer = renderer;
    }

    @HostListener('click', ['$event'])
    dropdownState(event): void {
        // this.searchParent(this.nodeTemplate.nativeElement);
        let ul = this.nodeTemplate.nativeElement.querySelector('#dropdown-list');
        let ulOffset = this.getHeight(ul);
        this.searchParent(this.nodeTemplate.nativeElement);
        let spaceUp = (ulOffset.top - 38 - ul.offsetHeight) - this.scrollTop;
        let spaceDown = this.scrollTop + this.height - (ulOffset.top - ul.offsetHeight);
    }

    getHeight(element) {
        // console.log(this.nodeTemplate.nativeElement.offsetLeft - this.nodeTemplate.nativeElement.scrollLeft)
        // console.log(this.nodeTemplate.nativeElement.offsetTop - this.nodeTemplate.nativeElement.scrollTop)
        return {
            top: element.offsetTop - element.scrollTop
        }
    }

    searchParent(item) {
        if (item.parentElement)
            this.searchParent(item.parentElement);
        else {
            this.scrollTop = item.scrollTop;
            this.height = item.offsetHeight;
        }
    }
}