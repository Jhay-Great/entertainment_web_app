import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppService } from '../../services/app-service/app.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../utils/passwordValidator';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  // @Output () display:EventEmitter<boolean> = new EventEmitter;
  isLoginActive:boolean = false;
  // form = FormGroup;
  form!: FormGroup;

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
    
    if (this.isLoginActive) {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.min(8), Validators.max(20)]]
      })
      
    } else {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.max(20)]],
        confirmPassword: ['', [Validators.required, Validators.min(8), Validators.max(20)]]
      }, {validators: passwordValidator()} ) //makes the validator accessible in the form group

    }
    
  }

  get email () {
    return this.form.get('email');
  }

  get password () {
    return this.form.get('password')
  }
  get confirmPassword () {
    return this.form.get('confirmPassword');
  }

  checkValidity ():any {
    const form = this.form;
    if (!form.valid) {
      console.log(form.valid); 
      return;
    }

    return form.value;
  }

  login () {
    const data = this.checkValidity();
    console.log(data);
    
    
  };
  
  signup () {
    const data = this.checkValidity();
    console.log('loggin data: ', data);
    
  };

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
