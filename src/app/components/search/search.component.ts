import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppState } from '../../interface/movies.interface';
import { Store } from '@ngrx/store';
import { debounceTime, fromEvent, map, mergeMap, Observable, Subscription, switchMap, tap } from 'rxjs';
import { searchMovie } from '../../state/movie.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy {

  subscription = Subscription;
  category!: string;
  c!: Observable<string>;

  constructor (
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
  ) {};

  ngOnInit(): void {
    console.log('search component')
    const searchInput = document.querySelector('input') as HTMLInputElement
    console.log(searchInput);

    fromEvent(searchInput, 'input').pipe(
      map((event:Event) => (event.target as HTMLInputElement).value),
      debounceTime(300),
      tap(data => {
        console.log('input value: ', data)
      }),
      map(data => {
        // console.log(data);
        this.store.dispatch(searchMovie({searchQuery: data }))
      })

    ).subscribe();
    
    
  }

  ngOnDestroy(): void {
    
  }
  


}
