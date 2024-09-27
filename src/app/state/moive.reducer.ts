import { createReducer, on } from "@ngrx/store";
import { IMoviesState } from "../interface/movies.interface";
import { bookmarkMovies, loadMovies, loadMoviesFailed, loadMoviesIsSuccessful, searchMovie } from "./movie.action";

// initial data
const initialValue:IMoviesState = {
    // filterBy: {  query: '' },
    searchQuery: '',
    loading: false,
    error: '',
    movieList: [],
}
// reducer fn
export const movieReducer = createReducer(
    initialValue,
    on(loadMovies, (state) => ({...state, loading:true})),
    on(loadMoviesIsSuccessful, (state, { movies }) => {
        console.log('triggered...')
        return {
            ...state,
            movieList: movies,
            loading: false,
        }
    }),
    on(loadMoviesFailed, (state, {error}) => ({...state, error, loading: false})),
    // on(searchMovie, (state, {query}) => ({...state, query}))
    on(searchMovie, (state, {searchQuery}) => {
        const data = {
            ...state, searchQuery: searchQuery
        }
        return data;
    }),
    on(bookmarkMovies, (state, {bookmarked}) => {
        const { id, isBookmarked } = bookmarked;
        const { movieList } = state;
        const data = movieList.map(movie => {
            if (movie.id !== id) return movie;
            return {
                ...movie,
                isBookmarked,
            }
            
        })
        return {
            ...state,
            movieList: data,
        }
    })
)