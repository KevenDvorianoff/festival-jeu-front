import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Editeur } from '../editeurs/editeur';
import { Game } from '../game-list/game';
import { API_URL } from 'src/environments/environment';

const GET_EDITEURS_URL = `${API_URL}/reserved-game/company`;
const GET_GAMES_EDITEURS_URL = (companyId: number) => `${API_URL}/game/company/${companyId}`;

@Injectable({
  providedIn: 'root'
})
export class CurrentEditeursService {

  constructor(private http: HttpClient) { }

  getEditeurs(
    isPublisher?: boolean,
    isExhibitor?: boolean,
    isActive?: boolean
  ): Observable<Editeur[]> {
    const params = new HttpParams()

    if (isPublisher !== undefined) {
      params.set("isPublisher", isPublisher ? "true" : "false")
    }
    if (isExhibitor !== undefined) {
      params.set("isExhibitor", isExhibitor ? "true" : "false")
    }
    if (isActive !== undefined) {
      params.set("isActive", isActive ? "true" : "false")
    }

    return this.http.get<Editeur[]>(GET_EDITEURS_URL, { params: params});
  }

  getGamesForEditeur(id: number): Observable<Game[]> {
    return this.http.get<Game[]>(GET_GAMES_EDITEURS_URL(id));
  }

}
