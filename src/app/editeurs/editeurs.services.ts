import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {Editeur } from './editeur';
import { GameService } from '../game-list/game.service';
import { Game } from '../game-list/game';
import { Contact } from '../contacts/contact';


@Injectable({
  providedIn: 'root'
})
export class EditeursService{
  editeurUrl = 'http://localhost:3000/company';

  constructor(private http: HttpClient) { }

  getEditeurs(): Observable<Editeur[]> {
    return this.http.get<Editeur[]>(this.editeurUrl);
}

getGamesForEditeur(id: number): Observable<Game[]>{

  const url = 'http://localhost:3000/game/company/' + id;

  return this.http.get<Game[]>(url);
}

getContactForCompany(id: number): Observable<Contact[]>{
  const url = 'http://localhost:3000/contact/company/' + id;

  return this.http.get<Contact[]>(url);
}

addEditeur(editeur: Editeur): Observable<Editeur> {
  return this.http.post<Editeur>(this.editeurUrl, editeur) ;
}

}
