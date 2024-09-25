export interface AppState {
    movies: IMoviesState
}

export interface IMoviesState {
    // filterBy: ISearchMovie,
    searchQuery: string,
    loading: boolean;
    error: string;
    movieList: IMovieData[],
}

export interface ISearchMovie {
    category?: string, 
    query: string
}

export interface IMovieData {
    title: string;
    thumbnail: IThumbnail;
    year: number;
    rating: string;
    category: string;
    isBookmarked: boolean;
    isTrending: boolean;
}

export interface IThumbnail {
    trending: ITrending;
    regular: IRegular;
}
export interface ITrending {
    small: string;
    large: string;
}
export interface IRegular {
    small: string;
    medium: string;
    large: string;
}
