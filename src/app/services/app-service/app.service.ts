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
  private formPageSubject = new BehaviorSubject<boolean>(false);
  isFormPageActive$ = this.formPageSubject.asObservable();

  constructor() { }

  getForm () {
    // return this.isFormActive;
    return this.isFormPageActive$;
  }

  setFormStatus (status:boolean):void {
    this.formPageSubject.next(status);
    // this.isFormActive = status;
  }

  notify (message:string) {
    this.notification = message;
    this.isNotifyActive = true;
  }

  handleFormPage (status:boolean) {
    this.formPageSubject.next(status);
  }

  // timeout (seconds:number) {
  //   setTimeout(() => {
  //     this.isResponseActive = false;
  //   }, seconds);
  // }
}
