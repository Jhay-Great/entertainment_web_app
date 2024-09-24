import { createSelector } from "@ngrx/store";
import { AppState } from "../interface/movies.interface";

// selecting state feature
export const selectFeature = (state:AppState) => state.movies;

export const selectMovies = createSelector(
    selectFeature,
    (selectFeature) => selectFeature.movieList
)
