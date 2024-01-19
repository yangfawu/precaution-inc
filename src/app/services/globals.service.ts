import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalsService {

    readonly $topGap = new BehaviorSubject<number>(64)
    readonly $announcementClosed = new BehaviorSubject<boolean>(false)
    
}
