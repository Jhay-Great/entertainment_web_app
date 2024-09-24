import { createReducer, on } from "@ngrx/store";
import { IMoviesState } from "../interface/movies.interface";
import { loadMovies, loadMoviesFailed, loadMoviesIsSuccessful } from "./movie.action";

// initial data
const initialValue:IMoviesState = {
    filterBy: {category: '', query: ''},
    loading: false,
    error: '',
    movieList: [],
}
// reducer fn
export const movieReducer = createReducer(
    initialValue,
    on(loadMovies, (state) => ({...state, loading:true})),
    on(loadMoviesIsSuccessful, (state, { movies }) => {
        return {
            ...state,
            movieList: movies,
            loading: false,
        }
    }),
    on(loadMoviesFailed, (state, {error}) => ({...state, error, loading: false}))
)