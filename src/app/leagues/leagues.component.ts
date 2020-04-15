import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/_services';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.less']
})
export class LeaguesComponent implements OnInit {
title='Leagues';
	loading = false;
	leagues= [];
	teams=[];
	returnUrl: string;
	error = '';
  constructor(
  private titleService: Title,
	private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { 
    this.titleService.setTitle(this.title);
  		// redirect to home if already logged in
        if (!this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
  }

	retrieveLeagues() {
		this.authenticationService.leagues().subscribe(
			data => {
				this.leagues = data.success.data;
				console.log(this.leagues);
			},
				error => {
				console.log(error);
		});
	}

	deleteLeague(id): void {
      this.authenticationService.deleteLeague(id).subscribe(
     response => {
       	
       },
      error => console.log(error),
      () => {
      		window.location.reload();
      		console.log('League:Delete completed');
    });
}


  ngOnInit() {
  		this.loading = true;
  		this.retrieveLeagues();
  }

}
