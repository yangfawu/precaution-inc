import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Email } from 'src/app/structures/email';
import { Scene } from 'src/app/structures/scene';
import { SceneEmail } from 'src/app/structures/scene-email';
import { SceneOption } from 'src/app/structures/scene-option';
import { clone } from './clone';
import { getEmail } from './email-dict';
import { getScene } from './scene-dict';

@Component({
    selector: 'app-nigerian-prince-scam-page',
    templateUrl: './nigerian-prince-scam-page.component.html',
    styleUrls: ['./nigerian-prince-scam-page.component.scss']
})
export class NigerianPrinceScamPageComponent {

    messages: { email: Email, collapsed$: BehaviorSubject<boolean> }[] = []
    readonly story$ = new BehaviorSubject<string>("")
    readonly loading$ = new BehaviorSubject<boolean>(false)
    readonly end$ = new BehaviorSubject<boolean>(false)
    readonly options$ = new BehaviorSubject<SceneOption[]>([])
    readonly optionsControl = new FormControl('', [Validators.required])

    private sceneSubjects: BehaviorSubject<boolean>[] = [] 

    init() {
        this.triggerSceneById(0)
    }

    private executeScene(scene: Scene) {
        const exec = () => {
            this.loading$.next(true)

            this.sceneSubjects.forEach(sub => sub.next(true))
            
            const sceneSubject = new BehaviorSubject<boolean>(false)
            this.sceneSubjects.push(sceneSubject)

            let timer = 0
            for (const sceneEmail of scene.emails) {
                const { email, delay } = this.renderSceneEmail(sceneEmail)
                
                if (!email)
                    continue

                const fixedTime = timer + delay
                timer+= delay

                const collapsed$ = new BehaviorSubject<boolean>(false)
                sceneSubject.subscribe(state => collapsed$.next(state))

                window.setTimeout(() => this.messages.push({ email, collapsed$ }), fixedTime)
            }

            window.setTimeout(() => {
                this.story$.next(scene.story)
                this.end$.next(!!scene.isEnd)

                const options = clone(scene.options)
                let i = options.length
                while(--i > 0){
                    const j = Math.floor(Math.random() * (i+1));
                    [options[i], options[j]] = [options[j], options[i]]
                }
                this.options$.next(options)
                
                this.loading$.next(false)
            }, timer)
        }

        if (!this.loading$.value)
            return exec()
        
        let latch = false
        this.loading$.pipe(
            filter(state => !state)
        ).subscribe(() => {
            if (latch)
                return
            latch = true
            exec()
        })
    }

    private renderSceneEmail(sceneEmail: SceneEmail): { email: Email, delay: number } {
        const email = getEmail(sceneEmail.emailId)
        const changes = sceneEmail.changes
        if (email && changes)
            for (const key in changes)
                email[key] = changes[key]

        let delay = 0
        const constraints = sceneEmail.delay
        if (constraints) {
            const max = constraints.max
            const low = Math.min(constraints.min || 500, max)
            delay = Math.floor(Math.random()*(max - low + 1) + low)
        }

        return { email, delay }
    }

    triggerSceneById(id: Scene['id']) {
        this.executeScene(getScene(id))
    }

    confirmSelection() {
        if (this.optionsControl.invalid)
            return
        
        const id = parseInt(`${this.optionsControl.value}`.trim())
        if (id === NaN)
            return

        this.optionsControl.patchValue('')
        this.triggerSceneById(id)
    }

    reset() {
        while (this.messages.length)
            this.messages.splice(0, 1)

        while(this.sceneSubjects.length)
            this.sceneSubjects.splice(0, 1)

        this.loading$.next(true)
        window.setTimeout(() => this.loading$.next(false), 1e3)
        this.init()
    }

}
