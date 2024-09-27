import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppService } from '../../services/app-service/app.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../utils/passwordValidator';
import { AuthService } from '../../services/auth/auth.service';
import { map, Observable, tap } from 'rxjs';
import { ISuccess } from '../../interface/auth.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  // @Output () display:EventEmitter<boolean> = new EventEmitter;
  isLoginActive:boolean = false;
  // form = FormGroup;
  form!: FormGroup;
  isResponseActive:boolean = false;
  // response!:Observable<string>
  notification!:string;

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private fb: FormBuilder,
    private authService: AuthService,
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
    
    // builds forms
    if (this.isLoginActive) {
      // login form
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.min(8), Validators.max(20)]]
      })
      
    } else {
      // sign up form
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.max(20)]],
        confirmPassword: ['', [Validators.required, Validators.min(8), Validators.max(20)]]
      }, {validators: passwordValidator()} ) //makes the validator accessible in the form group

    }
    
  }

  // getter function to get the email control
  get email () {
    return this.form.get('email');
  }

  // getter function to get the email control
  get password () {
    return this.form.get('password')
  }
  
  // getter function to get the email control
  get confirmPassword () {
    return this.form.get('confirmPassword');
  }

  checkValidity ():any {
    const form = this.form;
    if (!form.valid) {
      console.log(form.valid); 
      return 'in valid data entry';
    }

    return form.value;
  }

  login () {
    const data = this.checkValidity();
    console.log(data);
    const response = this.authService.login(data);
    response.pipe(
      map(data => {
        const { message, success } = data;
        this.notification = message;
        this.isResponseActive = true;
        return data;
      }),
      // tap(data => {
      //   // this.router.navigate(['', 'bookmarks'])
      // }) // not needed using route guard
    ).subscribe();


    
    
  };
  
  signup () {
    const data = this.checkValidity();
    console.log('logging data: ', data);

    const { email, password } = data;
    
    const response = this.authService.signUp({email, password});
    response.pipe(
      map(data => {
        const { message } = data;
        this.notification = message;
        this.isResponseActive = true;
        return data;
      }),
      tap(data => {
        const { success } = data;
        if (success) {
          this.router.navigate(['/login'])

        } else {
          // this.router.nav
        }
      })
    ).subscribe();

    
  };

  // handleFormDisplay() {
  //   // const currentRoute = this.router.url;
  //   // if (currentRoute === 'form') {
  //   //   console.log(true);
  //   //   this.display.emit(false);
  //   // }
  //   // else {
  //   //   this.display.emit(true);
  //   // }
  // }

}
