import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { LeaguesComponent } from './leagues/leagues.component';
import { AddLeagueComponent } from './add-league/add-league.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { TeamsComponent } from './teams/teams.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'leagues', component: LeaguesComponent },
    { path: 'leagues/add-league', component: AddLeagueComponent },
    { path: 'leagues/teams/:leagueId/add-team', component: AddTeamComponent },
    { path: 'leagues/teams/:leagueId/edit/:id', component: EditTeamComponent },
    { path: 'leagues/teams/:id', component: TeamsComponent },    

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);