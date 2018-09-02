import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ActivateHomeRoute implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const userStatus: string =  sessionStorage.getItem('userStatus');
        if ( userStatus && userStatus === 'true' ) return true;

        this.router.navigate(['./login']);
        return false;
    }
}