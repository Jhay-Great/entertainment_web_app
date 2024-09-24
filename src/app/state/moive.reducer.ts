import { createReducer, on } from "@ngrx/store";
import { IMovieData } from "../interface/movies.interface";
import { loadMovies, loadMoviesFailed, loadMoviesIsSuccessful } from "./movie.action";

// state
export interface IMoviesState {
    filterBy: {category:string, query:string},
    loading: boolean;
    error: string;
    movieList: IMovieData[],
}
// initial data
const initialValue:IMoviesState = {
    filterBy: {category: '', query: ''},
    loading: false,
    error: '',
    movieList: [],
}
// reducer fn
export const reducer = createReducer(
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