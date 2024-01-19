import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'quantify'
})
export class QuantifyPipe implements PipeTransform {

    transform(value: number, singular: string, plural?: string): string {
        return `${value} ${value == 1 ? singular : (plural || (singular + 's'))}`
    }

}
