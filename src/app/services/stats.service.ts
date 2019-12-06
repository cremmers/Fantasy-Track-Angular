import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient} from '@angular/common/http';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private statsUrl = 'api/stats';

  private numbersUrl = 'http://localhost:3000/players';

  // private numbersUrl = 'http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2019&format=json/players';

  stats: any;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  searchPlayer(term: string): Observable<any> {
    return this.http.get<any>(`${this.statsUrl}/?Player=${term}`)
    // return this.http.get<any>('api/stats' + '/' + '?Player=' + term)
      .pipe(
        // map(stats => {this.stats = stats}),
        // tap(() => console.log('Stats:', this.stats)),
        tap(() => console.log('Fetched projected stats')),
      	catchError(this.messageService.handleError)
      );
  }

  getStats(term: string): Observable<any> {
    return this.http.get<any>(`${this.numbersUrl}/?name=${term}`)
      .pipe(
        // map(stats => {this.stats = stats}),
        tap(() => console.log('Fetched actual stats')),
        catchError(this.messageService.handleError)
      );
  }
}
