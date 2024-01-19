import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { NavGroupComponent } from '../nav-group/nav-group.component';

@Component({
    selector: 'app-nav-anchor',
    templateUrl: './nav-anchor.component.html',
    styleUrls: ['./nav-anchor.component.scss']
})
export class NavAnchorComponent implements AfterViewInit {

    @Input() readonly link: any
    @Input() readonly level = 1
    @Input() group?: NavGroupComponent
    @ViewChild('proxyWrapper') proxy: RouterLinkActive
    
    get trueLevel() {
        if (this.group)
            return this.group.trueLevel + 1
        return this.level
    }

    ngAfterViewInit() {
        if (!this.proxy)
            return
        window.setTimeout(() => {
            if (this.proxy.isActive)
                this.group?.tip()
        }, 0)
    }

}
