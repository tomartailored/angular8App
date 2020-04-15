import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Title} from "@angular/platform-browser";
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.less']
})
export class TeamsComponent implements OnInit {
title='Teams';
  leagueId = null;
  loading = false;	
	teams=[];
	returnUrl: string;
	error = '';
  constructor(
  private titleService: Title,
  private _location: Location,
	private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { 
      this.titleService.setTitle(this.title);
  		// redirect to home if already logged in
        if (!this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
  }

  getTeams(id) {	
		this.authenticationService.leagueTeams(id).subscribe(
		data => {
			this.teams = data.success.data;
			console.log(this.teams);
		},
			error => {
			console.log(error);
		});	
	}

  ngOnInit() {
  	this.route.params.subscribe(params => {
        this.leagueId = params['id'];
        this.getTeams(params['id']);
    });
  }

  backClicked() {
        this._location.back();
    }

}
