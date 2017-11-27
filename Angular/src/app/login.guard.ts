import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Auth } from './auth.service';


@Injectable()
export class LoginGuard implements CanActivate {
    constructor(protected router: Router) { }

    canActivate() {

        this.auth.checkAuth()
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}