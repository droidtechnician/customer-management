import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';

import { faAt, faUnlockAlt, faArrowRight, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs/operators';
import { LogoConstants } from '../../constants/logo.const';
import { LoginService } from '../../services/login-in.service';
import { SignUpModel, SignUpModelResp } from '../../utilities/models/sign-up.model';
import { sampleCredentials } from '../../constants/sample.credential.const';
import { UserDataModel } from '../../utilities/models/user.model';
import { ToastsManager } from 'ng6-toastr';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('switchLogo', [
      state(
        'show',
        style({
          opacity: 1
        })
      ),
      state(
        'hide',
        style({
          opacity: 0
        })
      ),
      transition('show => hide', animate('1000ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ],
  providers: [
      LoginService
  ]
})
export class LoginComponent implements OnInit, OnDestroy{
  /*Header*/
  loginHeader = 'Member Login';
  signUpHeader = 'Create Account';

  /*icons*/
  email = faAt;
  user = faUserCircle;
  password = faUnlockAlt;
  sideArrow = faArrowRight;

  /*show/hide image state*/
  show = true;

  /*show/hide loader*/
  isSyncAnimated = false;

  /*image logo*/
  logo = 'assets/angular.png';

  /*Login form*/
  loginForm: FormGroup;
  signUpForm: FormGroup;
  loginFormDefaultValue: Subscription;

  /*Create Account Modal Status*/
  createAccModalStatus = false;

  /*Create new account*/
  createAccText = 'Create your account';

  /*Dummy credentials Checkbox*/
  dummyCredentials = false;

  constructor( private formBuilder: FormBuilder, private loginService: LoginService,
    private toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this.createLoginForm();
    this.createSigUpForm();
    this.switchImage();
  }

  ngOnDestroy() {
    if (this.loginFormDefaultValue) this.loginFormDefaultValue.unsubscribe();
  }

  /**
   * method for creating loginForm
   * @method createLoginForm
   * @argument none
   * @returns { void }
   */
  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      defaultCredentials: [false]
    });

    this.loginFormDefaultValue = this.loginForm.get('defaultCredentials').valueChanges
    .pipe(debounceTime(500))
    .subscribe( (res: boolean) => {
      if (res) {
        this.loginForm.get('emailId').setValue(sampleCredentials.emailId);
        this.loginForm.get('password').setValue(sampleCredentials.password);
      } else {
        this.loginForm.get('emailId').setValue(undefined);
        this.loginForm.get('password').setValue(undefined);
      }
      this.loginForm.markAsDirty();
    });
  }

  /**
   * method for creating signUp Form
   * @method createSigUpForm
   * @argument none
   * @returns { void }
   */
  createSigUpForm(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      signUpEmailId: ['', [Validators.required, Validators.email]],
      signUpPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      signUpConfirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8), this.confirmPwdValidator()]]
    });
  }

  confirmPwdValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let pwdValue = null;
      if (control.root.get('signUpPassword')) {
        pwdValue = control.root.get('signUpPassword').value;
      }
      return control.value !== pwdValue ? { confirmPwd: true } : null;
    };
  }

  /**
   * method returns the state to be displayed
   * @method stateName
   * @argument none
   * @returns { string }
   */
  get stateName(): string {
    return this.show ? 'show' : 'hide';
  }

  /**
   * method rerun after every 1sec to start animations
   * @method switchImage
   * @argument none
   * @returns { void }
   */
  switchImage(): void {
    setInterval(() => {
      this.show = !this.show;
    }, 4000);
  }

  /**
   * method generates a random logo name from the constants
   * @method getImage
   * @argument none
   * @returns { string }
   */
  getImage(): string {
    return LogoConstants[Math.floor(Math.random() * 14)];
  }

  /**
   * changes image after the transition is about to start
   * @method onStart
   * @argument none
   * @returns { void }
   */
  onStart(): void {
    setTimeout(() => {
      this.logo = this.getImage();
    });
  }

  /**
   * toggles modal Status
   * @method toggleModal
   * @argument value to show or hide modal
   * @returns { void }
   */
  toggleModal(value: boolean): void {
    this.createAccModalStatus = value;
  }

  /**
   * closed modal by action
   * @method closedByAction
   * @argument value event captured from the modal component
   * @return { void }
   */
  closedByAction(value) {
    this.createAccModalStatus = false;
    if (!value.status) {
      this.createSigUpForm();
    }
  }

  /**
   * sign up user
   * @method signUpUser
   * @argument none
   * @return { void }
   */
  signUpUser() {
    if (this.signUpForm.valid) {
      const signUpData: UserDataModel = {
        firstName: this.signUpForm.get('firstName').value,
        lastName: this.signUpForm.get('lastName').value,
        emailId: this.signUpForm.get('signUpEmailId').value,
        password: this.signUpForm.get('signUpPassword').value
      };
      this.loginService.signUpUser(signUpData)
        .subscribe(res => {
          console.log(res);
        });
    }
  }

  /**
   * login user
   * @method login
   * @param none
   * @returns { void }
   */
  login(): void {
    if (this.loginForm.valid) {
      const loginData: SignUpModel = {
        emailId: this.loginForm.get('emailId').value,
        password: this.loginForm.get('password').value
      };
      this.loginService.loginUser(loginData).subscribe((res: SignUpModelResp) => {
        if (res.resStatus) {
          this.toastr.success('Login Success');
          this.loginService.registerUser(true);
          this.router.navigate(['./home'])

        } else {
          this.toastr.error(res.resMsg);
        }
      });
    }
  }
}
