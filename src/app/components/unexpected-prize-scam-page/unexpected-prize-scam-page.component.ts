import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CONFETTI } from './confetti';

@Component({
    selector: 'app-unexpected-prize-scam-page',
    templateUrl: './unexpected-prize-scam-page.component.html',
    styleUrls: ['./unexpected-prize-scam-page.component.scss']
})
export class UnexpectedPrizeScamPageComponent implements OnDestroy {

    annoucementHidden = false
    surveyHidden = true
    modalHidden = true
    fakeWinners = [
        {
            name: "Aaron Smith",
            prize: "Samsung Tablet",
            pic: "https://randomuser.me/api/portraits/men/11.jpg"
        },
        {
            name: "Alexandra Pearl",
            prize: "Steam Gift card",
            pic: "https://randomuser.me/api/portraits/women/11.jpg"
        },
        {
            name: "Alex Dou",
            prize: "iPad",
            pic: "https://randomuser.me/api/portraits/men/3.jpg"
        },
        {
            name: "John W. Cow",
            prize: "Samsung Tablet",
            pic: "https://randomuser.me/api/portraits/men/6.jpg"
        },
        {
            name: "Sandra Savanna",
            prize: "iPhone X",
            pic: "https://randomuser.me/api/portraits/women/16.jpg"
        },
        {
            name: "Jerome Johnson",
            prize: "Alienware Laptop",
            pic: "https://randomuser.me/api/portraits/men/16.jpg"
        },
    ]
    surveyStep = 0
    survey = [
        {
            question: "What is your gender?",
            answers: [
                "Male",
                "Female",
                "Prefer not to answer"
            ]
        },
        {
            question: "Whats your age?",
            answers: [
                "Under 18",
                "18 - 25",
                "25 - 36",
                "Over 36"
            ]
        },
        {
            question: "What is your annual salary?",
            answers: [
                "Below 30K",
                "30K - 60K",
                "60K - 100K",
                "100K or above"
            ]
        }
    ]
    bankNumberControl = new FormControl('', [Validators.required])
    bankPINCOntrol = new FormControl('', [Validators.required])

    init() {
        CONFETTI.start()
    }

    openModal() {
        this.modalHidden = false
    }

    launchSurvey() {
        this.modalHidden = true
        this.annoucementHidden = true
        this.surveyHidden = false
        CONFETTI.stop()
    }

    nextQuestion() {
        this.surveyStep++;
    }

    submitSurvey() {
        if (this.bankNumberControl.invalid || this.bankPINCOntrol.invalid)
            return
        
        const num = `${this.bankNumberControl.value}`.trim()
        if (!num.length)
            return window.alert("Invalid bank number.")

        const pin = `${this.bankPINCOntrol.value}`.trim()
        if (!pin.length)
            return window.alert("Invalid PIN number.")

        window.alert("Even though we didn't save your information, you should never enter in sensitive info like bank information on websites claiming to give out free prizes.")
    }

    ngOnDestroy() {
        CONFETTI.stop()
    }

}
