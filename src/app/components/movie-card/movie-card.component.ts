import { Component, Input } from '@angular/core';
import { IMovieData } from '../../interface/movies.interface';

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

}
