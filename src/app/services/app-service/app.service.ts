import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isFormActive!: boolean;

  constructor() { }

  getForm () {
    return this.isFormActive;
  }

  setFormStatus (status:boolean):void {
    this.isFormActive = status;
  }
}
