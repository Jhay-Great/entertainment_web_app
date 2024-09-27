import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Local storage
  getItem (key:string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setItem (key:string, item:any):void {
    localStorage.setItem(key, JSON.stringify(item));
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
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  
  setItemToSessionStorage (key:string, item:any):void {
    sessionStorage.setItem(key, JSON.stringify(item));
  }
  
  deleteItemFromSessionStorage (key:string) {
    sessionStorage.removeItem(key);
  }

  clearStorage () {
    sessionStorage.clear();
  }

  
}
