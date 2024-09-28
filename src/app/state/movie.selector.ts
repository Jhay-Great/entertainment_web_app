import { createSelector } from "@ngrx/store";
import { AppState, IMovieData } from "../interface/movies.interface";

// local modules
import { search, toLowerCase } from "../utils/functions";

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
                // performs search
                const data = search(movieList, 'title', searchQuery);

                // filters based on the category
                const movieCategory = data.filter(movie => toLowerCase(movie.category) === category);
                
                return movieCategory;
            } else if (category) {
                const movieCategory = movieList.filter(movie => toLowerCase(movie.category) === category);
                console.log(movieCategory);
                return movieCategory;
            } else if (searchQuery) {
                return search(movieList, 'title', searchQuery);
            } else {
                return movieList;
            }
            
        }
    )
}

// selects bookmarked movies
export const selectBookmarked = createSelector(
    selectAllMovies,
    (movies:IMovieData[]): IMovieData[] => {
        const movieData = movies.filter(movie => movie.isBookmarked)
        console.log('currently bookmarked movies: ', movieData)
        // return movies.filter(movie => movie.isBookmarked)
        return movieData;
    }
)

