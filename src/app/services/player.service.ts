import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

// import { PLAYERS } from '../player_list';

import { Player } from '../shared/player';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playersUrl = 'api/players';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  // getPlayers(): Observable<Player[]> {
  //   return of(PLAYERS);
  // }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
      .pipe(
        tap(() => console.log('Fetched players')),
      	catchError(this.messageService.handleError)
      );
  }

  // getPlayer(name: string): Observable<Player> {   
  //   return of(PLAYERS.find(player => player.name === name));
  // }

  getPlayer(id: number): Observable<Player> {
  	const url = `${this.playersUrl}/${id}`;
  	return this.http.get<Player>(url)
  	  .pipe(
         tap(() => console.log(`Fetched player with id = ${id}`)),
  	     catchError(this.messageService.handleError)
      );
  }

  getPlayersByPosition(term: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.playersUrl}/?position=${term}`)
      .pipe(
        // map(stats => {this.stats = stats}),
        tap(() => console.log('Fetched actual stats')),
        catchError(this.messageService.handleError)
      );
  }
}
