import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableBrewsComponent } from './sortable-brews.component';

describe('SortableBrewsComponent', () => {
  let component: SortableBrewsComponent;
  let fixture: ComponentFixture<SortableBrewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortableBrewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableBrewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
