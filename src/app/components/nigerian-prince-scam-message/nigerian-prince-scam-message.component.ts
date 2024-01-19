import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseEmail } from 'src/app/structures/base-email';

@Component({
    selector: 'app-nigerian-prince-scam-message',
    templateUrl: './nigerian-prince-scam-message.component.html',
    styleUrls: ['./nigerian-prince-scam-message.component.scss']
})
export class NigerianPrinceScamMessageComponent implements AfterViewInit {

    @Input() data: BaseEmail = {
        name: "Test User",
        sender: "precaution",
        message: [
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci dolor, molestias temporibus excepturi amet aspernatur alias quo unde dolorum!"
        ],
        target: "Test User 2"
    };
    @Input() collapsed$ = new BehaviorSubject<boolean>(false);
    readonly time = new Date().getTime()
    
    constructor(
        private elRef: ElementRef
    ) {}

    ngAfterViewInit() {
        const ele = this.elRef.nativeElement as HTMLElement
        if (!ele)
            return

        window.scrollTo({ top: ele.getBoundingClientRect().top + window.scrollY - 32 })    
    }

    get email(): string {
        const first = this.data.name.toLowerCase()
            .split(' ')
            .map(text => text.trim())
            .join('.')
        const last = this.data.sender == "precaution" ?
            "precaution.inc" :
            "securedbank.xxx"
        return first + '@' + last
    }

    get flatText() {
        return this.data.message.join(' ')
    }

    toggle() {
        this.collapsed$.next(!this.collapsed$.value)
    }

}
