import { Component, Input } from '@angular/core';
import { AppState, IBookmarked, IMovieData } from '../../interface/movies.interface';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { bookmarkMovies } from '../../state/movie.action';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {

  @Input () movie!:IMovieData;
  @Input () isTrending!:boolean;

  constructor (
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
  ) {}

  checkValidation () {
    const validity = this.authService.isLoggedIn();
    console.log('validity: ', validity);
    if (!validity) {
      this.router.navigate(['/sign-up']);
      return false;
    }
    return true;
  };

  handleBookmark () {
    console.log('called....')
    const valid = this.checkValidation();
    if (!valid) return;

    const { id } = this.movie;
    const isBookmarked = !this.movie.isBookmarked
    console.log(isBookmarked, id);
    const bookmarked:IBookmarked = { id, isBookmarked };
    
    // dispatches action
    this.store.dispatch(bookmarkMovies({bookmarked}))
  };

}
