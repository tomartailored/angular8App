import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {Title} from "@angular/platform-browser";

import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.less']
})
export class AddTeamComponent implements OnInit {
title='Add Team';
	teamForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    leagueId =null;
  
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

    backClicked() {
        this._location.back();
    }

  ngOnInit() {
  	this.teamForm = this.formBuilder.group({
            title: ['', Validators.required],
            strip: ['', Validators.required]
        });
    this.route.params.subscribe(params => {
        this.leagueId = params['leagueId'];
    });
  }

  // convenience getter for easy access to form fields
    get f() { return this.teamForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.teamForm.invalid) {
            return;
        }

        this.loading = true;
        console.log('leagueId:'+this.leagueId);
        this.authenticationService.addLeagueTeam(this.leagueId, this.f.title.value, this.f.strip.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['leagues/teams/'+this.leagueId]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

}
