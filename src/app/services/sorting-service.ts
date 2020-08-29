import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SortService {
    constructor() { }
    private brewerySortedSource = new Subject<BrewerySortedEvent>();

    columnSorted$ = this.brewerySortedSource.asObservable();

    columnSorted(event: BrewerySortedEvent) {
        this.brewerySortedSource.next(event);
    }
}

export interface BrewerySortedEvent {
    sortColumn: string;
    sortDirection: string;
}
