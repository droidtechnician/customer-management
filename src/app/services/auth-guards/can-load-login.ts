import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LoginLoader implements CanActivate {

    constructor(private router: Router) {}

    canActivate(): Observable<boolean>|Promise<boolean>|boolean {
        if (sessionStorage.getItem('userStatus') === 'true') {
            this.router.navigateByUrl('/home');
            return false;
        }
        return true;
    }
}

