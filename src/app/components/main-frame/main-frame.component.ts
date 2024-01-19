import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-main-frame',
    templateUrl: './main-frame.component.html',
    styleUrls: ['./main-frame.component.scss']
})
export class MainFrameComponent implements AfterViewInit, OnDestroy {

    @ViewChild('wrapper') readonly wrapper: ElementRef
    readonly topGap = new BehaviorSubject<number>(108)
    readonly mobileQuery: MediaQueryList
    readonly PATHS = environment.paths
    readonly broadcastHidden$: BehaviorSubject<boolean>

    private listenerHolder: () => void

    constructor(
        private changeDetector: ChangeDetectorRef,
        private media: MediaMatcher,
        private globalsSvc: GlobalsService
    ) {
        this.broadcastHidden$ = this.globalsSvc.$announcementClosed
        this.mobileQuery = this.media.matchMedia('(max-width: 600px)')
        this.listenerHolder = () => this.changeDetector.detectChanges()
        this.mobileQuery.addEventListener("change", this.listenerHolder)
        this.topGap.subscribe(val => this.globalsSvc.$topGap.next(val))
    }

    ngAfterViewInit() {
        this.sideTopGapSetter()
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener("change", this.listenerHolder)
    }

    @HostListener("window:resize", [])
    @HostListener("window:scroll", [])
    sideTopGapSetter() {
        const value = (this.wrapper.nativeElement as HTMLElement)?.getBoundingClientRect().height || 0
        console.assert(typeof value === "number")
        this.addNewGap(value)
    }

    addNewGap(val: number) {
        if (this.topGap.value == val)
            return
        this.topGap.next(val)
    }

    closeBroadcast() {
        this.broadcastHidden$?.next(true)
        window.setTimeout(() => this.sideTopGapSetter(), 0)
    }

}
