import { Component, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HeaderService } from '../../services/header.service';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
    selector: 'login',
    templateUrl: 'app/pages/login/login.page.html'
})
export class LoginPage {

    constructor(private authorization: AuthorizationService, private router: Router) {
        if (!this.authorization.userIsSignedIn()) {
            this.authorization.initImplicitFlow();
        }
        else {
            this.router.navigate(['/home']);
        }
    }

    ngOnInit() 
    {
        AuthorizationService.processRedirect();
    }
}