import { Directive, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { SortService } from '../services/sorting-service';

@Directive({
    selector: '[sortable-table]'
})

export class SortableTableDir implements OnInit, OnDestroy {
    constructor(private sortService: SortService) { }
        @Output()
        sorted = new EventEmitter();

        private columnSortedSubscription: Subscription;

        ngOnInit() {
            this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
                this.sorted.emit(event);
            })
        }
        ngOnDestroy() {
            this.columnSortedSubscription.unsubscribe();
        }
}