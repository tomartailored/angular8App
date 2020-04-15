import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private apiHost = 'http://127.0.0.1:8000';
    private token: string;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        localStorage.getItem('token');
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.apiHost + '/api/login_check', { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);   
                localStorage.setItem('token', user.token);
                return user;
            }));
    }

    leagues():Observable<any> {
        return this.http.get(this.apiHost + '/api/leagues');
    }

    leagueTeams(id):Observable<any> {
        return this.http.get(this.apiHost + '/api/league/' + id);
    }

    deleteLeague(id):Observable<any> {
        return this.http.delete(this.apiHost + '/api/league/' + id);
    }

    getTeam(id):Observable<any> {
        return this.http.get(this.apiHost + '/api/team/' + id);
    }

    addLeague(title: string):Observable<any> {
        return this.http.post<any>(this.apiHost + '/api/league', { title });
    }

    addLeagueTeam(leagueId, title: string, strip: string ):Observable<any> {
        return this.http.post<any>(this.apiHost + '/api/league/'+leagueId, { title, strip });
    }

    editLeagueTeam(leagueId, id, title: string, strip: string ):Observable<any> {
        return this.http.put<any>(this.apiHost + '/api/league/'+leagueId+'/team/'+id, { title, strip });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}