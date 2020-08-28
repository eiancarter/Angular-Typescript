import BreweryCard from '../models/brewery-card-model';

export default class BreweryCardState {
    Breweries: Array<BreweryCard>;
    BreweryError: Error;
}

export const initializeState = (): BreweryCardState => {
    return { Breweries: Array<BreweryCard>(), BreweryError: null };
}