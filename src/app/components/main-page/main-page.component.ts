import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';
import { environment } from 'src/environments/environment';

interface Simulation {
    name: string
    info: string
    link: string
    img: string
}

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

    readonly offset$ = this.globalsSvc.$topGap
    readonly simulations: Simulation[] = [
        {
            name: "Microsoft",
            info: "A classic web page designed to trick unknowing people into thinking that there's something worng with their hardware.",
            link: environment.paths.MICROSOFT,
            img: "microsoft"
        },
        {
            name: "Nigerian Prince",
            info: "An email scam that tries to convince people into sending money to unknown individuals.",
            link: environment.paths.NIGERIAN_PRINCE,
            img: "nigerian-prince"
        },
        {
            name: "Game Currency",
            info: "A new-generational scam that targets young children to steal personal information and use it against them.",
            link: environment.paths.GAME_CURRENCY,
            img: "game-currency"
        },
        {
            name: "Unexpected Prize",
            info: "Unexpected prize and lottery scams work by asking you to pay some sort of fee in order to claim your prize or winnings from a competition or lottery you never entered.",
            link: environment.paths.UNEXPECTED_PRIZE,
            img: "unexpected-prize"
        }
    ]
    selected = 0
    readonly selectedSim = new BehaviorSubject<Simulation>(null)

    constructor(
        private globalsSvc: GlobalsService
    ) {
        this.shift(0)
    }

    shift(offset: number) {
        const orig = this.selected + 0
        
        let newVal = orig + offset;
        newVal%= this.simulations.length

        if (newVal < 0)
            newVal+= this.simulations.length

        this.selected = newVal
        this.selectedSim.next(this.simulations[newVal])
    }

}
