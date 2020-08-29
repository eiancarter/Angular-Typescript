import * as BreweryCardActions from '../actions/brewery-card.action';
import { Action, createReducer, on } from '@ngrx/store';
import BreweryCard from '../models/brewery-card-model';
import BreweryCardState, { initializeState } from '../state/brewery-card.state';

export const initialState = initializeState();

const reducer = createReducer(
    
    initialState,

    on(BreweryCardActions.GetBreweriesAction, state => state),

    on(BreweryCardActions.GetBreweryActionSuccess, ( state: BreweryCardState, { payload }) => {
        return { ...state, Breweries: payload, BreweryError: null };
    }),

    on(BreweryCardActions.BreweryActionFailure, ( state: BreweryCardState, error: Error) => {
        console.log(error);
        return { ...state, BreweryError: error};
    }),

    // on(BreweryCardActions.SortBreweriesAction, state => state),

    // on(BreweryCardActions.SortBreweryActionSuccess, ( state: BreweryCardState, { payload }) => {
    //     // if 
    //     return { ...state, Breweries: payload, BreweryError: null };
    // }),

    // on(BreweryCardActions.BreweryActionFailure, ( state: BreweryCardState, error: Error) => {
    //     console.log(error);
    //     return { ...state, BreweryError: error};
    // })
);

export function BreweryCardReducer( 
    state: BreweryCardState | undefined, 
    action: Action
): BreweryCardState {
    return reducer(state, action);
}