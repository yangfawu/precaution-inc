import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    readonly emailControl = new FormControl('', [
        Validators.required,
        Validators.email
    ])
    readonly busy$ = new BehaviorSubject<boolean>(false)
    private readonly loadTime = 500

    constructor(
        private snackBarSvc: MatSnackBar,
        private databaseSvc: DatabaseService
    ) { }

    scrollToTop() {
        window.scrollTo(window.pageXOffset, 0)
    }

    subscribe() {
        this.emailControl.markAsDirty()

        if (this.emailControl.invalid)
            return
        
        this.busy$.next(true)

        // TODO: push email onto fb rtdb
        this.databaseSvc.appendEmail(
            this.emailControl.value,
            () => {
                this.snackBarSvc.open("Added your email!", 'OK')
                this.emailControl.patchValue('')
                this.emailControl.markAsUntouched()
                this.emailControl.markAsPristine()
                this.busy$.next(false)
            },
            () => {
                this.snackBarSvc.open("Failed to add email.", 'OK')
                this.busy$.next(false)
            })
    }

}
