import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { NavComponent } from "./components/nav/nav.component";
import { Store } from '@ngrx/store';
import { AppState, IMovieData, IMoviesState } from './interface/movies.interface';
import { selectMovies } from './state/movie.selector';
import { loadMovies } from './state/movie.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'entertainment_web_app';
  data$!:Observable<IMovieData[]>

  constructor (
    private store: Store<AppState>,
  ) {};

  ngOnInit(): void {
    this.store.dispatch(loadMovies())
    // console.log(this.store.select(selectMovies))

    this.data$ = this.store.select(selectMovies);

  }
}
