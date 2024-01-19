import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FetchService } from 'src/app/services/fetch.service';
import { Tip } from 'src/app/structures/tip';

const MIN_VISIBLE = 3

@Component({
    selector: 'app-tips-search',
    templateUrl: './tips-search.component.html',
    styleUrls: ['./tips-search.component.scss']
})
export class TipsSearchComponent {
    
    readonly BREAK_CODES = [COMMA, ENTER] as const
    readonly filters: { id: string, value: string }[] = []
    readonly $busy = new BehaviorSubject<boolean>(true)
    readonly $results = new BehaviorSubject<string[]>([])
    readonly $visible = new BehaviorSubject<number>(0)
    readonly formControl = new FormControl('') 

    private source: string[] = []

    constructor(
        private fetchSvc: FetchService
    ) {
        this.fetchSvc.get<string[]>('assets/resources-page/json/tips.json', 'json')
            .then(data => {
                if (!(data instanceof Array))
                    return
                
                for (const tip of data)
                    this.source.push(tip)

                this.clearFilters()
            })
            .catch(() => void(0))
    }

    private hasFilter(query: string): boolean {
        const parsed = this.parse(query)
        if (this.filters.findIndex(filter => filter.value == parsed) < 0)
            return false
        return true
    }

    private parse(input: any): string {
        return `${input}`.trim().toLowerCase()
    }

    addFilter($event: MatChipInputEvent) {
        const input = $event?.input
        const rawValue = $event?.value
        if (!input || !rawValue)
            return
        
        const value = this.parse(rawValue)
        if (this.hasFilter(value))
            return

        const finish = () => {
            const id = `${new Date().getTime()}${value}`
            this.filters.push({ id, value })
            input.value = null

            this.narrowSearch(value)
            this.resetVisibleNumber()
        }
        if (this.$busy.value)
            this.$busy.pipe(
                filter(state => !state)
            ).subscribe(() => finish())
        else
            finish()
    }

    remove(id: string) {
        const index = this.filters.findIndex(filter => filter.id == id)
        if (index < 0)
            return
        this.filters.splice(index, 1)
        this.reSearch()
    }

    private resetVisibleNumber() {
        this.$visible.next(Math.min(this.$results.value.length, MIN_VISIBLE))
    }

    clearFilters() {
        this.$busy.next(true)
        while (this.filters.length)
            this.filters.splice(0, 1)
        this.$results.next(this.source)
        this.resetVisibleNumber()
        this.$busy.next(false)
    }

    private recursiveSearch(source: string[], filters: string[]): string[] {
        if (!filters.length)
            return source

        const filter = filters.splice(0, 1)[0]
        let i = source.length
        while (--i >= 0)
            if (source[i].indexOf(filter) < 0)
                source.splice(i, 1)

        return this.recursiveSearch(source, filters)
    }

    private searchHelper(source: string[], filters: string[]) {
        this.$busy.next(true)
        this.$results.next(this.recursiveSearch(source, filters))
        this.resetVisibleNumber()
        this.$busy.next(false)
    }

    private narrowSearch(filter: string) {
        this.searchHelper([...this.$results.value], [filter])
    }

    private reSearch() {
        this.searchHelper([...this.source], [...[...this.filters].map(filter => filter.value)])
    }

    showAll() {
        this.$visible.next(this.$results.value.length)
    }

    showMore() {
        const curr = this.$visible.value + MIN_VISIBLE
        const max = this.$results.value.length
        this.$visible.next(Math.min(curr, max))
    }

    help() {
        this.formControl.disable()
    }

}
