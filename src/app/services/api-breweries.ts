import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import BreweryCard from '../models/brewery-card-model';

@Injectable({
    providedIn: 'root'
})

export class BreweryCardApi {
    private API_URL: string = 'https://api.openbrewerydb.org/breweries';
    constructor(private httpclient: HttpClient) { }

    getBreweries(): Observable<BreweryCard[]> {
        return this.httpclient.get<BreweryCard[]>(this.API_URL);
    }
}