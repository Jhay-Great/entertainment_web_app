import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMovieData } from '../interface/movies.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  api:string = '../../assets/data.json'

  constructor(
    private httpClient:HttpClient,
  ) { }

  fetchData () {
    return this.httpClient.get<IMovieData[]>(this.api);
  }

}
