import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'randNum'
})
export class RandNumPipe implements PipeTransform {

    transform(value: number, min = 0): number {
        return Math.floor(Math.random()*(value - min + 1) + min)
    }

}
