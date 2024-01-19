import { AfterContentInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavAnchorComponent } from '../nav-anchor/nav-anchor.component';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-nav-group',
    templateUrl: './nav-group.component.html',
    styleUrls: ['./nav-group.component.scss']
})
export class NavGroupComponent implements OnInit, AfterContentInit {

    @Input() readonly level = 1
    @Input() group?: NavGroupComponent
    @ContentChildren(NavAnchorComponent) anchors: QueryList<NavAnchorComponent>
    @ContentChildren(NavGroupComponent) groups: QueryList<NavGroupComponent>
    @ViewChild('wrapper') content: ElementRef
    readonly opened = new BehaviorSubject<boolean>(false)
    readonly active = new BehaviorSubject<boolean>(false)

    private fire(state: boolean) {
        this.opened.next(state)
        this.group?.update()
    }

    open() {
        this.fire(true)
    }

    close() {
        this.fire(false)
    }

    toggle() {
        this.fire(!this.opened.value)
    }

    ngOnInit() {
        this.opened.pipe(distinctUntilChanged()).subscribe(opened => this.update(opened))
    }

    ngAfterContentInit() {
        const navComponents = [...this.groups.toArray(), ...this.anchors.toArray()]
        navComponents.forEach(component => component.group = this)
    }

    get trueLevel() {
        if (this.group)
            return this.group.trueLevel + 1
        return this.level
    }

    update(state?: boolean) {
        if (state === undefined)
            state = this.opened.value
        if (!this.content)
            return
        const ele = this.content.nativeElement as HTMLDivElement
        if (state) {
            ele.style.maxHeight = `${ele.scrollHeight}px`
            ele.style.overflow = 'visible'
        } else {
            ele.style.maxHeight = null
            ele.style.overflow = 'hidden'
        }
    }

    tip() {
        if (this.active.value)
            return
        this.active.next(true)
        this.group?.tip()
        this.open()
    }

}
