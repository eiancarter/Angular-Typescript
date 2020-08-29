import { Component, OnInit, Renderer2 } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as BreweryCardActions from '../../actions/brewery-card.action';
import BreweryCard from '../../models/brewery-card-model';
import BreweryCardState from '../../state/brewery-card.state';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import * as $ from 'jquery';

  
@Component({
  selector: 'app-brewery-card',
  templateUrl: './brewery-card.component.html',
  styleUrls: ['./brewery-card.component.scss']
})

export class BreweryCardComponent implements OnInit {

  constructor(public renderer: Renderer2, private store: Store<{ breweries: BreweryCardState }>) { 
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
    if (!localStorage.getItem('__storage__')) {
      this.store.dispatch(BreweryCardActions.GetBreweryActionStart());
    } else {
      null
    }
  }
  brewery$: Observable<BreweryCardState>;
  BreweryCardSubscription: Subscription;
  BreweryList: BreweryCard[] = [];

  name: string = '';
  brewery_type: string = '';
  website_url: string = '';
  updated_at: string = '';

  BrewSortCriteria: any[] = [this.name, this.brewery_type, this.website_url, this.updated_at]

  title = 'angular-text-search-highlight';
  inputText = '';

  breweryError: Error = null;

  brewList = JSON.parse(localStorage.getItem('__storage__'));

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.brewList.breweries.Breweries, event.previousIndex, event.currentIndex)
    localStorage.setItem('__storage__', JSON.stringify(this.brewList))
  }

  trackByFn(index: number, item: String) {
    return index;
  }

  start: string = '';
  pressed: boolean = false;
  initialX: number = 1;
  initialWidth: number = 1;

  public onMouseDown(event) {
    this.start = event.target;
    this.pressed = true;
    this.initialX = event.clientX;
    this.initialWidth = $(this.start).parent().width();
    this.initResizableColumns();
  }

  // JQuery and CSS to listen for mouse event that, when pressed, allows
  // the user to grab span in header cell and dynamically resize column.
  private initResizableColumns() {
    this.renderer.listen('window', 'mousemove', (event) => {
      if(this.pressed) {
        let width = this.initialWidth + (event.clientX - this.initialX);
        $(this.start).parent().css({'min-width': width, 'max-width': width});
        let index = $(this.start).parent().index() + 1;
        $('tr td:nth-child(' + index + ')').css({'min-width': width, 'max-width': width});
      }
    });
    this.renderer.listen('window', 'mouseup', (event) => {
      if(this.pressed) {
        this.pressed = false;
      }
    });
  }

  onSorted(criteria: any = this.BrewSortCriteria): BreweryCard[] {
    return this.brewList.breweries.Breweries.sort((a,b) => {
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
    if (this.BreweryCardSubscription) {
      this.BreweryCardSubscription.unsubscribe();
    }
  }
}
