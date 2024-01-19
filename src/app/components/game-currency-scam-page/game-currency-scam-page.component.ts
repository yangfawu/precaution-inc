import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-game-currency-scam-page',
    templateUrl: './game-currency-scam-page.component.html',
    styleUrls: ['./game-currency-scam-page.component.scss']
})
export class GameCurrencyScamPageComponent {

    selected = -1
    hidden = true
    passwordControl = new FormControl('', [Validators.required])
    userNameControl = new FormControl('', [Validators.required])
    rewards = [
        "Get $100 Dollar for FREE",
        "Get a FREE Phone",
        "Get FREE Hacks for your favorite games",
        "Get $1000 Dollar for FREE",
        "Get a FREE iPhone 10",
        "Get a FREE gaming Laptop",
        "Get a chance to win FREE Roblox",
        "Get a chance to win a vacation",
        "Get a FREE home"
    ]

    submitForm() {
        if (this.selected < 1 || this.userNameControl.invalid || this.passwordControl.invalid)
            return
        
        const username = `${this.userNameControl.value}`.trim()
        if (!username.length)
            return window.alert("Invalid username.")

        this.hidden = false
    }

    warn() {
        window.alert("Entering you login information is already a mistake. Clicking on a mysterious link is even worse. Do not do this.")
    }

}
