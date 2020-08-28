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
    this.store.dispatch(BreweryCardActions.GetBreweryActionStart());
  }
  brewery$: Observable<BreweryCardState>;
  BreweryCardSubscription: Subscription;
  BreweryList: BreweryCard[] = [];

  name: string = '';
  brewery_type: string = '';
  website_url: string = '';
  updated_at: string = '';

  title = 'angular-text-search-highlight';
  inputText = '';

  breweryError: Error = null;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.BreweryList, event.previousIndex, event.currentIndex);
    alert(`breweries update: ${this.BreweryList}`);
  }

  trackByFn(index: number, item: String) {
    return index;
  }

  start: string = '';
  pressed: boolean = false;
  startX: number = 20;
  startWidth: number = 20;

  public onMouseDown(event) {
    this.start = event.target;
    this.pressed = true;
    this.startX = event.x;
    this.startWidth = $(this.start).parent().width();
    this.initResizableColumns();
  }

  private initResizableColumns() {
    this.renderer.listen('body', 'mousemove', (event) => {
      if(this.pressed) {
        let width = this.startWidth + (event.x - this.startX);
        $(this.start).parent().css({'min-width': width, 'max-width': width});
        let index = $(this.start).parent().index() + 1;
        $('.glowTableBody tr td:nth-child(' + index + ')').css({'min-width': width, 'max-width': width});
      }
    });
    this.renderer.listen('body', 'mouseup', (event) => {
      if(this.pressed) {
        this.pressed = false;
      }
    });
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
