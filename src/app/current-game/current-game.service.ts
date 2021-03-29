import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../game-list/game';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrentGameService {
  gameUrl = 'http://localhost:3000/festival/current/reserved-games';

  constructor(private http: HttpClient) { }
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gameUrl);
}
}
