import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { NavComponent } from "./components/nav/nav.component";
import { Store } from '@ngrx/store';
import { AppState, IMovieData, IMoviesState } from './interface/movies.interface';
// import { selectMovies } from './state/movie.selector';
import { loadMovies } from './state/movie.action';
import { Observable } from 'rxjs';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MoviesComponent } from './components/movies/movies.component';
import { FormComponent } from './components/form/form.component';
import { ToggleVisibilityDirective } from './directives/toggle-visibility.directive';
import { AppService } from './services/app-service/app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, NavComponent, MoviesComponent, FormComponent, ToggleVisibilityDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'entertainment_web_app';
  isFormActive!:boolean;
  

  constructor (
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public appService: AppService,
  ) {};

  ngOnInit(): void {
    this.store.dispatch(loadMovies());

    this.appService.setFormStatus(false);
    

  }

  // handleIsFormActive (isActive:boolean):void {
  //   this.isFormActive = isActive;
  //   console.log(this.isFormActive);
  // }
}
