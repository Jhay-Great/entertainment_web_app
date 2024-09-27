import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth } from '../../interface/auth.interface';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl:string = '';

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
  ) { }

  // login
  login(data:IAuth) {
    const response = this.post(data);
    response.pipe(
      tap(response => {
        console.log(response),
        // stores the token in local storage
        this.localStorage.setItem('token', response);
      })
    )
  }

  // signup
  signUp (data:IAuth) {
    const response = this.post(data);
  }

  // post
  private post (data:IAuth):Observable<IAuth> {
    return this.httpClient.post<IAuth>(this.apiUrl, data);
  }



  // log out
}
