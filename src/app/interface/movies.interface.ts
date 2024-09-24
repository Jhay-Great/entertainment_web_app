export interface AppState {
    movies: IMoviesState
}

export interface IMoviesState {
    filterBy: {category:string, query:string},
    loading: boolean;
    error: string;
    movieList: IMovieData[],
}

export interface IMovieData {
    title: string;
    thumbnail: IThumbnail;
    year: number;
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
