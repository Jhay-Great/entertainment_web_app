import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app-service/app.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  // @Output () display:EventEmitter<boolean> = new EventEmitter;

  constructor (
    private router: Router,
    private appService: AppService,
  ) {};

  ngOnInit(): void {

    this.appService.setFormStatus(true);

    // console.log(this.router.url);
    // this.handleFormDisplay();
  }

  handleFormDisplay() {
    // const currentRoute = this.router.url;
    // if (currentRoute === 'form') {
    //   console.log(true);
    //   this.display.emit(false);
    // }
    // else {
    //   this.display.emit(true);
    // }
  }

}
