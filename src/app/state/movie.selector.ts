import { createSelector } from "@ngrx/store";
import { AppState, IMovieData } from "../interface/movies.interface";

// selecting state feature
export const selectFeature = (state:AppState) => state.movies;

export const selectAllMovies = createSelector(
    selectFeature,
    (selectFeature) => selectFeature.movieList
)

export const selectFilter = createSelector(
    selectFeature,
    (selectFeature) => selectFeature.searchQuery
)

export const selectMovieItems = (category: string | null) => {

    return createSelector(
        selectAllMovies,
        selectFilter,
        (movieList:IMovieData[], searchQuery:string) => {
            
            // returns the movie data based on the category and filter
            if (searchQuery !== '' && category) {
                const data = movieList.filter(movie => toLowerCase(movie.title) === toLowerCase(searchQuery))
                console.log('found data: ', data);
                
                const movieCategory = data.filter(movie => toLowerCase(movie.category) === category);
                console.log(movieCategory);
                
                return movieCategory;
            } else if (category) {
                const movieCategory = movieList.filter(movie => toLowerCase(movie.category) === category);
                console.log(movieCategory);
                return movieCategory;
            } else if (searchQuery) {
                return movieList.filter(movie => toLowerCase(movie.title) === toLowerCase(searchQuery))
            } else {
                return movieList;
            }
            
        }
    )
}


const toLowerCase = (string:string) => string.toLowerCase();