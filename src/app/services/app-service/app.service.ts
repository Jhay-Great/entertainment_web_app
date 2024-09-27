import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isFormActive!: boolean;
  private isNotifyActive:boolean = false;
  notification!:string;

  // behaviorSubject
  notificationSubject = new BehaviorSubject<string | null>(null);

  constructor() { }

  getForm () {
    return this.isFormActive;
  }

  setFormStatus (status:boolean):void {
    this.isFormActive = status;
  }

  notify (message:string) {
    this.notification = message;
    this.isNotifyActive = true;
  }
}
