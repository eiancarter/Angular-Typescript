import BreweryCard from '../models/brewery-card-model';
import { createAction, props } from '@ngrx/store';

export const GetBreweriesAction = createAction('[BreweryCard] - Get Brewery');

export const GetBreweryActionStart = createAction('[BreweryCard] - Begin Get Brewery');

export const GetBreweryActionSuccess = createAction(
    '[BreweryCard] - Success Get Brewery',
    props<{ payload: BreweryCard[] }>()
);

export const BreweryActionFailure = createAction(
    '[BreweryCard] - Error',
    props<Error>()
);

