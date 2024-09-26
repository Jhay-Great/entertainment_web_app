import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../services/app-service/app.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  // @Output () display:EventEmitter<boolean> = new EventEmitter;
  isLoginActive:boolean = false;
  form!:FormGroup;

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private fb: FormBuilder,
  ) {};

  ngOnInit(): void {

    this.appService.setFormStatus(true);

    // gets current route path
    this.activatedRoute.url.subscribe(
      (UrlSegment) => {
        console.log('current url: ', UrlSegment[0].path);
        const url = UrlSegment[0].path;
        if (url === 'login') {
          this.isLoginActive = true;
        }else {
          this.isLoginActive = false;
        }
      }
    );

    // build reactive form
    // login form
    if (this.isLoginActive) {
      this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.min(8), Validators.max(20)]]
      })
      
    } else {
      this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.min(8), Validators.max(20)]],
        confirmPassword: ['', [Validators.required, Validators.min(8), Validators.max(20)]]
      })

    }
    
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
