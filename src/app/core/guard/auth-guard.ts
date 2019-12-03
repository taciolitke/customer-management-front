import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/autentication/shared/auth.service';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        public router: Router,
        private authService: AuthService
    ) {
    }

    canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => this.verifyPermission(state);

    verifyPermission(state: RouterStateSnapshot) {
        return this.authService.isLogged().pipe(map(result => {
            if (!result.success) {
                this.redirectoToLogin(state);
            }
            return result.success;
        }),
            catchError((e: HttpErrorResponse) => throwError(this.errorReturn(e, state))));
    }
    errorReturn(e: HttpErrorResponse, state: RouterStateSnapshot): any {
        this.redirectoToLogin(state);
        return e;
    }
    private redirectoToLogin(state: RouterStateSnapshot) {
        this.authService.setCurrentUser(undefined);
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } }).then(() => {
            Swal.fire('Ops...', 'You need to login to stay on this page.', 'warning');
        });
    }
}