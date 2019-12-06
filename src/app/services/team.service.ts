import { Injectable } from '@angular/core';

import { Observable, of, BehaviorSubject } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { Team } from '../shared/team';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  team: Team;

  private teamsUrl = 'api/teams';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private teamSource = new BehaviorSubject( this.team );
  currentTeam = this.teamSource.asObservable();	

  constructor(private http: HttpClient, private messageService: MessageService) { }

  sendTeam(team) {
    this.teamSource.next(team);
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl)
      .pipe(
      	tap(() => console.log('Fetched teams')),
      	catchError(this.messageService.handleError)
      );
  }

  addTeam(team: Team): Observable<Team> {
  	return this.http.post<Team>(this.teamsUrl, team, this.httpOptions)
  	  .pipe(
  	  	   tap((team: Team) => console.log(`Added team w/ id=${team.id}`)),
  	       catchError(this.messageService.handleError)
      );
  }

  deleteTeam(team: Team): Observable<Team> {
    const id = team.id;
    console.log(id);
    const url = `${this.teamsUrl}/${id}`;
    return this.http.delete<Team>(url, this.httpOptions).pipe(
      tap((team: Team) => console.log(`Deleted team w/ id=${id}`)),
      catchError(this.messageService.handleError)
    );
  }
}
