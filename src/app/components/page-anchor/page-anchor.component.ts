import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
    selector: 'app-page-anchor',
    templateUrl: './page-anchor.component.html',
    styleUrls: ['./page-anchor.component.scss']
})
export class PageAnchorComponent {

    @Input() readonly anchor: string

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private globalsSvc: GlobalsService
    ) { }

    @HostListener('click', [])
    onClick() {
        const target = this.document.querySelector(`#${this.anchor}`)
        if (!target)
            return
        
        const targetPos = target.getBoundingClientRect().top + window.scrollY
        
        const offset = this.globalsSvc.$topGap.value

        window.scrollTo({ top: targetPos - offset*1.5 })
    }

}
