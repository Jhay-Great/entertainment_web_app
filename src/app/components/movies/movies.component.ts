import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, IMovieData } from '../../interface/movies.interface';
import { selectMovies } from '../../state/movie.selector';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  movies$!:Observable<IMovieData[]>


  constructor (
    private store: Store<AppState>
  ) {};

  ngOnInit(): void {
    this.movies$ = this.store.select(selectMovies);
  }

}
