import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-microsoft-scam-page',
    templateUrl: './microsoft-scam-page.component.html',
    styleUrls: ['./microsoft-scam-page.component.scss']
})
export class MicrosoftScamPageComponent {

    readonly hidden$ = new BehaviorSubject<boolean>(true)
    tally = 0
    readonly threshold = 3

    showAlert(delay = 0) {
        window.setTimeout(() => this.hidden$.next(false), delay)
    }

    closeAlert() {
        this.hidden$.next(true)
        this.tally++
        this.showAlert(500)
    }

}
