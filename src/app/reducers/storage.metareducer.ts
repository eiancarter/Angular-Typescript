import { ActionReducer, Action } from '@ngrx/store';
import { merge, pick} from 'lodash-es';

function setSavedState(state: any, localStorageKey: string) {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
}

function getSavedState(localStorageKey: string): any {
    return JSON.parse(localStorage.getItem(localStorageKey));
}

const stateKeys = ['breweries'];
const localStorageKey = '__storage__';

export function storageMetaReducer<S, A extends Action = Action> (reducer: ActionReducer<S, A>){
    let onInit = true;
    return function(state: S, action: A): S {
        const nextState = reducer(state, action);
        if (onInit) {
            onInit = false;
            const savedState = getSavedState(localStorageKey);
            return merge(nextState, savedState);
        }
        const stateToSave = pick(nextState, stateKeys);
        setSavedState(stateToSave, localStorageKey);
        return nextState;
    };
}