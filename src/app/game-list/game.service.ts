import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Game } from './game';
import { API_URL } from 'src/environments/environment';

const CREATE_GAME_URL = `${API_URL}/game`;
const GET_GAMES_URL = `${API_URL}/game`;
const GET_GAMETYPES_URL = `${API_URL}/game/gameType`;
const UPDATE_GAME_URL = (gameId: number) => `${API_URL}/game/${gameId}`;
const DELETE_GAME_URL = (gameId: number) => `${API_URL}/game/${gameId}`;

@Injectable()
export class GameService {

    constructor(private http: HttpClient) { }

    createGame(
        name: string,
        notice: string,
        duration: string,
        minPlayers: number,
        maxPlayers: number,
        minAge: number,
        maxAge: number,
        isPrototype: boolean,
        lastModification: Date,
        publisherId: number,
        gameType: string
    ) {
        return this.http.post(CREATE_GAME_URL, {
            name: name,
            notice: notice,
            duration: duration,
            minPlayers: minPlayers,
            maxPlayers: maxPlayers,
            minAge: minAge,
            maxAge: maxAge,
            isPrototype: isPrototype,
            lastModification: lastModification,
            publisherId: publisherId,
            gameType: gameType
        });
    }

    getGames(): Observable<Game[]> {
        return this.http.get<Game[]>(GET_GAMES_URL);
    }

    getGameTypes(): Observable<string[]> {
        return this.http.get<string[]>(GET_GAMETYPES_URL);
    }

    updateGame(
        gameId: number,
        name: string,
        notice: string,
        duration: string,
        minPlayers: number,
        maxPlayers: number,
        minAge: number,
        maxAge: number,
        isPrototype: boolean,
        lastModification: Date,
        publisherId: number,
        gameType: string
        ) {
        return this.http.patch(UPDATE_GAME_URL(gameId), {
            name: name,
            notice: notice,
            duration: duration,
            minPlayers: minPlayers,
            maxPlayers: maxPlayers,
            minAge: minAge,
            maxAge: maxAge,
            isPrototype: isPrototype,
            lastModification: lastModification,
            publisherId: publisherId,
            gameType: gameType
        });
    }

    deleteGame(gameId: number) {
        return this.http.delete(DELETE_GAME_URL(gameId));
    }
}