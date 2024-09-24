import { createAction, props } from '@ngrx/store';
import { IMovieData } from '../interface/movies.interface';

export const loadMovies = createAction('[Movies Api] Loads movies');
export const loadMoviesIsSuccessful = createAction(
    '[Movies Api] Load movies is successful',
    props<{movies: IMovieData[]}>()
)
export const loadMoviesFailed = createAction(
    '[Movies Api] Load movies failed',
    props<{error: string}>(),
)
