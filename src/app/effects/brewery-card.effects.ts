import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, mergeMap, map } from 'rxjs/operators';
import * as BreweryCardActions from '../actions/brewery-card.action';
import BreweryCard from '../models/brewery-card-model';
import { BreweryCardApi } from '../services/api-breweries';


@Injectable()
export class BreweryCardEffects {
    constructor(private breweryApi: BreweryCardApi, private action$: Actions){}

    GetBreweries$: Observable<Action> = createEffect(() => 
        this.action$.pipe(
            ofType(BreweryCardActions.GetBreweryActionStart),
            mergeMap(action => 
                this.breweryApi.getBreweries().pipe(
                    map((data: BreweryCard[]) => {
                        return BreweryCardActions.GetBreweryActionSuccess({ payload: data });
                    }),
                    catchError((error: Error) => {
                        return of(BreweryCardActions.BreweryActionFailure(error));
                    })
                )
            )
        )
    );
}