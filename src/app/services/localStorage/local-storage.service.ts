import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Local storage
  getItem (key:string) {
    console.log('logging from local', localStorage.getItem(key));
    if (localStorage.getItem(key)) {
      return localStorage.getItem(key) 

    }else return 'nothing';
  }

  setItem (key:string, item:any):void {
    localStorage.setItem(key, item);
  }

  delete (key:string) {
    localStorage.removeItem(key);
  }

  clearLocalStorage () {
    localStorage.clear();
  }
  
  
}

class SessionStorage {
  
  constructor () {};
  
  // Session storage
  getItemFromSessionStorage (key:string) {
    return sessionStorage.getItem(key);
  }
  
  setItemToSessionStorage (key:string, item:any):void {
    sessionStorage.setItem(key, item);
  }
  
  deleteItemFromSessionStorage (key:string) {
    sessionStorage.removeItem(key);
  }

  
}
