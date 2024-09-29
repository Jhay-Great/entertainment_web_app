import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, IMovieData } from '../../interface/movies.interface';
import { selectFilter, selectMovieItems, } from '../../state/movie.selector';
import { combineLatest, Observable, Subscription, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { ToggleVisibilityDirective } from '../../directives/toggle-visibility.directive';
import { AppService } from '../../services/app-service/app.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, ToggleVisibilityDirective],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  movies$!:Observable<IMovieData[]>;
  searchQuery!:Observable<string>;
  routeSubscription!: Subscription;
  searchSubscription!: Subscription;
  movies!: IMovieData[];
  isHomeActive!:boolean;
  isSearchActive!:boolean;


  constructor (
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
  ) {};

  ngOnInit(): void {
    // this.movies$ = this.store.select(selectMovies);

    this.routeSubscription = this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const param = params.get('category');
        this.isHomeActive = param === null;
        const movie$ = this.store.select(selectMovieItems(param));
        const search$ = this.appService.getSearchState();
        return combineLatest([movie$, search$]);
        // return this.store.select(selectMovieItems(param))
        // return this.store.select(selectMovies)
      })
    ).subscribe({
      next: ([movieData, searchStatus]) => {
        this.movies = movieData;
        this.isSearchActive = searchStatus;
        console.log(this.isSearchActive);

      },
      error: (error) => {
        // console.log(error);
        // display to UI
      },
      complete: () => 'done',
    });

    // this.isSearchActive = this.appService.getSearchState();

    this.appService.getSearchState().subscribe(
      val => console.log('search state: ', val)
    )

    // selects search query
    this.searchQuery = this.store.select(selectFilter);

  }

}
