import { createAction, props } from '@ngrx/store';
import { IBookmarked, IMovieData } from '../interface/movies.interface';

export const loadMovies = createAction('[Movies Api] Loads movies');
export const loadMoviesIsSuccessful = createAction(
    '[Movies Api] Load movies is successful',
    props<{movies: IMovieData[]}>()
)
export const loadMoviesFailed = createAction(
    '[Movies Api] Load movies failed',
    props<{error: string}>(),
)

// search functionality
export const searchMovie = createAction(
    '[Movie Api] Search movie',
    props<{searchQuery: string}>()
)

// bookmarks
export const bookmarkMovies = createAction(
    '[Bookmarks Api] Bookmarks movie',
    props<{bookmarked:IBookmarked}>(),
)
