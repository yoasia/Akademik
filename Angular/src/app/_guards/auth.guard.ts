import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(protected router: Router) { }

    canActivate() {

        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
