import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MoviesService } from "../services/movies.service";
import { bookmarkMovies, loadMovies, loadMoviesFailed, loadMoviesIsSuccessful } from "./movie.action";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { selectAllMovies } from "./movie.selector";
import { v4 as uuid } from 'uuid';
import { LocalStorageService } from "../services/localStorage/local-storage.service";

@Injectable()
export class MovieEffect {
    loadMoviesEffect$ = createEffect(() => 
        this.action$.pipe(
            ofType(loadMovies),
            mergeMap(() => 
                this.moviesService.fetchData().pipe(
                    map(data => 
                        data.map(movie => {
                            return {
                                ...movie,
                                id: uuid(),
                                isBookmarked: false,
                            }
                        })
                    ), 
                    map(movies => (
                        this.localStorage.setItem('movies', movies),
                        loadMoviesIsSuccessful({movies})
                    )),
                    catchError((error) => {
                        console.log(error);
                        return of(loadMoviesFailed({error}))
                    })
                )
            )
        )
    )

    // updateMovieStatus$ = createEffect(() => 
    //     this.action$.pipe(
    //         ofType(bookmarkMovies),
    //         mergeMap(() => 
    //             this.store.select(selectAllMovies).pipe(
    //                 this.
    //             )
    //         )
    //     )
    // )

    constructor (
        private action$: Actions,
        private moviesService: MoviesService,
        private store: Store,
        private localStorage: LocalStorageService,
    ) {};
}