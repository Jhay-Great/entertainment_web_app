import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth, ISuccess } from '../../interface/auth.interface';
import { catchError, map, Observable, of, pipe, tap } from 'rxjs';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { AppService } from '../app-service/app.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl:string = 'https://entertainment-web-app-backend-2.onrender.com/api';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private appService: AppService,
    private localStorage: LocalStorageService,
  ) { }

  // login
  login(data:IAuth) {
    const response = this.post(`${this.apiUrl}/login`, data);
    return this.handleResponse(response);
    
  }

  // signup
  signUp (data:IAuth) {
    console.log('called sign up fn...')
    const response = this.post(`${this.apiUrl}/register`, data);
    return this.handleResponse(response);
    
  }

  // handles post requests
  private post (url:string, data:IAuth):Observable<any> {
    console.log(data);
    return this.httpClient.post<IAuth>(url, data);
  }


  // custom operator
  handleResponse (source:Observable<any>):Observable<ISuccess> {
    return source.pipe(
      tap(response => {
        console.log('logging data after sign up: ', response);
      }),
      map(serverResponse => {
        const response = {
          message: serverResponse,
          success: true,
        }
        return response;
      }),
      catchError(error => {
        const { message } = error.error;
        const response = {
          message,
          success: false,
        }
        return of(response);
      }))
  }

  // log out
}
