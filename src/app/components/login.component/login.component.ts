import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { faAt, faUnlockAlt, faArrowRight, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { LogoConstants } from '../../constants/logo.const';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.css'
    ],
    animations: [
        trigger('switchLogo', [
            state('show', style({
                opacity: 1
            })),
            state('hide', style({
                opacity: 0
            })),
            transition('show => hide', animate('1000ms ease-out')),
            transition('hide => show', animate('1000ms ease-in')),
        ])
    ]
})

export class LoginComponent implements OnInit {

    /*Header*/
    loginHeader = 'Member Login';

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

    /*Create Account Modal Status*/
    createAccModalStatus = false;

    /*Create new account*/
    createAccText = 'Create your account';

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {

        this.createLoginForm();
        this.createSigUpForm();
        this.switchImage();
    }

    /**
     * method for creating loginForm
     * @method createLoginForm
     * @argument none
     * @returns { void }
     */
    createLoginForm(): void {
        this.loginForm = this.formBuilder.group({
            'emailId': ['', [Validators.required, Validators.email]],
            'password': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]]
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
            'firstName': ['', [Validators.required, Validators.minLength(3)]],
            'lastName': ['', [Validators.required, Validators.minLength(3)]],
            'signUpEmailId': ['', [Validators.required, Validators.email]],
            'signUpPassword': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
            'signUpConfirmPassword': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8),
            this.confirmPwdValidator()]]
        });
    }

    confirmPwdValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let pwdValue = null;
            if (control.root.get('signUpPassword')) {
                pwdValue = control.root.get('signUpPassword').value;
            }
            return control.value !== pwdValue ? { 'confirmPwd': true } : null;
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
    }

    /**
     * sign up user
     * @method signUpUser
     * @argument none
     * @return { void }
     */
    signUpUser() {
        if (this.signUpForm.valid) {
            
        }
    }
}
