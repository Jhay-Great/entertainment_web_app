import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, IMovieData } from '../../interface/movies.interface';
import { selectBookmarked } from '../../state/movie.selector';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MovieCardComponent } from "../movie-card/movie-card.component";

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [AsyncPipe, MovieCardComponent],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss'
})
export class BookmarksComponent implements OnInit {

  bookmarkedMovies!:Observable<IMovieData[]>;

  constructor (
    private store: Store<AppState>
  ) {};

  ngOnInit(): void {
    this.bookmarkedMovies = this.store.select(selectBookmarked);
  }

}
