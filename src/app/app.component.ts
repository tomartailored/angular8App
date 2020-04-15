import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    title = 'Football Leagues';
    constructor(
        private titleService: Title,
        private _location: Location,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.titleService.setTitle(this.title);
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    backClicked() {
        this._location.back();
    }
}