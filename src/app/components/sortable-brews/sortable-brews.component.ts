import { Component, OnInit, EventEmitter, OnDestroy, HostListener, Input } from '@angular/core';
import { SortService } from '../../services/sorting-service';
import { Subscription } from 'rxjs';

@Component({
  selector: '[sortable-brews]',
  templateUrl: './sortable-brews.component.html',
  styleUrls: ['./sortable-brews.component.scss']
})
export class SortableBrewsComponent implements OnInit, OnDestroy {

  constructor(private sortService: SortService) { }

  @Input('sortable-brews')
  columnName: string;

  @Input('sort-direction')
  sortDirection: string = '';

  private columnSortedSubscription: Subscription;

  @HostListener('click')
  sort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
  }

  ngOnInit() {
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      if (this.columnName != event.sortColumn) {
        this.sortDirection = '';
      }
    })
  }

  onSorted(criteria: SortService): BreweryCard[] {
    return this.BreweryList.sort((a,b) => {
      if(criteria.sortDirection === 'desc'){
        if(a[criteria.sortColumn] < b[criteria.sortColumn]) {
          return -1;
        };
        if(a[criteria.sortColumn] > b[criteria.sortColumn]) {
          return 1;
        };
          return 0;
        }
      else {
        if(a[criteria.sortColumn] > b[criteria.sortColumn]) {
          return -1;
        };
        if(a[criteria.sortColumn] < b[criteria.sortColumn]) {
          return 1;
        };
        return 0;
      }
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }
}
