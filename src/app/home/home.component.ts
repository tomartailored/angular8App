import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import {Title} from "@angular/platform-browser";

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
title='Home';
    loading = false;
    users:[];

    constructor(private userService: UserService,private titleService: Title) {
this.titleService.setTitle(this.title);
     }

    ngOnInit() {
        this.loading = true;
        /*this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });*/
    }
}