import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppService } from '../../services/app-service/app.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../utils/passwordValidator';
import { AuthService } from '../../services/auth/auth.service';
import { map, Observable, Subscription, tap } from 'rxjs';
import { ISuccess } from '../../interface/auth.interface';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit, OnDestroy {
  // @Output () display:EventEmitter<boolean> = new EventEmitter;
  isLoginActive:boolean = false;
  // form = FormGroup;
  form!: FormGroup;
  isResponseActive:boolean = false;
  // response!:Observable<string>
  notification!:string;
  signUpSubscription = new Subscription;
  loginSubscription = new Subscription;

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorage: LocalStorageService,
  ) {};

  ngOnInit(): void {

    this.appService.setFormStatus(true);

    // gets current route path
    this.activatedRoute.url.subscribe(
      (UrlSegment) => {
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
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
      }, {validators: passwordValidator()} ) //makes the validator accessible in the form group

    }
    
  }

  ngOnDestroy(): void {
    this.signUpSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
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

  validateForm ():any {
    const form = this.form;
    if (!form.valid) {
      console.log(form.valid); 
      return false;
    }

    return form.value;
  }

  login () {
    const data = this.validateForm();
    console.log(data);
    if (!data) {
      return;
    }

    const response = this.authService.login(data);

    // subscribes to the returned observable
    this.loginSubscription = response.subscribe({
      next: value => {
        this.isResponseActive = true;
        this.notification = 'login successful';
        console.log(value);
        this.localStorage.setItem('token', value.message);
        this.authService.setAuthentication(true);
        this.router.navigate(['bookmarks']);
      },
      error: err => {
        this.isResponseActive = true;
        this.notification = err.message;
        console.log(err);
      },
      complete: () => {
        this.timeout(5000);
        console.log('done');
      },
    })
    
  };
  
  signup () {
    const data = this.validateForm();

    if (!data) {
      return;
    }
    
    const { email, password } = data;
    
    const response = this.authService.signUp({email, password});

    // subscribes to the returned observable
    this.signUpSubscription = response.subscribe({
      next: response => {
        const { message } = response;
        this.notification = message;
        this.isResponseActive = true;
        this.router.navigate(['/login']);
        return data;
      },
      error: err => {
        this.isResponseActive = true;
        this.notification = err.message;
        this.timeout(5000);
      },
      complete: () => {
        this.timeout(5000);
        console.log('done');
      }
    })
    
    // this.signUpSubscription = response.pipe(
    //   map(data => {
    //     console.log('logging data: ', data);
    //     const { message } = data;
    //     this.notification = message;
    //     this.isResponseActive = true;
    //     return data;
    //   }),
    //   tap(data => {
    //     const { success } = data;
    //     if (success) {
    //       this.router.navigate(['/login'])

    //     } 
    //   })
    // ).subscribe();

    // this.signUpSubscription.unsubscribe();

    
  };

  timeout (seconds:number) {
    setTimeout(() => {
      this.isResponseActive = false;
    }, seconds);
  }

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
