import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {Title} from "@angular/platform-browser";
import {Location} from '@angular/common';

import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-add-league',
  templateUrl: './add-league.component.html',
  styleUrls: ['./add-league.component.less']
})
export class AddLeagueComponent implements OnInit {
title='Add League';
	leagueForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = ''
  
  	constructor(
    private titleService: Title,
    private _location: Location,
	  	private formBuilder: FormBuilder,
		private route: ActivatedRoute,
	    private router: Router,
	    private authenticationService: AuthenticationService) { 
      this.titleService.setTitle(this.title);
	  		// redirect to home if already logged in
	        if (!this.authenticationService.currentUserValue) { 
	            this.router.navigate(['/']);
	        }
	  }

  ngOnInit() {
  	this.leagueForm = this.formBuilder.group({
            title: ['', Validators.required]
        });
  }

  // convenience getter for easy access to form fields
    get f() { return this.leagueForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.leagueForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.addLeague(this.f.title.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['leagues']);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
backClicked() {
        this._location.back();
    }
  

}
