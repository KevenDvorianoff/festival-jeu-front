import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Game } from './game';
import { API_URL } from 'src/environments/environment';

const CREATE_GAME_ENDPOINT = (gameId: string) => `${API_URL}/game/{gameId}`
const GET_GAMES_ENDPOINT = `${API_URL}/game`

@Injectable()
export class GameService {

    constructor(private http: HttpClient) { }

    getGames(): Observable<Game[]> {
        return this.http.get<Game[]>(GET_GAMES_ENDPOINT)
    }
}