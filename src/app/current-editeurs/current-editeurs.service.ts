import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Editeur } from '../editeurs/editeur';
import { Game } from '../game-list/game';



@Injectable({
  providedIn: 'root'
})
export class CurrentEditeursService {

  editeurUrl = 'http://localhost:3000/reserved-game/company';

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

    return this.http.get<Editeur[]>(this.editeurUrl, { params: params});
  }

  getGamesForEditeur(id: number): Observable<Game[]> {

    const url = 'http://localhost:3000/game/company/' + id;

    return this.http.get<Game[]>(url);
  }

}
