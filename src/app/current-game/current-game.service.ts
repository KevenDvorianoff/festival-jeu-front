import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/environment';
import { ReservedGame } from './reserved-game';

const CURRENT_GAMES_URL = `${API_URL}/festival/current/reserved-games`;

@Injectable({
  providedIn: 'root'
})
export class CurrentGameService {

  constructor(private http: HttpClient) { }

  getGames(): Observable<ReservedGame[]> {
    return this.http.get<ReservedGame[]>(CURRENT_GAMES_URL);
  }

}
