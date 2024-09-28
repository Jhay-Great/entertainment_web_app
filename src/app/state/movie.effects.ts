import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MoviesService } from "../services/movies.service";
import { bookmarkMovies, loadMovies, loadMoviesFailed, loadMoviesIsSuccessful } from "./movie.action";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { select, Store } from "@ngrx/store";
import { selectAllMovies, selectBookmarked } from "./movie.selector";
import { v4 as uuid } from 'uuid';
import { LocalStorageService } from "../services/localStorage/local-storage.service";
import { AppState, IMovieData } from "../interface/movies.interface";

@Injectable()
export class MovieEffect {
    loadMoviesEffect$ = createEffect(() => 
        this.action$.pipe(
            ofType(loadMovies),
            mergeMap(() => 
                this.moviesService.fetchData().pipe(
                    map(data => {
                        const moviesInLocalStorage:IMovieData[] = this.localStorage.getItem('movies');
                        if (moviesInLocalStorage) {
                            return loadMoviesIsSuccessful({movies: moviesInLocalStorage});
                        }

                        const movies =  data.map(movie => {
                            return {
                                ...movie,
                                id: uuid(),
                                isBookmarked: false,
                            }
                        });

                        this.localStorage.setItem('movies', movies);
                        return loadMoviesIsSuccessful({movies})
                    }
                    ), 
                    catchError((error) => {
                        console.log(error);
                        return of(loadMoviesFailed({error}))
                    })
                )
            )
        )
    )

    

    updateMovieStatus$ = createEffect(() => 
        this.action$.pipe(
            ofType(bookmarkMovies),
            switchMap(() => 
                this.store.pipe(
                    select(selectBookmarked),
                    tap(data => this.localStorage.setItem('movies', data)),
                )
            )
        ),
        { dispatch: false }
    )
    

    constructor (
        private action$: Actions,
        private moviesService: MoviesService,
        private store: Store<AppState>,
        private localStorage: LocalStorageService,
    ) {};
}