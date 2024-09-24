import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MoviesService } from "../services/movies.service";
import { loadMovies, loadMoviesFailed, loadMoviesIsSuccessful } from "./movie.action";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class MovieEffect {
    loadMoviesEffect$ = createEffect(() => 
        this.action$.pipe(
            ofType(loadMovies),
            mergeMap(() => 
                this.moviesService.fetchData().pipe(
                    map(movies => loadMoviesIsSuccessful({movies})),
                    catchError((error) => {
                        console.log(error);
                        return of(loadMoviesFailed({error}))
                    })
                )
            )
        )
    )

    constructor (
        private action$: Actions,
        private moviesService: MoviesService
    ) {};
}