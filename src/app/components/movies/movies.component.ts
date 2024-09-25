import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, IMovieData } from '../../interface/movies.interface';
import { selectMovieItems, } from '../../state/movie.selector';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  movies$!:Observable<IMovieData[]>;
  movies!: IMovieData[];


  constructor (
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
  ) {};

  ngOnInit(): void {
    // this.movies$ = this.store.select(selectMovies);

    this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const param = params.get('category');
        console.log('logging param: ', param)
        return this.store.select(selectMovieItems(param))
        // return this.store.select(selectMovies)
      })
    ).subscribe({
      next: (data) => {
        console.log('logging in subscription: ', data)
        this.movies = data;
      },
      error: (error) => {
        console.log(error);
        // display to UI
      },
      complete: () => 'done',
    });

  }

}
