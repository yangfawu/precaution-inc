import { Component, EventEmitter, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-scam-frame',
    templateUrl: './scam-frame.component.html',
    styleUrls: ['./scam-frame.component.scss']
})
export class ScamFrameComponent {

    // @Input() exitColor = "white";
    readonly hidden$ = new BehaviorSubject<boolean>(true)
    readonly enabled$ = new BehaviorSubject<boolean>(false);
    @Output() readonly start = new EventEmitter()

    toggle() {
        this.hidden$.next(!this.hidden$.value)
    }

    updateStart(event: MatCheckboxChange) {
        this.enabled$.next(event.checked)
    }

    closeModal(modal: HTMLElement) {
        if (!this.enabled$.value)
            return
        modal!.classList.add('hidden')
        this.start.emit()
    }

}
