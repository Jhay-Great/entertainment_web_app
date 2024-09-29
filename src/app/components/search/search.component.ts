import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppState } from '../../interface/movies.interface';
import { Store } from '@ngrx/store';
import { debounceTime, fromEvent, map, mergeMap, Observable, Subscription, switchMap, tap } from 'rxjs';
import { searchMovie } from '../../state/movie.action';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app-service/app.service';

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
  placeholder:string = 'Search for movies or TV series'

  constructor (
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
  ) {};

  ngOnInit(): void {
    const searchInput = document.querySelector('input') as HTMLInputElement

    fromEvent(searchInput, 'input').pipe(
      map((event:Event) => (event.target as HTMLInputElement).value),
      debounceTime(300),
      tap(data => {
        if (data) {
          // sets search state to true
          this.appService.toggleSearch(true);
        }else {
          // sets search state to false
          this.appService.toggleSearch(false);
        }
        // console.log('input value: ', data)
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
