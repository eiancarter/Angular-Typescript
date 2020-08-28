import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreweryCardComponent } from './components/brewery-card/brewery-card.component';
import { BreweryCardReducer } from './reducers/brewery-card.reducer';
import { BreweryCardEffects } from './effects/brewery-card.effects';
import { BreweryCardApi } from './services/api-breweries';
import { SortableBrewsComponent } from './components/sortable-brews/sortable-brews.component';
import { SortService } from './services/sorting-service';
import { SortableTableDir } from './directives/sortable-table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SearchFilterPipe } from './pipes/searchfilter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BreweryCardComponent,
    SortableBrewsComponent,
    SortableTableDir,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    DragDropModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ breweries: BreweryCardReducer }),
    EffectsModule.forRoot([BreweryCardEffects]),
    BrowserAnimationsModule
  ],
  providers: [
    BreweryCardApi,
    SortService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
