import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as BreweryCardActions from '../../actions/brewery-card.action';
import BreweryCard from '../../models/brewery-card-model';
import BreweryCardState from '../../state/brewery-card.state';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
// import { SortableTableDir } from '../../directives/sortable-table';
 
@Component({
  selector: 'app-brewery-card',
  templateUrl: './brewery-card.component.html',
  styleUrls: ['./brewery-card.component.scss']
})

export class BreweryCardComponent implements OnInit {

  constructor(private store: Store<{ breweries: BreweryCardState }>) { 
    this.brewery$ = store.pipe(select('breweries'));
  }

  ngOnInit() {
    this.BreweryCardSubscription = this.brewery$
      .pipe(
        map(x => {
          this.BreweryList = x.Breweries;
          this.breweryError = x.BreweryError;
        })
      )
      .subscribe();
    this.store.dispatch(BreweryCardActions.GetBreweryActionStart());
  }
  brewery$: Observable<BreweryCardState>;
  BreweryCardSubscription: Subscription;
  BreweryList: BreweryCard[] = [];

  name: string = '';
  brewery_type: string = '';
  website_url: string = '';
  updated_at: string = '';

  breweryError: Error = null;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.BreweryList, event.previousIndex, event.currentIndex);
  }

  // getBreweries(breweries: SortableTableDir): BreweryCard[] {
  //   return this.BreweryList.sort((a,b) => {
  //     if(breweries.sortDirection === 'desc'){
  //       if(a[breweries.sortColumn] < b[breweries.sortColumn]) {
  //         return -1;
  //       };
  //       if(a[breweries.sortColumn] > b[breweries.sortColumn]) {
  //         return 1;
  //       };
  //         return 0;
  //       }
  //     else {
  //       if(a[breweries.sortColumn] > b[breweries.sortColumn]) {
  //         return -1;
  //       };
  //       if(a[breweries.sortColumn] < b[breweries.sortColumn]) {
  //         return 1;
  //       };
  //       return 0;
  //     }
  //   });
  // }

  ngOnDestroy() {
    if (this.BreweryCardSubscription) {
      this.BreweryCardSubscription.unsubscribe();
    }
  }
}
