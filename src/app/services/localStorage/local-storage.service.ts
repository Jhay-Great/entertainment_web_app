import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem (key:string) {
    return localStorage.getItem(key) 
  }

  setItem (key:string, item:any):void {
    localStorage.setItem(key, item);
  }

  clear () {
    localStorage.clear();
  }
  
}
