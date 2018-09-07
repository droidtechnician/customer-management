import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login-in.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../modules/shared-module/shared.module';
import { PluginsModule } from '../../modules/plugins-module/plugins.module';
import { CoreModule } from '../../modules/core-module/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LogoConstants } from '../../constants/logo.const';
import { sampleCredentials } from '../../constants/sample.credential.const';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { SignUpModelResp } from '../../utilities/models/sign-up.model';
import { UserDataModel } from '../../utilities/models/user.model';

export class MockLoginService extends LoginService {

    signUpUser(data: UserDataModel): Observable<SignUpModelResp> {
        console.log("Here in MOCK")
        return Observable.of({
            emailId: data.emailId, password: data.password,
            resStatus: true
        });
    }

    loginUser(): Observable<any> {
        return Observable.of({});
    }

    registerUser() { }

}

describe('LoginComponent ', () => {

    let fixture: ComponentFixture<LoginComponent>;
    let loginComponent: LoginComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            imports: [
                ReactiveFormsModule,
                SharedModule,
                PluginsModule,
                CoreModule,
                RouterTestingModule,
                NoopAnimationsModule,
                FormsModule
            ],
            providers: [
                LoginService
            ]
        })
            .overrideComponent(LoginComponent, {
                set: {
                    providers: [
                        {
                            provide: LoginService,
                            useClass: MockLoginService
                        }
                    ]
                }
            })
            .compileComponents();
        fixture = TestBed.createComponent(LoginComponent);
        loginComponent = fixture.debugElement.componentInstance;
    }));

    it('login component has been created', () => {
        expect(loginComponent)
            .toBeDefined();
    });

    describe('hide/show logo status ', () => {
        it('hide status', () => {
            loginComponent.show = false;
            expect(loginComponent.stateName === 'hide')
                .toBeTruthy();
        });

        it('show status', () => {
            loginComponent.show = true;
            expect(loginComponent.stateName === 'show')
                .toBeTruthy();
        })
    });

    describe('logo name from the logo array', () => {
        it('checkLogo name', () => {
            const logoName: string = loginComponent.getImage();
            expect(LogoConstants.includes(logoName))
                .toBeTruthy();
        })
    });

    describe('shows/hide modal when true/false is passed ', () => {
        it('shows modal', () => {
            loginComponent.toggleModal(true);
            expect(loginComponent.createAccModalStatus)
                .toBeTruthy();
        });

        it('hides modal', () => {
            loginComponent.toggleModal(false);
            expect(loginComponent.createAccModalStatus)
                .toBeFalsy();
        });
    });

    describe('when backdrop of modal is clicked ', () => {
        it('modal is closed', () => {
            loginComponent.closedByAction({ status: false });
            expect(loginComponent.createAccModalStatus)
                .toBeFalsy();
        });
    });

    describe('signup form in modal ', () => {

        let signUpForm;
        beforeEach(async(() => {
            loginComponent.createSigUpForm();
            signUpForm = loginComponent.signUpForm;
        }));

        it('signup form should be defined', () => {
            expect(signUpForm)
                .toBeDefined();
        });

        it('signup form should be invalid when default values are set', () => {
            expect(signUpForm.valid)
                .toBeFalsy();
        });

        it('signup form should be valid when all values are set', () => {
            createDummyForm(signUpForm);
            expect(signUpForm.valid)
                .toBeTruthy();
        });

        it('signup form should be invalid when firstName is empty', () => {
            const tempForm = createDummyForm(signUpForm);
            tempForm.get('firstName').setValue('');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        it('signup form should be invalid when firstName has length less than 3 charas', () => {
            const tempForm = createDummyForm(signUpForm);
            tempForm.get('firstName').setValue('Sa');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        it('signup form should be invalid when firstName has characters more than 12', () => {
            const tempForm = createDummyForm(signUpForm);
            tempForm.get('firstName').setValue('SampleSampleSample');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        it('signup form should be invalid when lastName is empty', () => {
            const tempForm = createDummyForm(signUpForm);
            tempForm.get('lastName').setValue('');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        it('signup form should be invalid when lastName has length less than 3 charas', () => {
            const tempForm = createDummyForm(signUpForm);
            tempForm.get('lastName').setValue('Sa');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        it('signup form should be invalid when lastName has characters more than 12', () => {
            const tempForm = createDummyForm(signUpForm);
            tempForm.get('lastName').setValue('SampleSampleSample');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        it('signup form should be invalid when emailid is not valid', () => {
            const tempForm = createDummyForm(signUpForm);
            tempForm.get('signUpEmailId').setValue('SampleSampleSample');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        it('signup form should be invalid when passwords length is less than 5', () => {
            const tempForm = createDummyForm(signUpForm);
            tempForm.get('signUpPassword').setValue('Samp');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        it('signup form should be invalid when passwords length is more than 12', () => {
            const tempForm = createDummyForm(signUpForm);
            tempForm.get('signUpPassword').setValue('SampleSampleSample');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        it('signup form should be invalid when confirmPassword length is less than 5', () => {
            const tempForm = createDummyForm(signUpForm);
            tempForm.get('signUpConfirmPassword').setValue('Samp');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        it('signup form should be invalid when confirmPassword length is more than 12', () => {
            const tempForm = createDummyForm(signUpForm);
            tempForm.get('signUpConfirmPassword').setValue('SampleSampleSample');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        it('signup form should be invalid when the confirm password and password donot match', () => {
            const tempForm = createDummyForm(signUpForm);
            tempForm.get('signUpConfirmPassword').setValue('SampleSampleSample');
            tempForm.get('signUpPassword').setValue('Sample');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        // it('signup form is valid and signup button is pressed then signup service is called', () => {
        //     const tempForm = createDummyForm(signUpForm);
        //     loginComponent.signUpForm = tempForm;
        //     const service: LoginService = TestBed.get(LoginService);
        //     loginComponent.signUpUser();

        // })
    });

    describe('login form ', () => {

        let loginForm;
        beforeEach(async(() => {
            loginComponent.createLoginForm();
            loginForm = loginComponent.loginForm;
        }));

        it('is defined', () => {
            expect(loginForm)
                .toBeDefined();
        });

        it('is invalid with default values', () => {
            expect(loginForm.valid)
                .toBeFalsy();
        });

        it('is valid when valid values are applied', () => {
            const tempForm = createLoginForm(loginForm);
            expect(tempForm.valid)
                .toBeTruthy();
        });

        it('is invalid when email id is invalid', () => {
            const tempForm = createLoginForm(loginForm);
            tempForm.get('emailId').setValue('SampleCHeck');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        it('is invalid when password length is less than 5', () => {
            const tempForm = createLoginForm(loginForm);
            tempForm.get('password').setValue('1234');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        it('is invalid when password length is more than 12', () => {
            const tempForm = createLoginForm(loginForm);
            tempForm.get('password').setValue('12341234123412341234');
            expect(tempForm.valid)
                .toBeFalsy();
        });

        it('defaultcredentials values are applied when the defaultCredential toggle is changed', () => {
            loginForm.get('defaultCredentials').setValue(true);
            const emailId = loginForm.get('emailId').value;
            const password = loginForm.get('password').value;
            setTimeout(() => {
                expect(emailId === sampleCredentials.emailId && password === sampleCredentials.password)
                    .toBeTruthy();
            })
        });

        // it('defaultcredentials values are applied when the defaultCredential toggle is changed to false', ()=> {
        //     loginForm.get('defaultCredentials').setValue(true);
        //     loginForm.get('defaultCredentials').setValue(false);
        //     setTimeout(()=> {
        //         const emailId = loginForm.get('emailId').value;
        //         const password = loginForm.get('password').value;
        //         expect(emailId === sampleCredentials.emailId && password === sampleCredentials.password)
        //         .toBeFalsy();
        //     })
        // });
    });
});

const createDummyForm = (signUpForm) => {
    signUpForm.get('firstName').setValue('Sample');
    signUpForm.get('lastName').setValue('Sample');
    signUpForm.get('signUpEmailId').setValue('sample@sample.com');
    signUpForm.get('signUpPassword').setValue('Sample');
    signUpForm.get('signUpConfirmPassword').setValue('Sample');
    return signUpForm;
}

const createLoginForm = (loginForm) => {
    loginForm.get('emailId').setValue('sample@sample.com');
    loginForm.get('password').setValue('Sample');
    return loginForm;
}
