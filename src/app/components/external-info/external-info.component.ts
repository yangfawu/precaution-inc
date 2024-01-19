import { Component } from '@angular/core';
import * as fac from 'fast-average-color';
import { BehaviorSubject } from 'rxjs';
import { FetchService } from 'src/app/services/fetch.service';
import { External } from 'src/app/structures/external';

const DEFAULT_BAND_COLOR = '#ff9d9d'
const FacConstructor = (fac as any).default as typeof fac

@Component({
    selector: 'app-external-info',
    templateUrl: './external-info.component.html',
    styleUrls: ['./external-info.component.scss']
})
export class ExternalInfoComponent {

    readonly $data = new BehaviorSubject<External[]>([])
    readonly $avgColor = new BehaviorSubject<string>(DEFAULT_BAND_COLOR)
    readonly $item = new BehaviorSubject<External>(null)
    readonly $position = new BehaviorSubject<number>(-1)
    readonly $loading = new BehaviorSubject<boolean>(false)

    private computedColorLog: { [s: string]: string } = {}
    private imgAnalyzer = new FacConstructor()

    constructor(
        private fetchSvc: FetchService
    ) {
        this.fetchSvc.get<External[]>('assets/resources-page/json/externals.json', 'json')
            .then(data => {
                if (!(data instanceof Array))
                    return
                this.$data.next(data)
                
                const length = data.length
                if (!length)
                    return
                
                this.loadPosition(Math.floor(Math.random()*length))
            })
            .catch(() => void(0))
    }

    private loadPosition(index: number) {
        if (this.$loading.value)
            return
        
        const original = this.$position.value + 0

        this.$position.next(index)
        this.$loading.next(true)

        const item = this.item
        const finish = (color: string) => {
            this.$avgColor.next(color)
            this.$item.next(item)
            this.$loading.next(false)
        }

        const link = item.logo
        if (link in this.computedColorLog)
            finish(this.computedColorLog[link])
        else
            this.fetchSvc.get<Blob>('assets/resources-page/img/' + link, 'blob')
                .then(blob => URL.createObjectURL(blob))
                .then(url => this.imgAnalyzer.getColorAsync(url))
                .then(color => color.hex)
                .then(hex => {
                    this.computedColorLog[link] = hex
                    finish(hex)
                })
                .catch(() => {
                    this.$position.next(original)
                    this.$loading.next(false)
                })
    }

    get item(): External {
        const pos = this.$position.value
        if (pos < 0 || pos >= this.$data.value.length)
            return null
        return this.$data.value[pos]
    }

    shift(step: number) {
        const length = this.$data.value.length
        if (!length)
            return

        let newPosition = this.$position.value + step
        newPosition%= length
        if (newPosition < 0)
            newPosition+= length

        this.loadPosition(newPosition)
    }

}
